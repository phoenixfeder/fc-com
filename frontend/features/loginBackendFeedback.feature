Feature: Test of the correct feedback from the backend at the login-page
    I want to get informed if I enter wrong entries in the login-fields
    so that I can correct them

	Background:
		Given I am on the "Login Page"
		
	Scenario Outline: I have to enter an existing username and the fitting passsword
		When I enter <user> in the "user-field"
		And I enter <pw> in the "password-field"
		And the user doesn't exist or the password is not the user's password
		Then I get the error <error>
	
		Examples:
			| name | password | error |
			| myuser | pw123457 | Your password is incorrect |
	
	Scenario:
		Given I enter "myuser" and "pw123456" in the right fields
		When I click the "login-button"
		Then I get linked to the main page