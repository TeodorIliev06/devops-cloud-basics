variable "subscription_id" {
  default = "980001de-ea57-4c79-b432-71d6284b58b7"
}

variable "resource_group_name" {
  description = "The name of the resource group"
  type        = string
}

variable "location" {
  description = "The location of the resources"
  type        = string
}

variable "service_plan_name" {
  description = "The name of the service plan"
  type        = string
}

variable "web_app_name" {
  description = "The name of the web app"
  type        = string
}

variable "sql_server_name" {
  description = "The name of the SQL Server."
  type        = string
}

variable "sql_database_name" {
  description = "The name of the SQL Database."
  type        = string
}

variable "admin_login" {
  description = "The administrator login for the SQL Server."
  type        = string
}

variable "admin_login_password" {
  description = "The administrator login password for the SQL Server."
  type        = string
  sensitive   = true
}

variable "firewall_name" {
  description = "The name of the firewall rule."
  type        = string
}

variable "github_repo_url" {
  description = "The URL of the GitHub repository for deployment."
  type        = string
}