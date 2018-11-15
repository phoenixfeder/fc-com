
Feature: Test of the users input at the register-page
    As a guest 
    I want to get informed if I enter wrong entries in the registration-fields
    so that I can correct them

    Background:
         Given I am on the "Registration" page

    
    Scenario Outline: I am not allowed to enter too short or too long names
        When I enter "<name>" in the "username-field"
        Then I get the error "<error>" in the "username-error-field"
        And the "register-button" is not clickable

        Examples:
            | name                       | error                      |
            | ab                         | Username must be at least 3 characters and maximal 12 characters. |
            | abcdefghijklmnopqrstuvwxyz | Username must be at least 3 characters and maximal 12 characters.  |
    
    Scenario Outline: I have to enter the email adress in the correct format
        When I enter "<email>" in the "email-field"
        Then I get the error "No valid email-adress"
        And the "register-button" is not clickable

        Examples:
            | email       |
            | s           |
            | sss.@de     |
            | aaa.aaa@ de |
    
    Scenario Outline: I am not allowed to enter too short or too long passwords
        When I enter "<pw>" in the "password-field"
        Then I get the error "<error>"
        And the "register-button" is not clickable
    
        Examples:
            | pw                       | error                      |
            | abc                        | Your password is too short |
            | abcdefghijklmnopqrstuvwxyz | Your password is too long  |

    
    Scenario: I have to enter the same password in the validate password field
        When I enter "password123" in the "password-field"
        And I enter "password123" in the "password-repeat-field"
        Then I get no error
        When I enter "password456" in the "password-repeat-field"
        Then I get the error "The validation does'nt match your password"
        And the "register-button" is not clickable

    Scenario: If I enter everything right I can click on the register button
        When I enter "testaccount" in the "nicknamefield"
        And I enter "test.mail@fc.de" in the "email-field"
        And I enter "password123" in the "password-field"
        And I enter "password123" in the "password-repeat-field"
        Then the "register-button" is clickable