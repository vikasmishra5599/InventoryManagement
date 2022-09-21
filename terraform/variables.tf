# variable declaration

variable "resource_group_name" {
  default = "ims-app-resource-group"
}

variable "resource_group_location" {
  default = "East US"
}

#Postgresql variables
variable "postgresql_server_name" {
  default = "ims-postgres-server"
}

variable "postgresql_server_version" {
  default = "11"
}

variable "postgresql_database_name" {
  default = "inventorymanagement"
}

variable "postgresql_firewall_name" {
  default = "psqlfirewallrule"
}

variable "postgresql_admin_username" {
  default = "imsadmin"
}

variable "postgresql_admin_password" {
  default = "Ims@1234"
}

variable "postgresql_ip_range_start" {
  default = "0.0.0.0"
}

variable "postgresql_ip_range_end" {
  default = "255.255.255.255"
}

# Container Registry
variable "container_registry_name" {
  default = "imscontainerregistryallegion"
}

#AKS variables
variable "kubernetes_cluster_name" {
  default = "imsappcluster"
}

variable "dns_prefix" {
  default = "imsaks"
}

variable "aks_node_count" {
  default = 1
}

variable "aks_node_size" {
  default = "Standard_D2_v2"
}


# The following two variable declarations are placeholder references.
# Set the values for these variable in terraform.tfvars
variable "service_principal_client_id" {
  default = ""
}

variable "service_principal_client_secret" {
  default = ""
}
