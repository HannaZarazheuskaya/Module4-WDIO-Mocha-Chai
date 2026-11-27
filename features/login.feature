@smoke
Feature: Log in
    User wants to login to the system

    Scenario: Log in with valid credentials
        Given the user is on the login page
        When the user logs in with valid credentials
        Then the user should be redirected to "My Account" page
        And the username should be displayed in the profile