@get-valuation-search
Feature: Create automation test for API endpoint /getValuation/search
  As a QA developer, when I make a RESTful request from the get_valuation_search_bff
  I expect to gain a successful response.

  Background: Sign in to MMR and getting cookie session
    Given I am on MMR page and getting cookie session
    When I make "searches" POST request to get mid,vin or listingId and expect response code is 200

  @regression
  Scenario Outline: Verify valid response of get_valuation_search_bff with valid params
    When I make get_valuation_search_bff "GET" request with "<params>" and expect response code is 200
    And I make "valuations_search" GET request with "<params>" and expect response code is 200
    Then I validate schema "get_valuation_search_bff" of "getValuationSearch" endpoint
    And I expect to see data between get_valuation_search_bff and valuation_search are matching
    Examples:
      | params                                                     |
      | country=US                                                 |
      | country=uS                                                 |
      | country=CA                                                 |
      | country=Ca                                                 |
      | country=CA&odometer=0                                      |
      | country=US&color=Black                                     |
      | country=US&color=Beige                                     |
      | country=US&grade=0                                         |
      | country=US&grade=1                                         |
      | country=US&grade=-1                                        |
      | country=US&grade=10                                        |
      | country=US&grade=50                                        |
      | country=US&region=NE                                       |
      | country=US&region=NA                                       |
      | country=CA&region=SW                                       |
      | country=US&region=SE                                       |
      | country=US&odometer=1000&region=SE                         |
      | country=US&odometer=101560&color=Black                     |
      | country=US&odometer=101560&color=Black&grade=30            |
      | country=US&odometer=101560&color=Black&grade=30&region=NE  |
      | country=US&odometer=101,560&color=Black&grade=30&region=NE |
      | country=US&odometer=101560&color=Black&grade=3.0&region=NE |
      | country=US&odometer=101560&color=Black&grade=3,0&region=NE |
      | country=US&odometer=101560&color=Lime&grade=30&region=NE   |
      | country=US&odometer=101560&color=Lime&grade=30&region=SW   |
      | country=US&odometer=101560&color=Lime&grade=30&region=USA  |

  @regression
  Scenario Outline: Verify Not Found of get_valuation_search_bff with invalid params
    When I make get_valuation_search_bff GET request with "<invalid params>" and expect response code is 404 and error is "Not Found"
    Examples:
      | invalid params                                                |
      | getValuation/search/                                          |
      | getValuation/search/year                                      |
      | getValuation/search/year/2022/make                            |
      | GetValuation/search/year/2022/make/TOYOTA                     |
      | GetValuation/search/year/2022/make/TOYOTA/model               |
      | GetValuation/search/year/2022/make/TOYOTA/model/COROLLA       |
      | GetValuation/search/year/2022/make/TOYOTA/model/COROLLA/style |
      | getValuation/search/1G1YC3D78G5106561*/*/*/*/*/               |

  Scenario Outline: Verify Bad Request of get_valuation_search_bff with invalid params
    When I make get_valuation_search_bff GET request with "<invalid params>" and expect response code is 400 and error is "Bad Request"
    Examples:
      | invalid params                                    |
      | getValuation/search/2                             |
      | getValuation/search/1G1YC3D78                     |
      | getValuation/search/1G1YC3D78G5106561745661321321 |

  @regression
  Scenario Outline: Verify Method Not Allowed response of get_valuation_search_bff
    When I make get_valuation_search_bff "POST" request with "<params>" and expect response code is 405
    Examples:
      | params     |
      | country=US |
      | country=CA |
