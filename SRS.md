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
    - [Functionality - Data Analytics](#33-functionality--data-analytics)
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
### 3.5.1 Availability
- 99.9%, depends on hoster but every hoster has outages here and there

### 3.5.2 MTBF, MTTR
- Depends on hoster, non critical bugs however will be fixed when there is time, critical bugs within days

### 3.5.3 Accuracy
- depends on the data the user provides
- We can't secure the accuracy of the flashcards

### 3.5.6 Bug classes
- critical bug: data loss, user data leak
- non critical bug: data not shown  (not deleted), other visual bugs

## 3.6 Performance
### 3.6.1 Response time
- keep minimum to not have impact at user experience
- e.g. loading 200 cards response time 2 seconds
- average (without loading data) 50ms

### 3.6.2 Throughput
- depends on amount of cards to be loaded, no transactions needed when users are inactive

### 3.6.3 Capacity
- Theoretically unlimited when enough disk space is provided, mysql can handle tables up to 65 tb of data

### 3.6.4 Resource utilization
- We try to keep transactions limited by sending the exact data that is needed, not more not less
- 

## 3.7 Supportability
- Clear separation of front and backend
- We stick to naming and coding conventions of the libaries and frameworks we use
- 

## 3.8 Design Constraints
### 3.8.1 Spring Boot
- Java

### 3.8.2 ReactJS
- JS
- Material UI

### 3.8.3 Supported Platforms 
- Current webbrowser
- Stable internet connection

## 3.9 Online User Documentation and Help System Requirements
- Step-by-step underlined with pictures 

## 3.10 Purchased Components
- N\A

### 3.10.1 Racing simulation required
TODO

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