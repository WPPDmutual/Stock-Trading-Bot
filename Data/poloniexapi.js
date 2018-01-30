//This employs an API known as poloniex. Poloniex is a trading platform for cryptocurrencies, development docs can be found here: https://poloniex.com/support/api/

var fs = require('fs');
var https = require("https");

var final = [];

var upper ='2018.01.12';
var lower = '2017.01.12';
var ticker = "USDT_BTC";

var request = https.request({
    method: "GET",
    host: "poloniex.com",
    path: "/public?command=returnChartData&currencyPair=" + ticker + "&start=" + parseInt(new Date(lower).getTime() / 1000 - 86400) + "&end=" + parseInt(new Date(upper).getTime() / 1000) + "&period=86400",
}, function(response) {
    var json = "";
    response.on('data', function (chunk) {
        json += chunk;
    });
    response.on('end', function() {
      console.log(json);
        var price = JSON.parse(json);
        var label = [];
        for(i in price){
        label[i] = i;
        final[i] = price[i].open;
      }
        console.log(final);
    });
});

request.end();
