Feature: Test of the correct feedback from the backend at the login-page
    I want to get informed if I enter wrong entries in the login-fields
    so that I can correct them

	Background:
		Given rI am on the "Login" page

@login
	Scenario Outline: I have to enter an existing username and the fitting passsword
		When rI enter "<name>" in the "username-field"
		And rI enter "<password>" in the "password-field"
		And rI click on the "login-button"
		Then rI get the message "Invalid username or password."

		Examples:
			| name | password |
			| nonExistingUsername | pw123456 |
			| username | wrongPassword |

	@login
	Scenario:
		When rI enter "testuser" in the "username-field"
		And rI enter "123456" in the "password-field"
		And rI click on the "login-button"
		Then rI get the message "Your account is not verified yet."

	@login
	Scenario:
		When rI enter "enableduser" in the "username-field"
		And rI enter "123456" in the "password-field"
		And rI click on the "login-button"
		Then rI get redirected to the "Home" page
		And rI get the message "You are now logged in, enableduser!"
