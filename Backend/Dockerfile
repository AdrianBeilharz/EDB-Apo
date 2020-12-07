FROM openjdk:16-slim
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} app.jar
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
EXPOSE 8080
ENTRYPOINT ["./wait-for-it.sh","db:3306","--","java","-jar","/app.jar"]