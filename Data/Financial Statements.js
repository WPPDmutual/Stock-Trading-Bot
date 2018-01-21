var ParseXbrl = require("parse-xbrl");
var request = require("request");

var json = "";
var XML = "";
var time = "";
//the following are the input variable specified by the user

var ticker = "AAPL"
var year = 2016; //refers to fiscal year not calendar year
var quarter = 3;


request
//valuespreadsheet's iedgar API is used here, it offers a clean and simple interface for the SEC's iedgar API
    .get('https://www.valuespreadsheet.com/iedgar/results.php?stock=' + ticker + '&output=json')
        .on('response', function(response) {
       response.on('data', function(chunk){
           json += chunk;
       });
       response.on('end',function(){
         //returns a list of all filings of the appropriate ticker in chronological order
           json = JSON.parse(json);

           request
           //Get the latest SEC filing. This is important because different companies operate on different fiscal years.
               .get(json.filings[0].instanceUrl)
               .on('response', function(response) {
                   response.on('data', function(chunk){
                       XML  += chunk;
                   });
                   response.on('end',function() {
                    //parse the XBRL data
                       ParseXbrl.parseStr(XML).then(function(parsedDoc) {
                         //find the quarter of the latest SEC filing
                        if(parsedDoc.DocumentFiscalPeriodFocus == "FY"){
                          time = 4;
                        }
                        else{
                          time = parsedDoc.DocumentFiscalPeriodFocus.substring(1,2);
                        }
                        var dyear = parsedDoc.DocumentFiscalYearFocus;
                        console.log(dyear+ " " + time);

                        //verify that there exists a filing for the specified date
                        if(year - dyear <= 0 && quarter < 5){
                          if(year - dyear == 0 && quarter - time > 0){
                            console.log("No Filings available for specified time");
                          } else{
                          console.log("fetching document");
                          var nofiling = 4*(dyear-year) - quarter + time;
                          console.log(nofiling);
                          var DXML = "";
                                     request
                                     //Get the requested SEC filing
                                     .get(json.filings[nofiling].instanceUrl)
                                     .on('response', function(response) {
                                         response.on('data', function(chunk){
                                             DXML  += chunk;
                                         });
                                         response.on('end',function() {
                                          //parse the XBRL data
                                             ParseXbrl.parseStr(DXML).then(function(parsedDoc) {
                                                   console.log(parsedDoc);
                                                 });
                                               });
                                             });
                        }
                      } else{
                        console.log("No Filings available for specified time");
                      }
                   });
                   });
                 });
        });
});