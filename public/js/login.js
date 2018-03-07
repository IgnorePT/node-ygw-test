hello.init({
    facebook: '981319211968284',
    //windows: WINDOWS_CLIENT_ID,
    google: '836021478392-vcjed2kffbmd6oggmheen5snnktab8h0.apps.googleusercontent.com'
},{scope:'email'});

 function googleOauth(){

        var googleScopes = 'https://www.googleapis.com/auth/userinfo.email,https://www.googleapis.com/auth/userinfo.profile'

        hello('google').login({ 
            
                redirect_uri: redirectUri_google,
                network: "google",
                authorization: "https://accounts.google.com/o/oauth2/auth",
                display: "popup",
                scope: 
                {   basic: 'https://www.googleapis.com/auth/plus.me profile',
				    email: 'email',
				    birthday: '',
				    events: '',
                    quote: '',
				    photos: 'https://picasaweb.google.com/data/',
				    videos: 'http://gdata.youtube.com',
				    friends: 'https://www.google.com/m8/feeds, https://www.googleapis.com/auth/plus.login',
				    files: 'https://www.googleapis.com/auth/drive.readonly',
				    publish: '',
				    publish_files: 'https://www.googleapis.com/auth/drive',
				    share: '',
				    create_event: '',
				    offline_access: ''
                },
                force: true,
                expires: 1464148474.442 
                }).then(function() {
                        console.log('You are signed in to Google');

                        hello('google').api('me').then(function(json) {
                             swal({ 
                                title: 'Login efectuado com sucesso',
                                text: 'Bemvindo ' + json.name
                            });
                            provider = 1;
                            version = "2";
                            sendLoginData(json,provider,version);
                        }, function(e) {
                            swal('Whoops! ' + e.error.message);
                        });


        }, function(e) {
            console.log('Signin error: ' + e.error.message);
        });

    }

function facebookOauth(){

        hello('facebook').login({
            redirect_uri: redirectUri_facebook,
            scope: 'public_profile,email'

        }).then(function() {
                console.log('You are signed in to Facebook');
                hello('facebook').api('me').then(function(json) {
                swal({ 
                    title: 'Login efectuado com sucesso',
                    text: 'Bemvindo ' + json.name
            });
                console.log("Close Magnific magnificPopup");
                token = "";
                provider = 0;
                version = "2.8";

                sendLoginData(json,provider,version);

            }, function(e) {
                alert('Whoops! ' + e.error.message);
            });

            }, function(e) {
                console.log('Signin error: ' + e.error.message);
            });

    

    }

   
function createUser(data){

    console.log("Lets Create Local User Information");
    console.log(data);
    $.each(data.accountData, function(i, item){
        userID = data.accountData.userId;
        birthday = data.accountData.birthDate;
        name = data.accountData.name;
        gender = data.accountData.gender;
        quote = data.accountData.quote;
        email = data.accountData.email;
        phoneNumber = data.accountData.phoneNumber;
        pictureUrl = data.accountData.pictureUrl;
        dateChange = data.accountData.dateChange;
        slaves = data.accountData.slaves;
        master = data.accountData.provider;
        extraParameters['userId'] = userID;
    });

    console.log("Creating user doc");
    var userDoc = {
    "_id": 'user',
    "userid": userID,
    "name": name,
    "birthday": birthday,
    "email": email,
    "gender": gender,
    "phoneNumber": phoneNumber,
    "dateChange": dateChange,
    "quote": quote,
    "pictureUrl": pictureUrl,
    "master": master,
    "slaves": slaves
};

db.put(userDoc).then(function(userDoc){
    console.log("User doc created");
    console.log(userID);
    console.log(name);
    console.log(email);
    console.log(gender);
    console.log(userDoc);
});

    console.log(extraParameters);

}

function sendLoginData(data,provider,version){

    extraParameters["provider"] = provider;
    extraParameters["versionOauth"] = version;
    extraParameters["action"] = 0;
    extraParameters["providerResponse"] = JSON.stringify(data);
    //console.log("extraParameters");
    //console.log(extraParameters);

    var result = requestWebService(17,extraParameters)
        
        createUser(result);

    };

function logoutUser(){
    db.get('user').then(function(userDoc){
        return db.remove(userDoc);
    }).then(function (result){
        swal("Logout Efectuado com sucesso");
        window.location.href = baseUrl2;
    }).catch(function(err){
        console.log(err);
    })
}



    





