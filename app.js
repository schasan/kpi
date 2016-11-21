// It is a requirement to announce the proxy to npm in advance
// Set the startup environment variables accordingly in OpenShift
//npm config set proxy http://proxy.company.com:8080
//npm config set https-proxy http://proxy.company.com:8080

var host = process.env.OPENSHIFT_NODEJS_IP || "localhost";
var port = process.env.OPENSHIFT_NODEJS_PORT || 80;
var app_uuid  = os.environ['OPENSHIFT_APP_UUID'] || "undefined";
var gear_uuid = os.environ['OPENSHIFT_GEAR_UUID'] || "undefined"; 

console.log("Listen host environment set to " + host);
console.log("Listen port environment set to " + port);
console.log("Application UUID " + app_uuid);
console.log("Gear UUID " + gear_uuid);

host = "0.0.0.0";
port = 8080;

console.log("Listen host set to " + host);
console.log("Listen port set to " + port);

var express = require('express');
//var fs = require('fs');
var http = require('http');
//var https = require('https');
//var privateKey = fs.readFileSync('apache.key', 'utf8');
//var certificate = fs.readFileSync('apache.crt', 'utf8');
//var credentials = {key: privateKey, cert: certificate};
var app = express();

var httpServer = http.createServer(app);
//var httpsServer = https.createServer(credentials, app);

var data = {
        "count" : 3,
        "timestamp" : "00.00.0000 00:00 CET",
        "gear_uuid" : "unknown",
        "app_uuid" : "unknown",
        "pages" : [
                {
                        "title" : "IT Production",
                        "indicator" : "yellow",
                        "count" : 4,
                        "dataPoints" : [
                                { "y": 59, "label": "59%", "indexLabel": "Sytems unavailability" },
                                { "y": 70, "label": "70%", "indexLabel": "Software" },
                                { "y": 99, "label": "99%", "indexLabel": "Missed deadlines" },
                                { "y": 59, "label": "59%", "indexLabel": "IT Duty Manager escalations" }
                        ]
                },
                {
                        "title" : "Information Security",
                        "indicator" : "green",
                        "count" : 4,
                        "dataPoints" : [
                                { "y": 70, "label": "70%", "indexLabel": "Critical or severe incidents" },
                                { "y": 90, "label": "90%", "indexLabel": "Vulnerability exposure" },
                                { "y": 80, "label": "80%", "indexLabel": "Critical audit findings" },
                                { "y": 88, "label": "88%", "indexLabel": "Application Security Compliance" }
                        ]
                },
                {
                        "title" : "IT ADM Delivery",
                        "indicator" : "green",
                        "count" : 4,
                        "dataPoints" : [
                                { "y": 67, "label": "67%", "indexLabel": "Overall Project Portfolio Status" },
                                { "y": 95, "label": "95%", "indexLabel": "Reduce time2market" },
                                { "y": 86, "label": "86%", "indexLabel": "Productivity ADM" },
                                { "y": 87, "label": "87%", "indexLabel": "KTLO Coverage" }
                        ]
                }
        ]
};

app.get('/data/1.json', function(req, res) {
        //res.type('text/plain');
        //res.send('i am a beautifull butterfly');
        var now = new Date();
        var dd = now.getDate();
        var mo = now.getMonth()+1;
        var yyyy = now.getFullYear();
        var hh = now.getHours();
        var mi = now.getMinutes();
        mi = mi - mi%12;
        data.timestamp = dd+'.'+mo+'.'+yyyy+' '+hh+':'+mi+' UTC';
        data.app_uuid = app_uuid;
        data.gear_uuid = gear_uuid;
        res.json(data);
});

//app.listen(process.env.PORT || 4730);
httpServer.listen(port);
//httpsServer.listen(8443);
