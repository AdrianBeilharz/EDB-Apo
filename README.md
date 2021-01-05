# EDB-Apo

## Docker Container bauen
Auf Linux oder Windows mit java version 11 und maven
```
docker-compose down #only needed if containers already exist
cd Backend
mvn package -Dmaven.test.skip=true
cd ..
docker-compose up --build
```

Falls Auf der Windows Maschine kein Maven installiert ist, kann maven mit IntelliJ durchgeführt werden.
1. Maven sidebar öffnen
2. Rechtsklick auf backend>Lifecycle>package und modify run configuration
3. Auf den Reiter "Runner" wechseln
4. Checkbox "Use Project Settings" deaktivieren
5. Checkbox "Skip Tests" aktivieren
6. Übernehmen und OK.
7. Rechtsklick und zweite Run Config ausführen, diese ist die geänderte Run Configuration
Die target .jar dateien wurden erfolgreich erzeugt. 
`docker-compose up --build` um Container zu bauen. 
