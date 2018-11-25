
Feature: Test of the users input at the register-page
  As a guest
  I want to get informed if I enter wrong entries in the registration-fields
  so that I can correct them


  Scenario: I can verify with a valid token
    Given eI am on the "Verification" page with the parameters "?id=2&token=1ca8bc0f-7639-466b-8bf2-4f83b994f0f0"
    Then eI get redirected to the "Login" page
    And  eThe "username-field" contains "taken"
    And  eI get the message "You are now able to login! Enjoy!"


  Scenario Outline: I can not verify with an invalid token and need the correct email to request a new token
    Given eI am on the "Verification" page with the parameters "?id=100002&token=0848c5a2-e78a-4a61-9bb7-c7c7cadf0618"
    Then eI get redirected to the "Request new token" page
    And  eI get the message "Your token has expired"
    When eI enter "<mail>" in the "mail-field"
    And eI click on the "resend-button"
    Then eI get the error "<error>" in the "mail-error-field"
    And  eI get the message "<message>"

      Examples:
    |mail   |error   |message   |
    |invalidmail|error|Something went wrong - visit the FAQ page for more help.|
    |qwer@qwer.qwer|The E-Mail you used for registration.|We resend your validation token :)|