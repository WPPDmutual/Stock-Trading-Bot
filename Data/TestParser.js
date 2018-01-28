var fs = require("fs");
var pcapp = require('pcap-parser');
var hex = "";
var label = [];
var data = {};
var i = 0;

function hex2a(hexx) {
    var hex = hexx.toString();
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}


var parser = pcapp.parse('C:/Users/Brandt Winkler Prins/Desktop/pcapdata.pcap');

console.time();
parser.on('packet', function(packet) {
    hex = [...packet.data].map(_ => ('0' + _.toString(16)).slice(-2)).join();

    var bidPrice = parseInt(hex.substring(318, 342).split(",").reverse().join(""), 16);
    var type = hex.substring(252, 255).replace(/,/g,"");
    var flag = hex.substring(255, 258).replace(/,/g,"");

   if(packet.header.capturedLength == 126 && type == 51 && flag == 00 && i < 10000) {

     var ticker = hex2a(hex.substring(282, 306).replace(/,/g,""));
     var timestamp = parseInt(hex.substring(258, 282).split(",").reverse().join(""), 16);

     if(data[ticker.split(" ", 1)] == undefined){
        data[ticker.split(" ", 1)] = [];
        //onsole.log(data[ticker.split(" ", 1)]);
    }else{
      data[ticker.split(" ", 1)].push({timestamp, bidPrice});
    }

    i++
    if(i == 9999){
      var dir = './tradedata';

      if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
      }

        for (var key in data) {
          fs.writeFile("tradedata/" + key + ".json", JSON.stringify(data[key]));
        }
      }
    }

});
parser.on('end', function (session) {
  console.log('done');
});
