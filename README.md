# InventoryManagement

1. java with spring boot
2. React 
3. In memory DB H2 (Will be migrating to Azure Postgresql)
4. Docker
5. Kubernetes
6. Azure CLI


## Frontend
From frontend application, 

`npm install`

`npm run start`


Go to browser,   [http://localhost:3000/ims/ ](http://localhost:3000/ims/)



## Frontend + Backend

mvn clean install

mvn spring-boot:run

Go to browser, [http://localhost:8081/ims/](http://localhost:8081/ims/)


## Run (Inside DOCKER container locally)

### Build

`docker build . --tag ims-app:1.0`

### Run

`docker run -p 8081:8081 ims-app:1.0`

#### Other useful command

docker image ls


### Database

Azure database for postgresql services used. Details available in application.properties


### Deploy via maven

From terminal, have azure cli installed

` az login `  

`mvn package azure-webapp:deploy`


Check app: [http://alle-inventory-management-app.azurewebsites.net/ims/](http://alle-inventory-management-app.azurewebsites.net/ims/)



### Build and Push Image to Azure container registry

To push an image to azure container registry, we need to login. There are 2 ways to login


Approach 1

```
az login

or 

az login -u <username> -p <password>
 
or  login with servcie principal 

az login --service-principal -u <applicationid> -p <service principal secret value> --tenant <tenantId>


az acr build -t imscr.azurecr.io/inventory-management:{{.Run.ID}} -r imscr .

or

az acr build -t imscr.azurecr.io/inventory-management -r imscr .
```
 
Approach 2: ACR is docker 2.0
```
 login with service principal in docker

docker login imscr.azurecr.io -u imscr -p 26LF=ORrMXkMA0EMsMvtNfAByFaBE8gX

docker build . -t imscr.azurecr.io/inventory-management:latest

docker push imscr.azurecr.io/inventory-management:latest


In username & password, simply use access key or service principal,

For service principal, username will be applicationId && password will be secret value of service principal

```


### Deploy image from ACR to AKS(Azure kubernetes service)

In order to create cluster, its a one time activity:
az aks create -n imsappcluster -g VSR --node-count 1 --generate-ssh-keys --attach-acr imscr



az aks get-credentials -n imsappcluster -g VSR

k apply -f deploy/deployment.yml -f deploy/service.yml

k get pods _Verify pods are running_

k get services _Copy externalIp and Portno_ 

Eg:  http://52.186.33.163:8081/ims/




**Note**: Just FYI, we have used below command to configure azure-webapp-maven-plugin in pom.xml

` mvn com.microsoft.azure:azure-webapp-maven-plugin:2.6.1:config `

Refer : [https://docs.microsoft.com/en-us/azure/app-service/quickstart-java?tabs=tomcat&pivots=platform-linux-development-environment-maven](https://docs.microsoft.com/en-us/azure/app-service/quickstart-java?tabs=tomcat&pivots=platform-linux-development-environment-maven)

