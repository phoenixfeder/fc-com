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

## 1.4 References

|Title|Date|
|-|-|
|[Blog](https://flashcardcommunity.wordpress.com/)|17/10/2018|
|[GitHub](https://github.com/phoenixfeder/fc-com/)|17/10/2018|

## 1.5 Overview

The next chapters provide informations about our vision based on the use case diagram as well as more detailed software requirements.

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
- Needed for handling, storing, securing and providing data

### 3.1.1 Read data given over API endpoints
- Frontend sends data over API
- Data as JSON

### 3.1.2 Parse data
- Must be able to adjust recieved data according to the strtucuture of the database

### 3.1.3 Provide data
- Must provide data to the frontend when accessed by frontend
- Also answer with status code

## 3.2 Functionality – User Interface
- Providing an UI for the user to interact with
- gets the data from the data backend

### 3.2.1 User data
- User can see, edit his profile information after log-in respectively registration
- Can use the following functionality when logged in
- Learn statistic

### 3.2.3 Flashcard box data
- See single boxes with flashcards
- Add, remove or edit flashcards
- Share with other users
- Temporary learn boxes (e.g. correct answer < 50%>)

### 3.2.4 Flashcard data 
- User can see 2 texts, frontpage (question) and backpacke (answer)

## 3.4 Usability
-Fairly easy, will be intuitive 
- If questions come up, there is a FAQ
- User should know the principle of flashcards (FAQ)

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
### 3.8.1 Spring Boot
- Java

### 3.8.2 ReactJS
- JS
- Material UI

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