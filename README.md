# count-of-money-02

## How to start the project ?

### Development mode

`cd front && npm i && cd ../api && npm i && cd ../ && docker-compose -f docker-compose.dev.yml up --build -d`

### Production mode

`docker-compose up --build -d`

### Use the app

- The app is running at : `localhost:8080`
- The api documentation is running at : `http://localhost:8081/explorer/#/`
- The api url is : `localhost:8081/api`

### Test e2e
 - cd front
 - npm run e2e
