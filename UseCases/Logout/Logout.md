# Use-Case Specification: Register


## 1. General
A short overview of the use case including first mock-ups.
### 1.1 Brief Description
A visitor will be able to log in to his account by providing his username and password. 
To log in is needed to use the full functionality of our platform.

### 1.2 Mock-up
A real mockup is not needed as it just will be simple button.
![Mockup](https://github.com/phoenixfeder/fc-com/raw/master/UseCases/Logout/LogoutMockupLarge.JPG)

## 2. Flow of Events
A flowchart about what happens on each side of the application for this specific use case. 
### 2.1 Basic Flow

![Logout Flowchart](https://github.com/phoenixfeder/fc-com/raw/master/UseCases/Logout/LogoutFlowchart.png)

	
## 3. Special Requirements

N/A


## 4. Preconditions
Description of what is required before the user clicks log out.

### 5.1 Is logged in
To log out, the user has to be logged in.
 
## 5. Postconditions
Description of what is required after the user clicked log out.

### 5.1 Delete token
The token that is stored on the client to remember the log in needs to be deleted.

### 5.1 Redirect to welcome page
When token is deleted, redirect to welcome page.


## 6. Extension Points
N/A 