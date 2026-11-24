Feature: Favorites
    Scenario: Add a product to Favorites
        Given the user is logged in
        And the user is on the product detail page of the first product
        When the user adds the product to Favorites
        And the user opens the Favorites page
        Then the added product should be displayed on the Favorites page