@smoke
Feature: Product details page

    Scenario: Add products to cart from the product details page
        Given the user is on the home page
        When the user adds 3 items of the first product to cart
        And the user opens the cart
        Then the cart should contain 3 items of this product