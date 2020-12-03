# Getting started

Als Backend-Framework wird SpringBoot verwendet mit einer Anbindung zu einer MySQL Datenbank, welche über Docker gestartet wird.

### 1. Datenbank starten
um die Datenbank zu starten wird docker-compose verwendet
```
cd Datenbank
docker-compose up
```

### 2. SpringBoot starten
```
cd Backend
mvn spring-boot:run
```

# Login
Um ein JWT (JSON Web Token) zu bekommen:
```
POST /login
body: {
    "username":"DerBenutzername",
    "password":"DasPasswort",
}
```
In der Antwort befindet sich dann der Token, falls die Credentials falsch waren wird Statuscode `401 (Unauthorized)` zurückgeliefert

```
response: 
{
    "jwt":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjA3MDUzMjc2LCJpYXQiOjE2MDcwMTcyNzZ9.eO_TubMwWbcNoNvFjMfnokKHeZlf7lMktO8SsHb8H3k"
}
```
Für alle weitere Requests an den Server kann nun der Token verwendet werden  in einem Authorization-Header mit folgendem Format:
```
 Authorization: Bearer {token}
```