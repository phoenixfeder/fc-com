# Software Architecture Document

## Table of Contents

-   [Software Architecture Document](#software-architecture-document)

-   [Table of Contents](#table-of-contents)

    -   [1. Introduction](#1-introduction)

        -   [1.1 Purpose](#11-purpose)
        -   [1.2 Scope](#12-scope)
        -   [1.3 Definitions, Acronyms and Abbreviations](#13-definitions-acronyms-and-abbreviations)
        -   [1.4 References](#14-references)
        -   [1.5 Overview](#15-overview)

    -   [2. Architectural Representation and Patterns](#2-architectural-representation)

    -   [2.1 Technologies used](#21-technologies-used)

        -   [Spring Boot (Backend)](#spring-boot-backend)
        -   [ReactJS (Frontend)](#reactjs-frontend)

    -   [3. Architectural Goals and Constraints](#3-architectural-goals-and-constraints)

        -   [Frontend](#frontend)
        -   [Backend](#backend)

    -   [4. Use-Case View](#4-use-case-view)

        -   [4.1 Use-Case Realizations](#41-use-case-realizations)

    -   [5. Logical View](#5-logical-view)

        -   [5.1 Overview](#51-overview)

    -   [6. Process View](#6-process-view)

    -   [7. Deployment View](#7-deployment-view)

    -   [8. Implementation View](#8-implementation-view)

        -   [8.1 Overview](#81-overview)
        -   [8.2 Layers](#82-layers)

    -   [9. Data View](#9-data-view)

    -   [10. Size and Performance](#10-size-and-performance)

    -   [11. Quality/Metrics](#11-qualitymetrics)

## 1. Introduction

### 1.1 Purpose

This document provides a comprehensive architectural overview of the system, using a number of different architectural views to depict different aspects of the system. It is intended to capture and convey the significant architectural decisions which have been made on the system.

### 1.2 Scope

The scope of this SAD is to show the architecture of our FlashCardCommunity project. Illustrated are the Use-Cases, the class and data structure.

### 1.3 Definitions, Acronyms and Abbreviations

| Abbrevation | Description                         |
| ----------- | ----------------------------------- |
| API         | Application programming interface   |
| MVC         | Model View Controller               |
| REST        | Representational state transfer     |
| SDK         | Software development kit            |
| SRS         | Software Requirements Specification |
| UC          | Use Case                            |
| VCS         | Version Control System              |
| n/a         | not applicable                      |
| tbd         | to be determined                    |

### 1.4 References

| Title                                                                                                                |    Date    | Publishing organization                    |
| -------------------------------------------------------------------------------------------------------------------- | :--------: | ------------------------------------------ |
| [FlashCardCommunity Blog](https://flashcardcommunity.wordpress.com/)                                                 | 2018-10-XX | Team FlashCardCommunity                    |
| [Repository on GitHub](https://github.com/phoenixfeder/fc-com)                                                       | 2018-10-XX | Team FlashCardCommunity                    |
| [SRS](./SRS.md)                                                                                                      | 2018-10-XX | Team FlashCardCommunity                    |
| [UC Register](https://github.com/phoenixfeder/fc-com/blob/master/UseCases/Register/Register.md)                      | 2018-11-18 | Team FlashCardCommunity                    |
| [UC Login](https://github.com/phoenixfeder/fc-com/blob/master/UseCases/Login/Login.md)                               | 2018-11-18 | Team FlashCardCommunity                    |
| [UC Logout](https://github.com/phoenixfeder/fc-com/blob/master/UseCases/Logout/Logout.md)                            | 2018-11-18 | Team FlashCardCommunity                    |
| [UC Edit Profile](https://github.com/phoenixfeder/fc-com/blob/master/UseCases/EditProfile/EditProfile.md)            | 2018-11-18 | Team FlashCardCommunity                    |
| [UC Close Account](https://github.com/phoenixfeder/fc-com/blob/master/UseCases/CloseAccount/CloseAccount.md)         | 2018-11-18 | Team FlashCardCommunity                    |
| [UC Flashcards](https://github.com/phoenixfeder/fc-com/blob/master/UseCases/FlashCard/FlashCard.md)                  | 2019-04-07 | Team FlashCardCommunity FlashCardCommunity |
| [UC Flashcardboxes](https://github.com/phoenixfeder/fc-com/blob/master/UseCases/FlashcardBox/FlashcardBox.md)        | 2019-04-07 | Team FlashCardCommunity FlashCardCommunity |
| [UC Sharing](https://github.com/phoenixfeder/fc-com/blob/master/UseCases/ShareFlashcardBoxes/ShareFlashcardBoxes.md) | 2019-04-07 | Team FlashCardCommunity FlashCardCommunity |
| [UC Learning](https://github.com/phoenixfeder/fc-com/blob/master/UseCases/Learning/Learning.md)                      | 2019-04-07 | Team FlashCardCommunity FlashCardCommunity |
| [UC FAQ](https://github.com/phoenixfeder/fc-com/blob/master/UseCases/FAQ/FAQ.md)                                     | 2019-04-07 | Team FlashCardCommunity FlashCardCommunity |

### 1.5 Overview

This document contains the Architectural Representation, Goals and Constraints as well as the Logical, Deployment, Implementation and Data Views.

## 2. Architectural Representation and Patterns

The backend and the frontend are both developed separted from each other and only communicate over a REST API. That said, it is hard to follow one of the
known patterns (MVC, MVP, MVVM) for the whole project. The frontend is based on the on the Redux pattern that is inspired by Facebook's Flux architecture.
Redux is a JavaScript library that is able to manage the applications state.

![Redux Pattern](https://cdn-images-1.medium.com/max/800/1*ZX00M-DmsrigKap7wzGoQQ.png)

The so called actions are representing the interface to our backend as REST API endpoints
are fetched here. The fetched data is then send to the reducers.

For more, see [Thinking in Redux](https://hackernoon.com/thinking-in-redux-when-all-youve-known-is-mvc-c78a74d35133).

On top of that we we decided to implement the destructuring props pattern in the frontend. Destructuring props is especially useful to keep the code a bit more clean. For example:

`console.log(this.props.foo); console.log(this.props.bar);`

Turns into…

`const { foo, bar } = this.props;`

`console.log(foo); console.log(bar);`

Still one has to keep in mind that this pattern is not the best for many lines of codes as one can confuse the destructured props with a simple variable. To see the difference in our code, check the commits found under [this search query](https://github.com/phoenixfeder/fc-com/search?q=FCC-172&unscoped_q=FCC-172&type=Commits).

The backend however represents a controller and model. It simply follows the MVC pattern, but the view is replaced by the whole Redux pattern. The controller does the endpoint mapping whereas the model represents the possible models that are needed for this project (e.g. user, flashcards).

On other explicit pattern used is the proxy pattern. In proxy pattern, a class represents functionality of another class. So we developed a class that generally took care of the mail dispatch and inherited it to two subclasses. Both subclasses had different values stored for the content of the respective mails. Now another subclass takes care of the administration of both subclasses and sends the right mail if needed.

You can compare:

-   Before: [Mail.java](https://github.com/phoenixfeder/fc-com/blob/05c0465504329b0036d19984dafa6a23da7b1d60/backend/src/main/java/server/modules/utils/Mail.java)
-   After: [mailsender module](https://github.com/phoenixfeder/fc-com/tree/29ff290a4508638620e2a0dd9092463876bba026/backend/src/main/java/server/modules/mailsender)

## 2.1 Technologies used

tl;dr; Blogpost [here!](https://flashcardcommunity.wordpress.com/2019/06/01/week-10-ci-cd-tech-stack/?preview_id=241&preview_nonce=d917ff2d90&preview=true)

IDEs:

-   Frontend: Visual Studio Code, IntelliJ Webstorm
-   Backend: IntelliJ IDEA Ultimate 

Languages:

-   Frontend: JavaScript, HTML, CSS, JSON for data transfer
-   Backend: Java, hardly any SQL
-   Other: YAML for e.g. Travis configuration

Frameworks:

-   Frontend: ReactJS, Redux, MaterialUI
-   Backend: Springboot

Testing (part of CI / CD mentioned Travis pipeline):

-   Frontend: Jest for Redux Reducer testing, TestCafé for running UI tests based on Gherkin / Cucumber .feature files
-   Backend: Postman API integration tests
-   Coverage: Codecov.io

Metrics & Patterns (part of CI / CD mentioned Travis pipeline):

-   Codacy
-   SonarCloud
-   CodeMR (excluded from pipeline)

Deployment (part of CI / CD mentioned Travis pipeline):

-   Heroku
-   Docker

In detail:

### Spring Boot (Backend)

Spring Boot is built on top of the Java Spring framework and provides the developer with helpful features to create and run web applications. In our case, a REST Web Service
which represents the interface between our front- and backend. As we want to benefit from the newest features of Java 10, the platform this service will be hosted on needs to support Java 10 or higher.

We use InteliJ IDEA Ultimate for coding in the backend. The backend will be written with pure Java. Only to fill our database with testable content we use one file SQL.

### ReactJS (Frontend)

ReactJS helps building interactive UIs that can be updated dynamically and therefore eliminate the need to refresh the web application. One can also develop single
components and can reuse them all over the application. Such a component could be a login form, a profile card or anything else one wants to reuse. We are going to
import a React framework called Material-UI that provides a lot of pre-defined components. Its design based on the Material-Design of Google. The development will
take place with the newest version of JavaScript. Fortunately, our development environment is able to compile it to the lower version of JavaScript. Thus, we can
use the newest features without having to worry about browser compatibility.
Furthermore we will extend ReactJS with Redux. Redux allows us to keep track of state changes in the frontend and is able to notify other components about it.

We use Visual Studio Code and IntelliJ Webstorm for coding in the frontend. To display we use HTML and CSS and for functionality we use JavaScript.

## 3. Architectural Goals and Constraints

Following a closer description of the front- and backend.

### Frontend

While the frontend is based on ReactJS, it is enhanced by [Redux](https://en.wikipedia.org/wiki/Redux_(JavaScript_library)). In opposite to well known patterns like MVC, its dataflow is unidirectional.

-   Actions: As the name may already implies, actions react to events triggered by the user. They describe what happen on such events (e.g. user tries to authenticate).
-   Reducer: A reducer specifies how to state of the application changes in response the called actions (e.g. user authenticated is now true)
-   Store: The store contains all the states and brings them all together to provide them all over the application.

### Backend

The backend is written in Java and holds all the models that are needed (e.g. users, flashcards) and is able to provide the data with the help of a RestController. This is being developed with Springs dependency, Spring Boot. To store the data it communicatres with a MySQL database.

-   Model: Specific classes that represent single objects such as users or flashcards.
-   Controller: A RestController that does the mapping of the REST API endpoints.

## 4. Use-Case View

![Relationship Model](https://github.com/phoenixfeder/fc-com/raw/master/graphics/usecases/FlashCardCommunityUseCases.png)

### 4.1 Use-Case Realizations

-   N/A

## 5. Logical View

The following section provides a graphical representation of our backend. Reasons for the missing View can be found under [Architectural Representation](#2-architectural-representation) and the following section.

### 5.1 Overview

Since the projects front- and backend communicate over a REST API, it is not possible to auto generate the full architecture in one diagram.
To be specific, React and Redux don't use classes as known from Java or other object oriented languages. The following picture describes
the backends model and controller at least.

![Class Diagram](https://github.com/phoenixfeder/fc-com/raw/master/graphics/modelcontroller.png)
Full version: <https://github.com/phoenixfeder/fc-com/raw/master/graphics/modelcontroller_all.png>

## 6. Process View

-   N/A

## 7. Deployment View

We are currently deploying to [Heroku FCC App](http://flashcardcommunity.herokuapp.com/). To use a database at Heroku, one has to enter debitcard information which we, after agreement with the client, are not in need to do! That is why you will see an application error, but what you can see in the picture above is, that the deployment itself works just fine! Also running the application in an enviroment with a databse is working fine. Furthermore our newest docker container can be found under [DockerHub fccom](https://hub.docker.com/r/fccom/fccom).

![Relationship Model](https://github.com/phoenixfeder/fc-com/raw/master/graphics/deployment_view.png)

## 8. Implementation View

-   N/A

### 8.1 Overview

-   N/A

### 8.2 Layers

-   N/A

## 9. Data View

The following graphic describes the relationship model of the in use database

![Relationship Model](https://github.com/phoenixfeder/fc-com/raw/master/graphics/database_model.png)

## 10. Size and Performance

-   N/A

## 11. Quality/Metrics

To ensure the quality of our frontend, we implemented UI tests with the help of Testcafé. Within, we created different scenarios to test every case that could possibly throw errors.
Also we implemented Jest for Redux Reducer testing.
To display our test coverage we use codecov.io.

-   [codecov.io](https://codecov.io/gh/phoenixfeder/fc-com)

For the Backend we use Postman to test the REST API calls. This is also automated and can be run through all Testcases.

We also use following tools:

-   [Codacy](https://app.codacy.com/project/FlashCardCommunity/fc-com/dashboard)
-   [SonarCloud](https://sonarcloud.io/dashboard?id=Nifori_fc-com)
-   CodeMR (excluded from pipeline)

To give an example, Codacy informed us about a method in which the path complexity was quite high because it contained many if queries. On closer inspection, this method doesn’t use any of our capabilities in our architecture at the time. In order to solve this, parts of the method were meaningfully outsourced and the existing possibilities used.

Another Metric we tried to improve is called “Coupling Between Object” (CBO). This describes the number of dependencies with other classes and should not exceed a certain value. We took the worst method and split it into smaller methods, which are now called one after the other. Since our architecture does not allow to reduce the total number of dependencies, the dependencies per method can be sensibly reduced. 

Check [article written by us](https://flashcardcommunity.wordpress.com/2019/05/28/week-8-metrics/) for more information. You can find the overall information as well [here.](https://github.com/phoenixfeder/fc-com/blob/master/TestPlan.md#7-deliverables)
  
