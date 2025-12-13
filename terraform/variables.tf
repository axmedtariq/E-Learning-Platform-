variable "namespace" {
  description = "Application namespace"
  type        = string
  default     = "app"
}

variable "backend_env" {
  description = "Backend environment variables"
  type        = map(string)
  default = {
    NODE_ENV = "production"
    PORT     = "3000"
  }
}