> **Course:** DevOps Fundamentals  
> **Module:** Operating Systems & Linux Fundamentals 
> **Date Created:** 03.11.2025

## 🎯 What is it? (Feynman Style)

Imagine Linux is a big shared house with many roommates (users). Each person needs:

- **Their own room** (home directory) where they keep their stuff
- **Keys** (permissions) to access different areas - maybe you can enter the kitchen but not someone else's bedroom
- **A name tag** (username) so everyone knows who you are
- **Group memberships** (like "family" or "guests") that give you access to shared spaces

**SSH** is like a remote that lets you control a computer in another city as if you were sitting right in front of it. Instead of going there, you can use the remote to access whatever you want.

**Environment variables** are like sticky notes the system uses to remember ESPECIALLY important info.

## 🔑 Why Does This Matter?

**Problems it solves:**

- **Security:** Without users/groups/permissions, anyone could delete anything - chaos!
- **Multi-user systems:** Servers have dozens of users; each needs their own space and limits
- **Remote work:** SSH lets DevOps engineers manage 100 servers from their laptop
- **Automation:** Environment variables let scripts work on any machine without hardcoding paths
- **Process control:** Kill runaway programs, monitor resource usage, manage background tasks

**Why you should care:** Every real-world server you'll touch in DevOps has multiple users, strict permissions, and remote SSH access. Mess up permissions? Site goes down. Don't understand processes? Can't debug performance issues. This is foundational security and admin knowledge.

## 🏗️ Key Components

### Users and Groups:

- **/etc/passwd:** The "phonebook" of users - username, user ID, home directory, default shell. Password isn't actually here (it's in /etc/shadow for security)
    
- **/etc/group:** List of all groups - group name, group ID, and who's a member. Groups let you give permissions to multiple users at once
    
- **User ID (UID):** Unique number identifying each user (root is always 0, regular users typically start at 1000)
    

### Access Rights:

- **Owner:** The user who created the file (has first set of permissions: rwx)
- **Group:** Users in the file's group (has second set of permissions: rwx)
- **Others:** Everyone else (has third set of permissions: rwx)
- **r (read):** View file content or list directory contents
- **w (write):** Modify/delete file or modify directory contents
- **x (execute):** Run file as program or enter/traverse directory

### Commands for Control:

- **sudo:** "Super User DO" - temporarily get admin powers without logging in as root
- **chmod:** Change permissions (who can read/write/execute)
- **chown:** Change owner and group of files
- **chgrp:** Change just the group

### Environment Variables:

- **Dynamic named values** the shell uses (like settings/preferences)
- Examples: `HOME` (your home directory), `PATH` (where to find programs), `USER` (your username)
- Set with `export VAR=value`, view with `echo $VAR` or `printenv`

### SSH (Secure Shell):

- **Encrypted connection** to remote Linux machines
- Run commands on servers thousands of miles away
- Foundation of cloud infrastructure management

### Processes:

- **Process:** Running program with its own memory space
- **Job:** Interactive program you can pause/resume
- Commands: `ps` (list processes), `kill` (stop process), `jobs` (list your jobs)

## 🌍 Real-World Example

**Scenario:** You're deploying a web application on a cloud server.

1. **SSH in:** `ssh user@server-ip` - Connect to remote server from your laptop
2. **Create app user:** `sudo useradd -m appuser` - Separate user for security (not root!)
3. **Set up directories:**
    
    ```bash
    sudo mkdir /var/www/myappsudo chown appuser:appuser /var/www/myappsudo chmod 755 /var/www/myapp
    ```
    
4. **Set environment variables:**
    
    ```bash
    export DATABASE_URL="postgres://..."export API_KEY="secret123"
    ```
    
5. **Install dependencies:** `sudo apt update && sudo apt install nginx`
6. **Start app as background process:** `./app &`
7. **Monitor:** `ps aux | grep app` - Check if it's running
8. **If something crashes:** `kill <pid>` or `killall app` - Stop it

Without understanding users/permissions/SSH/processes, you couldn't safely deploy or manage this app!
