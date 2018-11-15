Feature: Test of the correct feedback from the backend at the login-page
    I want to get informed if I enter wrong entries in the login-fields
    so that I can correct them

	Background:
		Given I am on the "Login Page"
		
	Scenario Outline: I have to enter an existing username and the fitting passsword
		When I enter <name> in the "user-field"
		And I enter <password> in the "password-field"
		Then I get a login error
	
		Examples:
			| name | password |
			| nonExistingUsername | pw123456 |
			| username | wrongPassword |
	
	Scenario:
		When I enter "username" in the "user-field"
		And I enter "pw123456" in the "password-field"
		And I click the "login-button"
		Then I get linked to the main page		