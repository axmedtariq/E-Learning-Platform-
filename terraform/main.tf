# Create Namespace
resource "kubernetes_namespace" "app" {
  metadata {
    name = var.namespace
  }
}

# Backend ConfigMap
resource "kubernetes_config_map" "backend_config" {
  metadata {
    name      = "backend-config"
    namespace = kubernetes_namespace.app.metadata[0].name
  }

  data = var.backend_env
}