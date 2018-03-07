const express = require('express');
const yargs = require('yargs');
const axios = require('axios');
const hbs = require('hbs');

const port = process.env.PORT || 3000;

var url = "http://s.webservices.yugoup.com/Service.svc/getSettings";

var paramsForRequest = {
    publicKey: "yugoup1",
    platformId: 2,
    lang: "pt-PT",
    userId: "00000000-0000-0000-0000-000000000000",
    IdDeviceOS: 2,
    uuid: "00000000000000000001"};

var reqParams = JSON.stringify(paramsForRequest);

var myBuffer = [];
var str = 'Stack Overflow';
var buffer = new Buffer(reqParams, 'utf8');
for (var i = 0; i < buffer.length; i++) {
    myBuffer.push(buffer[i]);
}

var app = express();

// hbs.registerPartial(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.get('/',(req, res) => {

    axios({
        url: url,
        method: 'post',
        headers: {
            "content-type": "application/octet-stream",
            "Accept": 'application/json'
        },
        data: paramsForRequest
    }).then((response) => {
    
        //res.send(JSON.stringify(response.data));
        //console.log(JSON.stringify(response.data,undefined,2));
        res.render('index.hbs', {
            pageTitle: 'Company Demo',
            welcomeMessage: 'Bemvindo ao website isto esta a ficar porreiro'
        });
    
    }).catch((err) => {
        console.log("Error");
        console.log(err);
    });
  
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});