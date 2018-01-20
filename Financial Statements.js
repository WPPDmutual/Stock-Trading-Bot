var ParseXbrl = require("parse-xbrl");
var request = require("request");

var json = "";
var XML = "";

request
    .get('https://www.valuespreadsheet.com/iedgar/results.php?stock=AAPL&output=json')
    .on('response', function(response) {
       response.on('data', function(chunk){
           json += chunk;
       });
       response.on('end',function(){
           json = JSON.parse(json);

           request
               .get(json.filings[2].instanceUrl)
               .on('response', function(response) {
                   response.on('data', function(chunk){
                       XML  += chunk;
                   });
                   response.on('end',function() {
                       ParseXbrl.parseStr(XML).then(function(parsedDoc) {
                        console.log(parsedDoc);
                       });
                   });
                   });
                 });
       });
