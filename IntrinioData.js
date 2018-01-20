var https = require("https");

var username = "1900acbb6cd718c7f397d32cf6aa6b65";
var password = "8396a4bb6dee40df2b83c93333a9d8ff";
var auth = "Basic " + new Buffer(username + ':' + password).toString('base64');

var upper = "2018-01-12";
var lower = "2017-01-12";
var criterium = "open_price";
var ticker = "INTC";

var request = https.request({
    method: "GET",
    host: "api.intrinio.com",
    path: "/historical_data?identifier=" + ticker + "&item=" + criterium + "&start_date=" + lower + "&end_date=" + upper,
    headers: {
        "Authorization": auth
    }
}, function(response) {
  console.log("/historical_data?identifier=" + ticker + "&item=" + criterium + "&start_date=" + lower + "&end_date=" + upper);
    var json = "";
    response.on('data', function (chunk) {
        json += chunk;
    });
    response.on('end', function() {
        console.log(json);
    });
});

request.end();
