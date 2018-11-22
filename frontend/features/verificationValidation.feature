
Feature: Test of the users input at the register-page
  As a guest
  I want to get informed if I enter wrong entries in the registration-fields
  so that I can correct them

  Background:
    Given I am on the "Home" page

  Scenario: I can verify with a valid token
    When I go to the "verify" page with the parameters "abc"
    Then I get redirected to the "Login" page
    And  The "username-field" contains "taken"
    And  I get the message "You are now able to login! Enjoy!"

  Scenario: I can not verify with an invalid token and can request a new token
    When I go to the "verify" page with the parameters "abc"
    Then I get redirected to the "Request new token" page
    And  I get the message "You are now able to login! Enjoy!"
    When I enter "mail" in the "mail-field"
    And  I get the message "A new token has been sent to mail"
