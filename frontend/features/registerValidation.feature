
Feature: Test of the users input at the register-page
    As a guest 
    I want to get informed if I enter wrong entries in the registration-fields
    so that I can correct them

    Background:
         Given I am on the "Registration" page

  @all
    @register
    Scenario Outline: I am not allowed to enter too short or too long names
        When I enter "<name>" in the "username-field"
        And I click on the "register-button"
        Then I get the error "<error>" in the "username-error-field"
        And  I get the message "Registration failed: Invalid input"


        Examples:
            | name                       | error                      |
            | ab                         | Username must be at least 3 characters and maximal 12 characters. |
            | abcdefghijklmnopqrstuvwxyz | Username must be at least 3 characters and maximal 12 characters.  |

  @all
    @register
    Scenario Outline: I have to enter the email adress in the correct format
        When I enter "<email>" in the "email-field"
        And I click on the "register-button"
        Then I get the error "This is not an email address." in the "email-error-field"
        And  I get the message "Registration failed: Invalid input"

        Examples:
            | email       |
            | s           |
            | sss.@de     |
            | aaa.aaa@ de |

  @all
    @register
    Scenario Outline: I am not allowed to enter too short or too long passwords
        When I enter "<pw>" in the "password-field"
        And I enter "<pw>" in the "password-repeat-field"
        And I click on the "register-button"
        Then I get the error "Password must be at least 6 characters and maximal 32 characters." in the "password-error-field"
        And  I get the message "Registration failed: Invalid input"

        Examples:
            | pw                       |
            | abc                        |
            | abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz |

  @all
    @register
    Scenario: I have to enter the same password in the validate password field
        When I enter "password123" in the "password-field"
        And  I enter "password456" in the "password-repeat-field"
        And I click on the "register-button"
        Then I get the error "The password doesn´t match the repeated password" in the "password-repeat-error-field"
        And  I get the message "Registration failed: Invalid input"

  @all
    @register
    Scenario Outline:
      When I enter "<name>" in the "username-field"
        And I enter "<email>" in the "email-field"
        And I enter "<password>" in the "password-field"
        And I enter "<password>" in the "password-repeat-field"
        When I click on the "register-button"
        Then I get the error "<error>" in the "<error-field>"

        Examples:
            | name | email | password | error | error-field |
            | testuser | new.mail@fc.de | pw123456 | Username already exists | username-error-field |
            | newname | test.user@fc.de | pw123456 | Email is already in use | email-error-field   |

@only
  @all
    @register
    Scenario:
      When I enter "newuser" in the "username-field"
        And I enter "new.mail@fc.de" in the "email-field"
        And I enter "pw123456" in the "password-field"
        And I enter "pw123456" in the "password-repeat-field"
        When I click on the "register-button"
        Then I get the message "Thank you, newuser, for your registration. We´ve sent a mail to new.mail@fc.de"
        And I get redirected to the "Login" page