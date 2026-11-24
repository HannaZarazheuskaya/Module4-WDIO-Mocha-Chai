@localization
Feature: Localization

    Scenario: Change localization on the Home page to German
        Given the user is on the home page
        When the user switches the language to "de"
        Then the user should remain on the same page
        And the labels should be translated:

        |home      |Start     |
        |categories|Kategorien|
        |contact   |Kontakt   |
        |signIn    |Einloggen |