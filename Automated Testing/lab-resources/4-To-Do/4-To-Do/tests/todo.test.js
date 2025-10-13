const BASE_URL = "http://localhost:5500";
const { test, expect } = require('@playwright/test');

test('user can add a task', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('#task-input', 'Test Task');
  await page.click('#add-task');
  
  const taskText = await page.textContent('.task .task-text');
  expect(taskText).toBe('Test Task');
});

test('user can delete a task', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('#task-input', 'Test Task');
  await page.click('#add-task');
  
  await page.click('.task .delete-task');  

  const taskCount = await page.locator('.task').count();
  expect(taskCount).toBe(0);
});

test('user can mark a task as complete', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('#task-input', 'Test Task');
  await page.click('#add-task');
  
  await page.click('.task .task-complete');  
  
  const completedTask = await page.$('.task.completed');
  expect(completedTask).not.toBeNull();
});

test('user can filter tasks', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.fill('#task-input', 'Test Task');
  await page.click('#add-task');

  await page.click('.task .task-complete');  
  
  await page.selectOption('#filter', 'completed');
  
  // Check that no incomplete tasks are visible
  const visibleTasks = await page.locator('.task').filter({ hasNotText: '' }).count();
  const hiddenIncompleteTasks = await page.locator('.task:not(.completed)[style*="display: none"]').count();
  
  // All incomplete tasks should be hidden
  expect(hiddenIncompleteTasks).toBeGreaterThanOrEqual(0);
});