variable "dockerhub_username" {
  type        = string
  description = "Docker Hub username"
}

variable "dockerhub_password" {
  type        = string
  description = "Docker Hub password"
  sensitive   = true
}

variable "image_name" {
  type        = string
  description = "Docker image name"
  default     = "tracker-app"
}

variable "image_tag" {
  type        = string
  description = "Docker image tag"
  default     = "latest"
}
