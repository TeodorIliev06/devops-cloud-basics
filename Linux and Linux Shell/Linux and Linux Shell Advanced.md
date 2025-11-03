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

## 🧠 Mental Model/Analogy

**The Office Building Analogy:**

- **Users** = Employees with ID badges
- **Groups** = Departments (Engineering, HR, Marketing)
- **Permissions (rwx)** = Access cards
    - **Read:** Can see through the door window
    - **Write:** Can rearrange furniture inside
    - **Execute:** Can actually walk through the door
- **Owner/Group/Others** = Three different access levels (you, your team, everyone else)
- **sudo** = Temporary master key from security guard
- **SSH** = Video call with remote office - you're not there physically, but you can tell someone what to do
- **Environment variables** = Office policy manual (where's the printer? what's the WiFi password?)
- **Processes** = Active projects being worked on

## ⚠️ Common Pitfalls

- **Misconception 1:** "chmod 777 gives everyone access - that's fine!" → **Truth:** This is a MAJOR security risk! It means anyone can read, write, and execute. Never use 777 on servers!
    
- **Misconception 2:** "I need root for everything" → **Truth:** Use `sudo` only when necessary. Running as root all the time is dangerous - one typo could destroy the system
    
- **Misconception 3:** "Permissions are the same for files and directories" → **Truth:** Execute (x) means different things: for files = can run as program, for directories = can enter/access contents
    
- **Misconception 4:** "The password in /etc/passwd is the actual password" → **Truth:** The 'x' is a placeholder; real passwords are hashed and stored in /etc/shadow (only root can read it)
    
- **Misconception 5:** "I can just kill any process" → **Truth:** You can only kill your own processes unless you use sudo. System processes require admin rights
    
- **Misconception 6:** "Environment variables persist forever" → **Truth:** They only last for your current session unless you add them to ~/.bashrc or ~/.profile
    

## 📊 Process/Steps (if applicable)

### Setting Up Secure File Permissions Workflow:

1. **Check current permissions:**
    
    ```bash
    ls -l myfile.txt
    # Output: -rw-r--r-- 1 user group 1234 Nov 3 10:00 myfile.txt
    #         │││││││││  │  │    │
    #         │││││││││  │  │    └─ group
    #         │││││││││  │  └────── owner
    #         │││││││││  └───────── # of links
    #         │││└┬┘└┬┘
    #         │││ │  └─ others: r (read only)
    #         ││└─┘──── group: r (read only)
    #         │└────── owner: rw (read + write)
    #         └───────── type: - (regular file)
    ```
    
2. **Change owner if needed:**
    
    ```bash
    sudo chown newuser:newgroup myfile.txt
    ```
    
3. **Set appropriate permissions:**
    
    ```bash
    # Using symbolic notation
    chmod u+x myfile.txt          # Give owner execute permission
    chmod g-w myfile.txt          # Remove group write permission
    chmod o=r myfile.txt          # Set others to read-only
    
    # Using octal notation
    chmod 644 myfile.txt          # rw-r--r-- (owner: rw, group: r, others: r)
    chmod 755 script.sh           # rwxr-xr-x (owner: rwx, others: rx)
    ```
    
4. **Verify changes:**
    
    ```bash
    ls -l myfile.txt
    ```
    

### SSH Connection Workflow:

1. **Connect to remote server:**
    
    ```bash
    ssh username@server-ip-or-domain
    # Example: ssh ubuntu@192.168.1.100
    ```
    
2. **Execute single command remotely:**
    
    ```bash
    ssh user@server "ls -la /var/www"
    ```
    
3. **Copy files to/from server:**
    
    ```bash
    scp localfile.txt user@server:/remote/path/
    scp user@server:/remote/file.txt ./local/path/
    ```
    
4. **Exit SSH session:**
    
    ```bash
    exit
    # or press Ctrl+D
    ```
    

## 🛠️ Tools & Technologies

**User/Permission Management:**

- **useradd/usermod/userdel:** Create, modify, delete users
- **groupadd/groupmod/groupdel:** Manage groups
- **passwd:** Change passwords
- **sudo/visudo:** Configure admin privileges

**Package Management:**

- **apt (Ubuntu/Debian):** `apt install`, `apt update`, `apt upgrade`
- **yum (CentOS/RHEL):** Similar to apt for Red Hat-based systems
- **apk (Alpine):** Lightweight package manager for Alpine Linux

**Data Transfer:**

- **wget:** Download files from web (non-interactive)
- **curl:** Transfer data from/to servers (more versatile than wget)
- **scp:** Secure copy over SSH
- **rsync:** Efficient file synchronization

**Process Management:**

- **ps:** List processes (`ps aux` shows all processes)
- **top/htop:** Interactive process viewer
- **kill/killall:** Terminate processes
- **jobs/fg/bg:** Manage foreground/background jobs

**SSH Tools:**

- **ssh:** Connect to remote machines
- **ssh-keygen:** Generate SSH keys for passwordless authentication
- **ssh-copy-id:** Copy public key to remote server

---

## 🧪 Practice Question

**Q:** You have a script called `deploy.sh` that needs to:

1. Be owned by user `devops` and group `developers`
2. Be executable by the owner and group, but only readable by others
3. Connect to a remote server (192.168.1.50) as user `admin` and restart a service

Write the commands to set this up and execute it.

**Step-by-step reasoning:**

1. Change ownership → use `chown`
2. Set permissions → rwx for owner, r-x for group, r-- for others → 754
3. SSH command with remote execution → `ssh user@host "command"`

**Solution:**

```bash
# Step 1: Change owner and group
sudo chown devops:developers deploy.sh

# Step 2: Set permissions (754 = rwxr-xr--)
chmod 754 deploy.sh

# Step 3: Execute the script
./deploy.sh

# Inside deploy.sh:
#!/bin/bash
ssh admin@192.168.1.50 "sudo systemctl restart myapp.service"
```

**Octal breakdown for 754:**

- 7 (owner) = 4+2+1 = read+write+execute
- 5 (group) = 4+0+1 = read+execute
- 4 (others) = 4+0+0 = read only

## 💭 Personal Notes

**Mental shortcut for octal:**

- 4 = read (r)
- 2 = write (w)
- 1 = execute (x)
- Add them up: 7=rwx, 6=rw-, 5=r-x, 4=r--, 0=---

**Security principle:**

- **Least privilege:** Give minimum permissions needed, nothing more
- Never run as root unless absolutely necessary
- Never use 777 permissions on production systems

**Questions to explore:**

- How do SSH keys work vs passwords?
- How do I make environment variables permanent?
- What's the difference between `kill -9` and regular `kill`?