FROM maven:3.6.3-jdk-11-slim as maven
COPY ./pom.xml ./pom.xml
COPY ./src ./src
RUN mvn dependency:go-offline -B
RUN mvn package -Dmaven.test.skip=true

FROM openjdk:11-slim
COPY --from=maven target/*.jar ./app.jar
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh
EXPOSE 8080
ENTRYPOINT ["./wait-for-it.sh","db:3306","--","java","-jar","app.jar"]