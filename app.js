const express = require('express');
const yargs = require('yargs');
const axios = require('axios');
const hbs = require('hbs');

const core = require('./core/core');

const port = process.env.PORT || 3000;

var url = "http://s.webservices.yugoup.com/Service.svc/getSettings";

var app = express();

// hbs.registerPartial(__dirname + '/views/partials');

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

app.get('/',(req, res) => {

    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    axios({
        url: url,
        method: 'post',
        headers: {
            "content-type": "application/octet-stream",
            "Accept": 'application/json'
        },
        data: core.paramsForRequest
    }).then((response) => {
    
        res.render('index.hbs', {
            pageTitle: response.data.settings.settings.name,
            smallDescription: response.data.settings.settings.smallDescription,
            fullDescription: response.data.settings.settings.fullDescription,            
            companyImage: response.data.settings.settings.aboutImage,
            pageUrl: fullUrl
        });
    
    }).catch((err) => {
        console.log("Error");
        console.log(err);
    });
  
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});