# InventoryManagement

This is an inventory management application intended to cater day to day inventory related operation of organisation.


## Infrastructure Setup Guide
______________________________

### Prerequisite

Have following apps available on your system:

1. Azure Subscription
2. Azure CLI (_brew install azure-cli_)
3. Terraform (_brew install hashicorp/tap/terraform_)


### Instructions

Step 1: From Azure account, get Azure subscription (subscriptionId)

Step 2: Create service principal from Azure AD, either from portal or Azure CLI (replace subscriptionId from previous step)

    az login
  
    az account set -s subscriptionId
   
    az account show

    az ad sp create-for-rbac --name inventoryserviceprincipal --role Contributor --scopes /subscriptions/subscriptionId

   Save appId, tenant, password information from output for further use. This service principal will be used while deployment or login where appId will be username and secret will be password


Step 3: From inside terraform folder, replace the values in your terraform.tfvars file with your appId and password

Step 4: Run following commands

    terraform init

    terraform validate

    terraform plan

    terraform apply -auto-approve



   <span style="color:green;">Infrastructure is ready!!</span>



## Development Guide
_____________________

### Prerequisite

1. Java 17
2. Postgresql
3. Node, Npm
4. Maven

### Instructions

#### <span style="color:orange;">Frontend</span>

From inside frontend folder,

    npm install

    npm run start

 Go to browser,   [http://localhost:3000/ims/ ](http://localhost:3000/ims/)

#### <span style="color:orange;">Frontend + Backend</span>

    mvn clean install

    mvn spring-boot:run

 Go to browser, [http://localhost:8081/ims/](http://localhost:8081/ims/)

#### <span style="color:orange;">Database</span>

Azure database for postgresql services used. For connection details, check application.properties



## Deployment Guide
________________________

### Prerequisite

1. Azure Subscription
2. Configured Azure CLI (_brew install azure-cli_)
3. Maven
4. Docker (_brew install --cask docker_)
5. kubectl (_brew install kubectl_)


### Instructions

This stage will be taken care of by Gitlab CI/CD or Azure Devops pipeline(currently both are not working).

In order to deploy manually, follow below steps:

Step 1: Build Docker Image

#### Build and Run Locally

    mvn clean install

    docker build . --tag inventorymanagement-app:1.0

    docker image ls

    docker run -p 8081:8081 inventorymanagement-app:1.0


#### Build and Push to Azure Container Registry(ACR)

To push an image to azure container registry, we need to login. There are 2 ways to login

##### Approach 1 :

      az login     (In this approach we have to manually login)

      az login --service-principal -u <applicationid> -p <service principal secret value> --tenant <tenantId> ( Recommended approach, specially when deploying via pipeline)

      az acr build . -t imscontainerregistryallegion.azurecr.io/inventorymanagement-app:{{.Run.ID}} -r imscontainerregistryallegion 

   We might have to change/update this command,  as per azure container registry name. Since globally container registry is unique. It has to be changed while infra deployment

     az acr build . -t imscontainerregistryallegion.azurecr.io/inventorymanagement-app -r imscontainerregistryallegion (To deploy with latest tag)


##### Approach 2: Using Docker, as ACR is docker 2.0

   login with service principal appId and secret as username and password respectively. 

    docker login imscontainerregistryallegion.azurecr.io -u 41bfc821-f16d-4d35-8c6e-c8b61dbb37a6 -p fHt8Q~sWrmWj5xFwDElYLdzPEbE7kJtHXes0gdc_

    docker build . -t imscontainerregistryallegion.azurecr.io/inventorymanagement-app

    docker push imscontainerregistryallegion.azurecr.io/inventorymanagement-app:latest


Step 3: Deploy Image from ACR into Azure Kubernetes Service(AKS)

    az login --service-principal -u 41bfc821-f16d-4d35-8c6e-c8b61dbb37a6 -p fHt8Q~sWrmWj5xFwDElYLdzPEbE7kJtHXes0gdc_ --tenant 9d7e183d-ddb2-438b-a6da-4b92eb265c57

    az aks get-credentials -n imsappcluster -g ims-app-resource-group

    kubectl apply -f deploy/deployment.yml -f deploy/service.yml

    kubectl get deployment
     
    kubectl get pods 

    kubectl get services (Copy externalIp and Portno from ouput)

 Eg: Check url for application http://<ExternalIP>:<PORT>/ims/
     
    http://52.186.33.163:8081/ims/


Step 4: In case we want to deploy directly as Azure App Service, without terraform. 

####  Pre-requisites
  
  1. Java
  2. Maven
  3. Azure Subscription (get subscriptionid and Resource group name)
  4. Azure CLI

  ```
    Replace subscriptionId and resourcegroup, and provide unique custom app name
    
      <plugin> 
        <groupId>com.microsoft.azure</groupId>  
        <artifactId>azure-webapp-maven-plugin</artifactId>  
        <version>2.6.1</version>  
        <configuration> 
          <schemaVersion>v2</schemaVersion>  
          <subscriptionId>f8a2e0ca-c9cb-4377-a580-096a572355a4</subscriptionId>
          <resourceGroup>practice</resourceGroup>
          <appName>alle-inventory-management-app1234</appName>
          <pricingTier>B2</pricingTier>  
          <region>eastus</region>  
          <runtime> 
            <os>Linux</os>  
            <javaVersion>Java 17</javaVersion>  
            <webContainer>Java SE</webContainer> 
          </runtime>  
          <deployment> 
            <resources> 
              <resource> 
                <directory>${project.basedir}/target</directory>  
                <includes> 
                  <include>*.jar</include> 
                </includes> 
              </resource> 
            </resources> 
          </deployment> 
        </configuration> 
      </plugin> 
   ```
 or
       
    mvn com.microsoft.azure:azure-webapp-maven-plugin:2.6.1:config

 Both approach does same, with difference later will require us to provide detail.
   
 For deployment,  
  
    az login (can also login via service principal)

    mvn package azure-webapp:deploy

Now, check https://<appname>.azurewebsites.net/ims/
   
