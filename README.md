# Flashcard-Community

[![Badge](https://api.codacy.com/project/badge/Grade/95260a54312140bf99814090ab89a940?isInternal=true)](https://app.codacy.com/project/FlashCardCommunity/fc-com/dashboard) [![Badge](https://travis-ci.org/phoenixfeder/fc-com.svg?branch=master)](https://travis-ci.org/phoenixfeder/fc-com) [![codecov](https://codecov.io/gh/phoenixfeder/fc-com/branch/master/graph/badge.svg)](https://codecov.io/gh/phoenixfeder/fc-com) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Nifori_fc-com&metric=alert_status)](https://sonarcloud.io/dashboard?id=Nifori_fc-com)

## Installation instructions

In the following you can find installation instructions for both running-only and development purposes.

### Just run the application

Requirements:

-   [Docker](https://www.docker.com/)
-   [MySQL Database called 'fcc_db'](https://docs.docker.com/samples/library/mysql/)
-   [E-Mail (Fake SMTP is enough)](http://nilhcem.com/FakeSMTP/)

To start the local fake SMTP server run the following in your terminal:

`java -jar fakeSMTP-2.0.jar -s -b -p 127.0.0.1 -a 2525`

Create a database (for mysql for docker):

a) First run the mysql database:

`docker run --name=test-mysql --env="MYSQL_ROOT_PASSWORD=<SQL_Server_UserPassword>" mysql`

b) Get the ip adress of your mysql docker container:

`docker inspect test-mysql`

c) Create database 'fcc_db':

`mysql -uroot -pmypassword -h 172.17.0.2 -P 3306`

`CREATE DATABASE fcc_db;`

`USE fcc_db;`

Now pull and run the application (make sure to replace the `<Placeholders>`):

`docker run -p 8080:8080 --network host --name="fcc-app" -e "SPRING_MAIL_PASSWORD=<Any_Mail_Password>" -e "SPRING_MAIL_HOST=127.0.0.1" -e "SPRING_MAIL_PORT=2525" -e "SPRING_MAIL_PROPERTIES_MAIL_SMTP_STARTTLS_ENABLE=false" -e "SPRING_DATASOURCE_URL=jdbc:mysql://<IP_Adress_Of_Your_SQL_Server>:3306/fcc_db?useLegacyDatetimeCode=false&serverTimezone=Europe/Berlin&allowPublicKeyRetrieval=true&useSSL=false" -e "SPRING_DATASOURCE_USERNAME=root" -e "SPRING_DATASOURCE_PASSWORD=<SQL_Server_UserPassword>" fccom/fccom:prod`

You should now be able to reach the application under <localhost:8080/>. Have fun!

### Get everything ready for development

Installation instructions can be found in the front- and backend folder.

-   [Frontend](https://github.com/phoenixfeder/fc-com/tree/master/frontend)
-   [Backend](https://github.com/phoenixfeder/fc-com/tree/master/backend)
