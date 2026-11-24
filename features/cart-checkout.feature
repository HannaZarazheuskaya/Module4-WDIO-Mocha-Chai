Feature: Cart and Checkout

    Scenario: Remove a product from the shopping cart
        Given the user is on the home page
        And the user adds 2 items of the first product to cart
        And the user opens the cart
        When the user removes the product from cart
        Then the cart should contain no products
        And the message "The cart is empty. Nothing to display." should be displayed


    Scenario: Checkout with Cash on Delivery payment 
        Given the user is logged in
        And the user is on the home page
        And the user adds 3 items of the first product to cart
        And the user opens the cart
        And the user proceeds to checkout with valid billing address
        When the user selects "Cash on Delivery" payment option
        And the user confirms payment
        Then the order confirmation with the invoice number should be displayed