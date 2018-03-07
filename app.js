const express = require('express');
const yargs = require('yargs');
const axios = require('axios');
const hbs = require('hbs');

const core = require('./core/core');

const port = process.env.PORT || 3000;

var url = "http://s.webservices.yugoup.com/Service.svc/getSettings";

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
        data: core.paramsForRequest
    }).then((response) => {
    
        //res.send(JSON.stringify(response.data));
        res.render('index.hbs', {
            pageTitle: response.data.settings.settings.name,
            smallDescription: response.data.settings.settings.smallDescription,
            companyImage: response.data.settings.settings.aboutImage
        });
    
    }).catch((err) => {
        console.log("Error");
        console.log(err);
    });
  
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});