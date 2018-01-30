# Stock-Trading-Bot

This is the home of a project which is meant to potential grow into a securities trading algorithm
As it stands, it now consists of a few disjointed scripts which have some vague ties to the securities market.
 
 
 ## Data
 
 The folder titled data contains all scripts related to fetching data. Of the four files present in this folder one has a certain incongruity: the poloniex API javascript document. Though as of now there is a great focus on securities trading, there is planned expansion into the world of cryptocurrencies. I am, personally, rather hesitant to do so because I find that cryptocurrencies are nothing more than a bubble - driven by nothing but "hype". For this reason I would stave off investing in this world until a substantial amount of data from social media has been garnered. This would allow one to quantify "hype" and delve into the cryptocurrency trading world with - if not a modicum of certainty - at least an answer to "why" one traded as one did. 
 
 ### SEC Filings Data ("Financial Statements".js)
 
 All of these scripts are rather straightforward to use. Here one has to put in three criteria at the appropriate variables:
 
 ```
var ticker = "AAPL"
var year = 2016; //refers to fiscal year not calendar year
var quarter = 3;
```
 
 Just plug in the ticker, the year of the filing, and the quarter (1-4).
 
 The API used here is the [iEDGAR](https://www.valuespreadsheet.com/iedgar/) API, a framework for using the [SEC's EDGAR API](https://www.sec.gov/edgar/searchedgar/accessing-edgar-data.htm). This approach has been employed due to its ease of use, but the site's recent down time may push us to consider directly inegrating with the EDGAR API. 
 
 There is a version of this on my computer that accepts an array of tickers and gathers a range of SEC Filings. I may take it out of retirment if it is proven to be worth the effort of polishing it. 
 
 ### Intrinio API
 
This script retrieves data from an API known as intrinio, daily data for up to 30 years.
 
The same simple rationale of the SEC Filings script applies here: insert the appropriate data in the respective variables and run the script. 
 
 ```
var upper = "2018-01-12";
var lower = "2017-01-12";
var criterium = "open_price";
var ticker = "INTC";
 ```
The four criteria here are the upper and lower bounds on the date: yyyy-mm-dd, the ticker, as well as the desired criterium. A list of all 365 criteria can be found [here](http://docs.intrinio.com/tags/intrinio-public#historical-data). A comprehensive view at the intrinio API can be found [here](http://docs.intrinio.com)
 
 ### Poloniex API

The Poloniex API is an API for trading cryptocurrencies, it also supports data. In this set up it retrieves the daily openings prices of a desired cryptocurrency.

 Insert the appropriate data in the respective variables and run the script. 
 
 ```
 var upper ='2018.01.12';
var lower = '2017.01.12';
var ticker = "USDT_BTC";
 ```
 
 Once again with have the upper and lower boundaries on dates from which we intend to retrieve data.
 
 ### Intraday PCAP Parser

The pcap parser is not in its desired state, it should be said however that it is functional. A brief description is warranted. An exchange known as the [IEX Exchange](https://iextrading.com) maintains packet capture files of its servers for the past year. They can be found [here](https://iextrading.com/trading/market-data/#hist). To use the data, one must first download it, open it in an application known as [Wire Shark](https://wireshark.org). Save it as a .pcap file. Note that while the original file bears the .pcap file extension it is in fact a treacherous pcap-ng file. For compatibility with the parser JS module it must be a traditional pcap file. When Saving it as such ignore all errors thrown by wireshark, it will nevertheless create a functional packet capture file. 

Take the file path and put it here:

``var parser = pcapp.parse('file path here');
``

Then just run the script and it should generate a folder with the appropriate data.

### Graphing Utility

## Neural Net - Coming in 1 - 2 weeks
