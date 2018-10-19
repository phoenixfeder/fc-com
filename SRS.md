# Flashcard Community - Software Requirements Specification

# Table of Contents
- [Introduction](#1-introduction)
    - [Purpose](#11-purpose)
    - [Scope](#12-scope)
    - [Definitions, Acronyms and Abbreviations](#13-definitions-acronyms-and-abbreviations)
    - [References](#14-references)
    - [Overview](#15-overview)
- [Overall Description](#2-overall-description)
    - [Vision](#21-vision)
    - [Product perspective](#22-product-perspective)
    - [User characteristics](#23-user-characteristics)
    - [Dependencies](#24-dependencies)
- [Specific Requirements](#3-specific-requirements)
    - [Functionality - Data Backend](#31-functionality--data-backend)
    - [Functionality - User Interface](#32-functionality--user-interface)
    - [Usability](#34-usability)
    - [Reliability](#35-reliability)
    - [Performance](#36-performance)
    - [Supportability](#37-supportability)
    - [Design Constraints](#38-design-constraints)
    - [Online User Documentation and Help System Requirements](#39-online-user-documentation-and-help-system-requirements)
    - [Purchased Components](#310-purchased-components)
    - [Interfaces](#311-interfaces)
    - [Licensing Requirements](#312-licensing-requirements)
    - [Legal, Copyright and other Notices](#313-legal-copyright-and-other-notices)
    - [Applicable Standards](#314-applicable-standards)
- [Supporting Information](#4-supporting-information)

# 1. Introduction
## 1.1 Purpose

The purpose of this document gives a general description of the Flashcard Community Project. It explains our vision and all features of the product. Also it offers insights into the system of back- and frontend, the interfaces in both ends for communication and the constraints of the product.

## 1.2 Scope

This document is designed for internal use only and will outline the development process of the project.

## 1.3 Definitions, Acronyms and Abbreviations

|Term||
|-|-|
|**SRS**|Software Requirements Specification|
|**JSON**|JavaScript Object Notation|
|**API**|Application Programming Interface|
|**MTBF**|Mean Time Between Failures|
|**MTTR**|Mean Time To Repair|
|**DTO**|Data Transfer Object|
|**HTTP**|Hypertext Transfer Protocol|
|**FAQ**|Frequently Asked Questions|
|**REST**|Representational State Transfer|

## 1.4 References

|Title|Date|
|-|-|
|[Blog](https://flashcardcommunity.wordpress.com/)|17/10/2018|
|[GitHub](https://github.com/phoenixfeder/fc-com/)|17/10/2018|
|[Spring Boot](https://spring.io/projects/spring-boot)|19/10/2018|
|[ReactJS](https://reactjs.org/)|19/10/2018|

## 1.5 Overview

The next chapters provide information about our vision based on the use case diagram as well as more detailed software requirements.

# 2. Overall Description
## 2.1 Vision
The goal of Flashcard Community is to create an online solution for creating flashcards, sort them in boxes and learn with those using some of known learning-systems we will implement. Users can share their boxes with other users, so they can form a small learning community or learning groups.

## 2.2 Product perspective

TODO

*use case diagram*

## 2.3 User characteristics
TODO

## 2.4 Dependencies
TODO

# 3. Specific Requirements
## 3.1 Functionality – Data Backend
The backend is needed to separate the user interface from the data storage. It verifies if the correct permissions are present to request data or to ensure that incoming data is properly parsed and saved correctly. For security reasons data is filtered by the backend. It is then packed in the right format which the next chapter describes. The data is kept inside a database and maintained by the backend.

### 3.1.1 Read data given over API endpoints
For the communication between both sides (frontend and backend) a universal data format is needed, therefore JSON is used. The frontend sends data in JSON to the backend in form of a request and waits for a response from the backend which also answers with JSON.

### 3.1.2 Parse data
Incoming data needs to be checked if the sent values represent the correct data type and if the user that sends the request has the permissions to do so. For the data transfer we use so called DTO objects, which is an reduced and compact form of the entities the backend is using with the database. 

### 3.1.3 Provide data
After data is requested from the frontend and the user is allowed to do so, the backend sends out the previously mentioned DTO objects. In addition, the response contains a HTTP status code even if the request failed so that the frontend knows if it just received data or an error.

## 3.2 Functionality – User Interface
The frontend provides an user interface for the users to interact with and is able to request data from the data backend. The following subsections explain the types of data the frontend can request.

### 3.2.1 User system
At registration, the data provided by the user is stored in the backend. It is needed to log in, edit the profile and also provides the basis for a permission-system. 

### 3.2.3 Flashcard boxes
Data related to single flashcard boxes contain references to individual flashcards. A user can give permissions to other users so they're able to use the same flashcard box as well. 
A user is able to learn with those boxes using different methods.

### 3.2.4 Flashcards
A flashcard data is composed of a virtual front- and backpage. For a better overview, flashcards can only be accessed from a individual flashcard boxes.

### 3.2.5 Statistics
Statistics contains information about the learning progress of individual flashcard boxes and is saved per single user, not per box.

## 3.4 Usability
We will build the user interface intuitive, so that a new user does not necessarily need an explanation. If questions arise our interface provides a comprehensive FAQ. If the user doesn't know the principle of flashcards and a system to learn with them, the user interface provides a manual how to learn with flashcards as well.

## 3.5 Reliability
In the following we describe the availability, MTBF and MTTR, accuracy and bug classes we strive for.

### 3.5.1 Availability
Since we are trying to focus on a bug free application rather than caring about hosting it on our own, the availability depends on the hosting
provider we choose. Due redundancy and other security arrangements, most providers can ensure an uptime over 99.9% of the time its hosted at 
their datacenter.

### 3.5.2 MTBF, MTTR
If the application fails due an hardware issue, then the mean times are up to our hosting provider. Since the ensured uptime of most hosting providers
is 99.9%, they try to fix the issue within a few minutes.
However, if the application fails due a bug in our code, we can revert the code to a previous version that worked fine. This shouldn't take more than
one or two hours from the point on we noticed.

### 3.5.3 Accuracy
We can't ensure that the information on the flashcards will be correct since they will be provided by the user itself. As we develop the functions on 
our own, we can only guarantee that our F.A.Q. will be correct.

### 3.5.6 Bug classes
We classify bugs like the following:
- **Critical bug**: A critical bug occurs when the database starts dropping data without intention, secret user information, like passwords, are open to the public
or users are not able to use the application at all.
- **Non critical bug**: A non critical bug appears when the user still can use the application but it appears glitched and the user experience is slightly influenced.

## 3.6 Performance
In general, we try to keep to user experience fluent and response times low. High peaks can still appear when the user loads a large flashcard box or the hosting 
provider is currently having issues.

### 3.6.1 Response time
As nearly the whole UI will be loaded initially, even pages that aren't shown yet, will appear within less than 100ms when accessed. 
A huge flashcard box (200 and more) can take a one or two seconds to load, especially when the backend currently needs to handle a larger
amount of requests.

### 3.6.2 Throughput
The amount of transactions between the frontend or the backend totally depends on the users behaviour. There will be a few more transactions
when a user accesses the application initially, but as long he isn't requesting a lot of flashcard boxes hardly any transactions will occur.

### 3.6.3 Capacity
Current database management software is able to handle single tables up to 65TB of data. Therefore one can say we theoretically able to host
a nearly unlimited amount of flashcards. Of course we are not able to afford such a huge database, but even on a small storage we can easily 
host enough flashcards for a small user base. 

### 3.6.4 Resource utilization
Once requested flashcards are loaded, we try to keep them on the client side as long as possible. Thus we decline the waiting time for the user
and leave open resources for other requests by other users. 

## 3.7 Supportability
Our frontend, backend and each functionality will be clearly separated and we try to stick to naming conventions which are common in the used technologies. 
Furthermore we aim to keep our code clean which we can't guarantee though. Thereby we make it easy to understand our infrastructure and avoid possible confusion
when one needs to edit older parts of the application.


## 3.8 Design Constraints
We are focused on building a modern-looking application using modern technologies. Of course there are other smaller libraries and frameworks used than the ones that
are listed, but they represent just a small fraction of the whole project and aren't worth mentioning. Especially in ReactJS one does add a lot of external modules.

### 3.8.1 Spring Boot
Spring Boot is built on top of the Spring framework and provides the developer with helpful features to create and run web applications. In our case, a REST Web Service
which represents the interface between our front- and backend. As we want to benefit from the newest features of Java 10, the platform this service will be hosted on 
needs to support Java 10 or higher.

### 3.8.2 ReactJS
ReactJS helps building interactive UIs that can be updated dynamically and therefore eliminate the need to refresh the web application. One can also develop single 
components and can reuse them all over the application. Such a component could be a login form, a profile card or anything else one wants to reuse. We are going to 
import a React framework called Material-UI that provides a lot of pre-defined components. Its design based on, oh wonder, the Material-Design. The development will
take place with the newest version of JavaScript. Fortunately, our development environment is able to compile it to the lower version of JavaScript. Thus, we can
use the newest features without having to worry about browser compatibility. 

### 3.8.3 Supported Platforms 
Since FlashCardCommunity will be a web application the user only needs a modern web browser and a stable internet connection. With modern web browser we mean the
current versions of Mozilla Firefox, Google Chrome, Opera, Edge and even IE down to version 9 will be supported!

## 3.9 Online User Documentation and Help System Requirements
We want a provide a F.A.Q. for possible questions that can come up when using our application. Since it can be frustrating when a F.A.Q. doesn't really help with 
your answering problems, we want each F.A.Q. to be easy to understand and follow. For example a F.A.Q. that answers how to create a flashcard will include step-by-step
instructions and enough pictures to show the user exactly what to click at.

## 3.10 Purchased Components
- N\A


## 3.11 Interfaces
### 3.11.1 User Interfaces
- One site for each given functionality (see top)
- Sites accesible over menu
- Easy on the eyes

### 3.11.2 Hardware Interfaces
N\A

### 3.11.3 Software Interfaces
- API stuff here

### 3.11.4 Communications Interfaces
- JSON stuff here

## 3.12 Licensing Requirements
- MIT License, see Repo

## 3.13 Legal, Copyright and other Notices
N\A

## 3.14 Applicable Standards
N\A

# 4. Supporting Information
For a better overview, watch the table of contents and/or references.