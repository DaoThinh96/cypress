@get-current-weather-data
Feature: Create automation test for API endpoint
  As a QA developer, when I make a RESTful request from the get_current_weather_data
  I expect to gain a successful response.

  @regression
  Scenario: Verify valid response of get_current_weather_data
    When I make get_current_weather_data "GET" request and expect response code is 200
    Then I validate schema "get_current_weather_data" of "getCurrentWeatherData" endpoint
    And I expect to see data get_current_weather_data

  @regression
  Scenario: Verify Unauthorized of get_current_weather_data without appid
    When I make get_current_weather_data GET request without appid and expect response code is 401

  @regression
  Scenario Outline: Verify Bad Request of get_current_weather_data with invalid params
    When I make get_current_weather_data GET request with "<invalid params>" and expect response code is 400 and error is "Bad Request"
    Examples:
      | invalid params                                          |
      | weather?appid=c206132f0c703dab28e5b1c6f6efd7c1&lat=35   |
      | weather?appid=c206132f0c703dab28e5b1c6f6efd7c1&&lon=139 |

@regression
  Scenario Outline: Verify Not Found of get_current_weather_data with invalid params
    When I make get_current_weather_data GET request with "<invalid params>" and expect response code is 404 and error is "Not Found"
    Examples:
      | invalid params                                          |
      | Weather?appid=c206132f0c703dab28e5b1c6f6efd7c1&lat=35   |
      | WEATHER?appid=c206132f0c703dab28e5b1c6f6efd7c1&&lon=139 |
