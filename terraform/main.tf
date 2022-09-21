# Create a resource group and resources

resource "azurerm_resource_group" "inventory-app-rg" {
  name     = var.resource_group_name
  location = var.resource_group_location
}

resource "azurerm_postgresql_server" "allegion-postgres-server" {
  name                         = var.postgresql_server_name
  resource_group_name          = azurerm_resource_group.inventory-app-rg.name
  location                     = azurerm_resource_group.inventory-app-rg.location
  sku_name                     = "B_Gen5_2"
  geo_redundant_backup_enabled = false
  auto_grow_enabled            = false
  ssl_enforcement_enabled      = true
  administrator_login          = var.postgresql_admin_username
  administrator_login_password = var.postgresql_admin_password
  version                      = var.postgresql_server_version
  public_network_access_enabled = true
}

resource "azurerm_postgresql_firewall_rule" "allegion-postgresql-server-firewall-rule" {
  name                = var.postgresql_firewall_name
  resource_group_name = azurerm_resource_group.inventory-app-rg.name
  server_name         = azurerm_postgresql_server.allegion-postgres-server.name
  start_ip_address    = var.postgresql_ip_range_start
  end_ip_address      = var.postgresql_ip_range_end
}

resource "azurerm_postgresql_database" "allegion-postgres-database" {
  name                = var.postgresql_database_name
  resource_group_name = azurerm_resource_group.inventory-app-rg.name
  server_name         = azurerm_postgresql_server.allegion-postgres-server.name
  charset             = "UTF8"
  collation           = "English_United States.1252"
}

resource "azurerm_container_registry" "inventorycontainerregistry" {
  name                    = var.container_registry_name
  resource_group_name     = azurerm_resource_group.inventory-app-rg.name
  location                = azurerm_resource_group.inventory-app-rg.location
  sku                     = "Standard"
  zone_redundancy_enabled = false
}

resource "azurerm_kubernetes_cluster" "imsappcluster" {
  name                = var.kubernetes_cluster_name
  resource_group_name = azurerm_resource_group.inventory-app-rg.name
  location            = azurerm_resource_group.inventory-app-rg.location
  dns_prefix          = var.dns_prefix

  default_node_pool {
    name       = "default"
    node_count = var.aks_node_count
    vm_size    = var.aks_node_size
  }

  tags = {
    Environment = "Production"
  }

  network_profile {
    network_plugin    = "kubenet"
    load_balancer_sku = "standard"
  }

  service_principal {
    client_id     = var.service_principal_client_id
    client_secret = var.service_principal_client_secret
  }

  role_based_access_control_enabled = true
}
