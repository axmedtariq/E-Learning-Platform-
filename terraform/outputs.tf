output "namespace_name" {
  value = kubernetes_namespace.app.metadata[0].name
}

output "configmap_name" {
  value = kubernetes_config_map.backend_config.metadata[0].name
}