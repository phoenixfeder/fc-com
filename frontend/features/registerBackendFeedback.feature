
Feature: Test of the correct feedback from the backend
    As a guest 
    I want to get informed if I enter wrong entries in the registration-fields
    so that I can correct them BEFORE I send them

    Background:
        Given I am on the "Registration" page

    @only
    Scenario Outline:
        Given I enter "<name>" in the "username-field"
        And I enter "<email>" in the "email-field"
        And I enter "<password>" in the "password-field"
        And I enter "<password>" in the "password-repeat-field"
        When I click on the "register-button"
        Then I get the error "<error>" in the "<error-field>"

        Examples:
            | name | email | password | error | error-field |
            | taken | new.mail@fc.de | pw123456 | Username already exists | username-error-field |
            | newname | taken.mail@fc.de | pw123456 | Email already exists | email-error-field   |


    Scenario:
        Given I enter "newuser" in the "username-field"
        And I enter "new.mail@fc.de" in the "email-field"
        And I enter "pw123456" in the "password-field"
        And I enter "pw123456" in the "password-repeat-field"
        When I click on the "register-button"
        Then I get the message "Thank you, newuser, for your registration. We´ve sent a mail to new.mail@fc.de"