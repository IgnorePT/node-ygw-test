

var requestWS = (url, paramsForRequest) => {
    
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

}