# EDB-Apo

## Docker Container bauen

```
docker-compose up down #only needed if containers already exist
cd Backend
mvn package -Dmaven.test.skip=true
cd ..
docker-compose up --build
```
