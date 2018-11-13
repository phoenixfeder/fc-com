
Feature: Test of the correct feedback from the backend
    As a guest 
    I want to get informed if I enter wrong entries in the registration-fields
    so that I can correct them BEFORE I send them

    Background:
        Given I am on the "Registration" page
    
 
    Scenario Outline:
        Given I enter "<name>" in the "username-field"
        And I enter "<email>" in the "email-field"
        And I enter "<password>" in the "password-field"
        And I enter "<password>" in the "password-repeat-field"
        When I click on the "register-button"
        Then I get the error "<error>"

        Examples:
            | name | email | password | error |
            | taken | new.mail@fc.de | pw123456 | Username is taken |
            | newname | taken.mail@fc.de | pw123456 | Email is taken |

    Scenario:
        Given I enter "newuser" in the "username-field"
        And I enter "new.mail@fc.de" in the "email-field"
        And I enter "pw123456" in the "password-field"
        And I enter "pw123456" in the "password-repeat-field"
        When I click on the "register-button"
        Then I get the message "Thank you for your registration. Look in your mailaccount to finish the registration"