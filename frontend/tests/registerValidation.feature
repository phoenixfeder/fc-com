
Feature: Test of the users input at the register-page
    As a guest 
    I want to get informed if I enter wrong entries in the registration-fields
    so that I can correct them

    Background:
        Given I am on the "Registration Page"

    Scenario Outline: I am not allowed to enter too short or too long names
        When I enter <name> in the "nicknamefield"
        Then I get the error <error>
        And the "registerbutton" is not clickable

        Examples:
            | name                       | error                      |
            | abc                        | Your nickname is too short |
            | abcdefghijklmnopqrstuvwxyz | Your nickname is too long  |
    
    Scenario Outline: I have to enter the email adress in the correct format
        When I enter <email> in the "emailfield"
        Then I get the error "No valid email-adress"
        And the "registerbutton" is not clickable

        Examples:
            | email       |
            | s           |
            | sss.@de     |
            | aaa.aaa@ de |
    
    Scenario Outline: I am not allowed to enter too short or too long passwords
        When I enter <pw> in the "pwfield"
        Then I get the error <error>
        And the "registerbutton" is not clickable
    
        Examples:
            | name                       | error                      |
            | abc                        | Your password is too short |
            | abcdefghijklmnopqrstuvwxyz | Your password is too long  |

    Scenario: I have to enter the same password in the validate password field
        When I enter "password123" in the "pwfield"
        And I enter "password123" in the "pwvalidatefield"
        Then I get no error
        When I enter "password456" in the "pwvalidatefield"
        Then I get the error "The validation does'nt match your password"
        And the "registerbutton" is not clickable

    Scenario: If I enter everything right I can click on the register button
        When I enter "testaccount" in the "nicknamefield"
        And I enter "test.mail@fc.de" in the "emailfield"
        And I enter "password123" in the "pwfield"
        And I enter "password123" in the "pwvalidatefield"
        Then the "registerbutton" is clickable