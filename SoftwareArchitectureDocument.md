# Software Architecture Document

# Table of Contents
- [Introduction](#1-introduction)
    - [Purpose](#11-purpose)
    - [Scope](#12-scope)
    - [Definitions, Acronyms and Abbreviations](#13-definitions-acronyms-and-abbreviations)
    - [References](#14-references)
    - [Overview](#15-overview)
- [Architectural Representation](#2-architectural-representation)
- [Architectural Goals and Constraints](#3-architectural-goals-and-constraints)
- [Use-Case View](#4-use-case-view)
    - [Use-Case Realizations](#41-use-case-realizations)
- [Logical View](#5-logical-view)
    - [Overview](#51-overview)
    - [Architecturally Significant Design Packages](#52-architecturally-significant-design-packages)
- [Process View](#6-process-view)
- [Deployment View](#7-deployment-view)
- [Implementation View](#8-implementation-view)
    - [Overview](#81-overview)
    - [Layers](#82-layers)
- [Data View](#9-data-view)
- [Size and Performance](#10-size-and-performance)
- [Quality](#11-quality)

## 1. Introduction

### 1.1 Purpose

This document provides a comprehensive architectural overview of the system, using a number of different architectural views to depict different aspects of the system. It is intended to capture and convey the significant architectural decisions which have been made on the system.

### 1.2 Scope

The scope of this SAS is to show the architecture of our FlashCardCommunity project. Illustrated are the Use-Cases, the class and data structure.

### 1.3 Definitions, Acronyms and Abbreviations

| Abbrevation | Description                            |
| ----------- | -------------------------------------- |
| API         | Application programming interface      |
| MVC         | Model View Controller                  |
| REST        | Representational state transfer        |
| SDK         | Software development kit               |
| SRS         | Software Requirements Specification    |
| UC          | Use Case                               |
| VCS         | Version Control System                 |
| n/a         | not applicable                         |
| tbd         | to be determined                       |

### 1.4 References

| Title                                                              | Date       | Publishing organization   |
| -------------------------------------------------------------------|:----------:| ------------------------- |
| [FlashCardCommunity Blog](https://flashcardcommunity.wordpress.com/)| 2018-10-XX | Team FlashCardCommunity   |
| [Repository on GitHub](https://github.com/phoenixfeder/fc-com)| 2018-10-XX | Team FlashCardCommunity        |
| [SRS](./SRS.md)                      								 | 2018-10-XX | Team FlashCardCommunity   |
| [UC Register](./UseCases/Register/Register.md)| 2018-11-18 | Team FlashCardCommunity   |
| [UC Login](./UseCases/Login/Login.md)| 2018-11-18 | Team FlashCardCommunity   |
| [UC Logout](./UseCases/Logout/Logout.md)| 2018-11-18 | Team FlashCardCommunity   |
| [UC Edit Profile](./UseCases/EditProfile/EditProfile.md)| 2018-11-18 | Team FlashCardCommunity   |
| [UC Close Account](./UseCases/CloseAccount/CloseAccount.md)| 2018-11-18 | Team FlashCardCommunity   |

### 1.5 Overview

This document contains the Architectural Representation, Goals and Constraints as well as the Logical, Deployment, Implementation and Data Views.

## 2. Architectural Representation

The backend and the frontend are both developed separted from each other and only communicate over a REST API. That said, it is hard to follow one of the
known patterns (MVC, MVP, MVVM) for the whole project. The frontend is based on the on the Redux pattern that is inspired by Facebook's Flux architecture. 
Redux is a JavaScript library that is able to manage the applications state. 

![Redux Pattern](https://cdn-images-1.medium.com/max/800/1*ZX00M-DmsrigKap7wzGoQQ.png)

The so called actions are representing the interface to our backend as REST API endpoints
are fetched here. The fetched data is then send to the reducers.

For more, see [Thinking in Redux](https://hackernoon.com/thinking-in-redux-when-all-youve-known-is-mvc-c78a74d35133).

The backend however represents a controller and model. It simply follows the MVC pattern, but the view is replaced by the whole Redux pattern. The controller does the endpoint mapping whereas the model represents the possible models that are needed for this project (e.g. user, flashcards).

## 3. Architectural Goals and Constraints

Following a closer description of the front- and backend.

### Frontend

While the frontend is based on ReactJS, it is enhanced by [Redux](https://en.wikipedia.org/wiki/Redux_(JavaScript_library)). In opposite to well known patterns like MVC, its dataflow is unidirectional. 

* Actions: As the name may already implies, actions react to events triggered by the user. They describe what happen on such events (e.g. user tries to authenticate).
* Reducer: A reducer specifies how to state of the application changes in response the called actions (e.g. user authenticated is now true) 
* Store: The store contains all the states and brings them all together to provide them all over the application. 

### Backend

The backend is written in Java and holds all the models that are needed (e.g. users, flashcards) and is able to provide the data with the help of a RestController. This is being developed with Springs dependency, Spring Boot. To store the data it communicatres with a MySQL database.

* Model: Specific classes that represent single objects such as users or flashcards.
* Controller: A RestController that does the mapping of the REST API endpoints.


## 4. Use-Case View

![Relationship Model](https://github.com/phoenixfeder/fc-com/raw/master/graphics/usecases/FlashCardCommunityUseCases.png)

### 4.1 Use-Case Realizations

N/A

## 5. Logical View

The following section provides a graphical representation of our backend. Reasons for the missing View can be found under [Architectural Representation](#2-architectural-representation) and the following section.
### 5.1 Overview

Since the projects front- and backend communicate over a REST API, it is not possible to auto generate the full architecture in one diagram. 
To be specific, React and Redux don't use classes as known from Java or other object oriented languages. The following picture describes
the backends model and controller at least.

![Class Diagram](https://github.com/phoenixfeder/fc-com/raw/master/graphics/modelcontroller.png)
Full version: https://github.com/phoenixfeder/fc-com/raw/master/graphics/modelcontroller_all.png

## 6. Process View

N/A

## 7. Deployment View

![Relationship Model](https://github.com/phoenixfeder/fc-com/raw/master/graphics/deployment_view.png)

## 8. Implementation View

N/A

### 8.1 Overview

N/A

### 8.2 Layers

N/A

## 9. Data View

The following graphic describes the relationship model of the in use database

![Relationship Model](https://github.com/phoenixfeder/fc-com/raw/master/graphics/database_model.png)

## 10. Size and Performance

N/A

## 11. Quality/Metrics

TBA