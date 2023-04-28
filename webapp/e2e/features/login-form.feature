Feature: Login with a user

Scenario: The user is registered in the site
  Given A registered user
  When I fill the data in the form and press submit
  Then You go to pods page

Scenario: The user is not registered in the site
  Given An unregistered user
  When I fill the data in the form and press submit
  Then An error message appear