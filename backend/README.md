# Flashcard Community Backend Installation Guide

Thank you for trying out our application. If you come up to various problems that you can't solve by following our troubleshooting guide, feel free to inform us by opening an issue or write us an [E-Mail](mailto:flashcardcommunity@gmail.com).

## Requirements

  - Clone the repository with any tool of your choice. We prefer GitKraken, but it is up to you!

  - Have our frontend running! See the installation guide [here](https://github.com/phoenixfeder/fc-com/tree/master/frontend). But you can also use Postman to test the API.

  - You will need...
      - IntelliJ Ultimate (maven won't work with the Community Edition)
      - MySQL Database
      - Email Account from where new users get their registration mails
      - JDK 12+

## Make it run

  0) make a new database user and a new database for this application.
  1) open the folder "backend" with IntelliJ Ultimate
  2) locate the application.properties in src/main/ressources and adjust the following data for the database and the mailaccount:
  ```PROPERTIES
  ...
  spring.datasource.url=jdbc:mysql://localhost:3306/[DATABASENAME]?useLegacyDatetimeCode=false&serverTimezone=Europe/Berlin&allowPublicKeyRetrieval=true&useSSL=false
  spring.datasource.username=[DATABASE_USERNAME]
  spring.datasource.password=[DATABASE_PASSWORD]
  ...
  spring.mail.host=
  spring.mail.port=
  spring.mail.username=
  spring.mail.password=
  ```
