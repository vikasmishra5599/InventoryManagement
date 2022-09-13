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


### Deploy

From terminal, have azure cli installed

` az login `  

`mvn package azure-webapp:deploy`


Check app: [http://alle-inventory-management-app.azurewebsites.net/ims/](http://alle-inventory-management-app.azurewebsites.net/ims/)





**Note**: Just FYI, we have used below command to configure azure-webapp-maven-plugin in pom.xml

` mvn com.microsoft.azure:azure-webapp-maven-plugin:2.6.1:config `

Refer : [https://docs.microsoft.com/en-us/azure/app-service/quickstart-java?tabs=tomcat&pivots=platform-linux-development-environment-maven](https://docs.microsoft.com/en-us/azure/app-service/quickstart-java?tabs=tomcat&pivots=platform-linux-development-environment-maven)

