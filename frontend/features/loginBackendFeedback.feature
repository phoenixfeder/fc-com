Feature: Test of the correct feedback from the backend at the login-page
    I want to get informed if I enter wrong entries in the login-fields
    so that I can correct them

	Background:
		Given rI am on the "Login" page


	Scenario Outline: I have to enter an existing username and the fitting passsword
		When rI enter "<name>" in the "username-field"
		And rI enter "<password>" in the "password-field"
		And rI click on the "login-button"
		Then rI get a login error
	
		Examples:
			| name | password |
			| nonExistingUsername | pw123456 |
			| username | wrongPassword |

	@only
	Scenario:
		When rI enter "username" in the "username-field"
		And rI enter "pw123456" in the "password-field"
		And rI click on the "login-button"
		Then rI get redirected to the "Home" page
