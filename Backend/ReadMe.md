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
In der Antwort befindet sich dann der Token, falls die Credentials falsch waren wird Statuscode `401 (Unauthorized)` zurückgeliefert.
Es wird außerdem die Apotheken-Id des Benutzers zurückgegeben.

Beispiel Response: 
```
{
    "jwt": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjA3MDY3NDQzLCJpYXQiOjE2MDcwMzE0NDN9.Vjpo0_PDLnTIMeTy2TcERyXMC7Tvgl1p9KhIU8IosY0",
    "apothekeId": "2f382480-aa73-4de1-aeb2-4adb14e1c3f7"
}
```
Für alle weitere Requests an den Server kann nun der Token verwendet werden  in einem Authorization-Header mit folgendem Format:
```
 Authorization: Bearer {token}
```

# Informationen
Falls ein Benutzer auf einen Endpoint zugreift, welcher nicht zu seiner Apotheke gehört wird Statuscode `403 (Forbidden)` zurückgegeben.
Ein Admin kann jedoch auf jeden Endpoint zugreifen.