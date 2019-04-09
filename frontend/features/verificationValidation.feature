
Feature: Test of the users input at the register-page
  As a guest
  I want to get informed if I enter wrong entries in the registration-fields
  so that I can correct them


  @all
  @verify
  Scenario: I can verify with a valid token
    Given eI am on the "Verification" page with the parameters "?id=1&token=abcdefghij"
    Then eI get redirected to the "Login" page
    And  eThe "username-field" contains "testuser"
    And  eI get the message "You are now able to login! Enjoy!"
    And eWait for one second

  @all
  @verify
  Scenario: I can not verify with an invalid token and get an error with the wrong email
    Given eI am on the "Verification" page with the parameters "?id=2&token=abcdefghij"
    Then eI get redirected to the "Request new token" page
    And  eI get the message "Your token has expired"
    When eI enter "invalidmail" in the "mail-field"
    And eI click on the "resend-button"
    Then eI get the error "Please enter the mail you used for our registration" in the "mail-error-field"
    And  eI get the message "Please enter the mail you used for our registration"
    And eWait for one second

  @only
  @all
  @verify
  Scenario: I can not verify with an invalid token but can request a new token with the correct email
      Given eI am on the "Verification" page with the parameters "?id=2&token=abcdefghij"
      Then eI get redirected to the "Request new token" page
      And  eI get the message "Your token has expired"
      When eI enter "expired.user@fc.de" in the "mail-field"
      And eI click on the "resend-button"
      Then  eI get the message "We resend your validation token :)"
      And eI get redirected to the "Home" page
    And eWait for one second
