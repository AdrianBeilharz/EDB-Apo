# EDB-Apo

## Über Docker Compose starten
Die gesamte Anwendung kann mittels Docker Compose gebaut und gestartet werden.
Das Bauen benötigt ca. vier Minuten.
Danach ist die Webanwendung über http://localhost:3000 erreichbar. (Localhost oder IP-Adresse der Docker-Machine)

Im root Ordner:
```
docker-compose up --build
```
Da die Images viel Speicherplatz verwenden kann nachdem die Container mit `docker-compose down` entfernt wurden, alle ungenutzten Images mit `docker image prune -a` entfernt werden.


## Anwendung ohne Docker starten
Um die Anwendung ohne Docker Compose zu starten müssen folgende drei Schritte durchgeführt werden:

1. Datenbank starten
    ```
    cd Datenbank
    docker-compose up
    ```
2. Backend starten
    ```
    cd Backend
    mvn spring-boot:run
    ```
3. Frontend starten
    ```
    cd frontend
    npm start
    ```

Die Anwendung öffnet sich anschließend im Browser auf localhost:3000

## REST API-Dokumentation
Die Dokumentation zur REST-Api kann [hier](apidoc.yaml) eingesehen werden.
Diese YAML Datei kann beispielsweise über Swagger dargestellt werden.