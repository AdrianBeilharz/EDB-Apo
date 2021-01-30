# EDB-Apo

## Docker Container bauen
Die Container können mithilfe eines Befehls erstellt werden.
Der Build benötigt ca. 4 minuten.
Danach ist das Frontend über http://localhost:3000 erreichbar.
```
docker-compose up --build
```
Da die Images viel speicherplatz verwenden kann nachdem die Container mit `docker-compose down` entfernt wurden, alle ungenutzten Images mit `docker image prune -a` entfernt werden.


## REST API-Dokumentation
Die Dokumentation zur REST-Api kann [hier](apidoc.yaml) eingesehen werden.