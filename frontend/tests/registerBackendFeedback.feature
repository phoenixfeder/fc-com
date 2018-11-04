
Feature: Test of the correct feedback from the backend
    As a guest 
    I want to get informed if I enter wrong entries in the registration-fields
    so that I can correct them

    Background:
        Given I am on the "Registration Page"

    Scenario Outline:
        Given I enter <name>, <email> and <Password> in the right fields
        When I click the "registerbutton"
        Then I get the error <error>

        Examples:
            | name | email | password | error |
            | taken | new.mail@fc.de | pw123456 | Username is taken |
            | newname | taken.mail@fc.de | pw123456 | Email is taken |

    Scenario:
        Given I enter "newuser", "new.mail@fc.de" and "pw123456" in the right fields
        When I click the "registerbutton"
        Then I get the message "Thank you for your registration. Look in your mailaccount to finish the registration"