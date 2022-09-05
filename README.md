# InventoryManagement

1. java with spring boot
2. React 
3. In memory DB H2 (Will be migrating to Azure Postgresql)



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

H2: http://localhost:8081/ims/h2/

username and password from config file



## Azure

### Database

For postgres, we used Azure SQL for Postgresql service. We created instance of service within Azure portal manually. 
Now using host, username, password, and default database postgres(we can create our own database manually). We are hitting 
postgres by making changes in application.properties. We can view table by hitting endpoint in postgres utility software
on our system. View functionality not available on azure portal.


### Deploy

Process 1:  In this we created app service in azure and then maven deploy to that resource

`mvn package azure-webapp:deploy`

Refer : [https://docs.microsoft.com/en-us/azure/app-service/quickstart-java?tabs=tomcat&pivots=platform-linux-development-environment-maven](https://docs.microsoft.com/en-us/azure/app-service/quickstart-java?tabs=tomcat&pivots=platform-linux-development-environment-maven)



Note: Added for testing pipeline





https://medium.com/google-cloud/kubernetes-101-pods-nodes-containers-and-clusters-c1509e409e16
