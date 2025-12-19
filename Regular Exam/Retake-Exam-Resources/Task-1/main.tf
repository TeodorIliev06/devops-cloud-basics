terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {
  registry_auth {
    address  = "registry-1.docker.io"
    username = var.dockerhub_username
    password = var.dockerhub_password
  }
}

resource "docker_image" "tracker_app" {
  name = "registry-1.docker.io/${var.dockerhub_username}/${var.image_name}:${var.image_tag}"

  build {
    context    = "${path.module}/Tracker-App"
    dockerfile = "Dockerfile"
  }
}

resource "docker_registry_image" "tracker_app" {
  name = docker_image.tracker_app.name
}
