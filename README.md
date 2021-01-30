# EDB-Apo

## Über Docker Container bauen
Die Container können mithilfe eines Befehls erstellt werden.
Der Build benötigt ca. 4 minuten.
Danach ist das Frontend über http://localhost:3000 erreichbar.
```
docker-compose up --build
```
Da die Images viel speicherplatz verwenden kann nachdem die Container mit `docker-compose down` entfernt wurden, alle ungenutzten Images mit `docker image prune -a` entfernt werden.

## Anwendung ohne Docker starten
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