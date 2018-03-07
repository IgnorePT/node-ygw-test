/******************************************************************************************/
/***                                   Database                                         ***/
/******************************************************************************************/

var db = new PouchDB('websettings');
//var remotedb = new PouchDB('http://localhost:5984/websettings');

PouchDB.debug.enable('*');

/******************************************************************************************/
/***                                 Declare Variables                                  ***/
/******************************************************************************************/
var serviceProviderName = "YUGOUP",
    serviceProviderUrl = "https://www.yugoup.com";

// Global Company Files
var companyName,
    aboutText,
    aboutImage,
    companyLogo,
    emailContact,
    telephoneCompany,
    telephoneMobileCompany,
    companyURL,
    company_menu_ui = [],
    companyColors = [],
    companyTheme,
    smallDescription,
    latCompany,
    longCompany, 
    socialNetworks,
    local,
    date_settings_ws,
    timer,
    linkaddress,
    linkFinal,
    private,
    adCampaignConfigs = "",
    srcImages = "images/",
    srcImgResources = "images/",
    srcImgBookings = srcImages + "bookings/";

// Global Variable Files
var imagePathNames = [],
    imageUrl = [],
    imagesDir = [],
    imageType = [],
    videoPathNames = [],
    videoUrl = [],
    videoDir = [],
    videoType = [];

// Global Variable Ad's
var adFullscreenTimeSeconds,
    refreshTimer = 20000,
    fullbannerTimer = 7000,
    adFullscreenPercentage = 10,
    randomNumber = 100;

// Global Variable User
var name,
    birthday,
    email,
    phone,
    pictureUrl,
    gender,
    quote,
    master,
    slaves;


// Elements Variable User
var elem_u_name = "",
    elem_u_birthday = "",
    elem_u_email = "",
    elem_u_telphone = "",
    elem_u_gender = "",
    elem_u_picture = "",
    elem_u_quote = "",
    elem_u_master = "",
    elem_u_slaves = "";

// Elements Variable User
var userName = $("#userName"),
    userBirthday = $("#userBirthday"),
    userEmail = $("#userEmail"),
    userTelphone = $("#userTelphone"),
    userGender = $("#userGender"),
    userPictureSrc = $(".userImage"),
    userPictureHref = $("#userPicture"),
    userQuote = $("#userQuote"),
    userMaster = $("#userMaster"),
    userSlaves = $("#userSlaves");



/******************************************************************************************/
/***                                 Cache Selectors                                    ***/
/******************************************************************************************/


var head_title = $("head title"),
    meta_description = $("meta[name=description]"),
    meta_keywords = $("meta[name=keywords]"),
    elem_companyName = $("#companyName, .aboutCompanyName"),
    elem_companySubtitle = $("#companysubtitle, #aboutCompanySubtitle"),
    elem_aboutText = $("#aboutText, #aboutParagraph"),
    elem_logoSRC = $(".logo img"),
    elem_logo = $(".logo"),
    elem_cover = $(".cover"),
    elem_email = $("#emailContact"),
    elem_address =$("#addressCompany"),
    elem_contact = $('#contactCompany'),
    elem_darkalpha = $(".bg-dark-alfa-30"),
    elem_small_description = $("#smallDescription"),
    elem_main_menu = $('#main_menu'),
    elem_adress_map = $('#map-canvas'),
    elem_ServiceProviderUrl = $('#urlServiceProvider'),
    elem_ServiceProviderName = $('#nameServiceProvider'),
    elem_fullDesc = $('#fullDescription'),
    elem_menuLink = $(".menuLink");


/******************************************************************************************/
/***                                 Start Document                                     ***/
/******************************************************************************************/

$(document).ready(function () {
    idMethod = 1;
    initialRequest(idMethod);

    //idMethod = 1;
    //initialRequest(idMethod);

    elem_ServiceProviderUrl.attr("href",serviceProviderUrl);
    elem_ServiceProviderName.html(serviceProviderName);

    setTimeout(function(){ 

        $(".menuLink").on('click', function () {

            var privateReal = this.getAttribute ("data-private");
            var urlLink = this.getAttribute ("data-link");

            checkIfPrivate(privateReal, urlLink);

        });

 }, 1000);

});

window.onload = function(){

// Check if ad exists
setInterval(function(companyInfo){
   
    console.log("Get Campaign");
    getIdMethod = 12;

     refreshTimer = adCampaignConfigs['adBannerRefreshIntervalSeconds'] * 1000;
     fullbannerTimer = adCampaignConfigs['adFullscreenTimeSeconds'] * 1000;
     adFullscreenPercentage = adCampaignConfigs['adFullscreenPercentage'];

    randomNumber = Math.floor(Math.random() * 99) + 1;

    if (randomNumber < adFullscreenPercentage ) {
        extraParameters['type'] = 2;
    } else {
        extraParameters['type'] = 1;
    }
    requestWebService(getIdMethod, extraParameters);

},refreshTimer);

   
}

/******************************************************************************************/
/***                             General Request function                               ***/
/******************************************************************************************/

//Request Webservice Information

function requestWebService(getIdMethod, extraParameters,idBookingAssign){

            $.ajax({  
              url:   GetEndPointRequest (getIdMethod),
              data: GetParametersForRequest(getIdMethod, extraParameters),
              contentType: "application/octet-stream",
              dataType: "json",
              processData: false,
              xhrFields: {
                withCredentials: false
              },
              headers: {
                  accept: "application/json"
              },
              method: 'POST', 
              success: function (data) {

                    //Method 1: GetDates
                    if (getIdMethod == 1){

                        console.log("Get Dates Function start");
                        date_settings_ws = data.settingsDate.date_settings;
                        date_files_ws = data.settingsDate.date_files;
                        isSubscriptionActive_ws = data.isSubscriptionActive;

                        updateSettingsDate ();
                        

                    //Method 2: GetSettings   
                    } else if (getIdMethod == 2){

                        console.log("Get Settings Function start");
                        companyInfoWebService(data);

                    //Method 3: RegistAccess   
                     } else if (getIdMethod == 3){
                    
                     console.log("RegistAccess Method");

                     //Method 4: GetFiles   
                    } else if (getIdMethod == 4){

                        $.each(data.platformImages, function(i, value){

                            if(data.platformImages[i].type == 2){
                                srcTemp =  data.platformImages.url;
                                elem_cover.attr('data-background',srcTemp).css('background-image',"url("+ srcTemp +")");
                            }

                        });
                      
                        console.log("Copy Files Function Start");
                        copyFiles(data);

                    //Method 5: GetLists                         
                    } else if (getIdMethod == 5){
                        console.log("List: Get Lists");
                       
                            getListparent(data);
                        
                    //Method 6: GetBookingsOptions
                    } else if (getIdMethod == 6){
                        console.log("Booking: Options Start");
                      
                        getBookingsOptions(data);
                     
                    //Method 7: GetBookingsSettings 
                    } else if (getIdMethod == 7){
                        console.log("Booking: Setting Start");
                        
                        bookingSettings(data);
                    
                    //Method 8: GetBookingsAssigns 
                    } else if (getIdMethod == 8){
                        console.log("Booking: Get Booking Assigns");
                         

                        pageLoaderDiv.fadeOut();
                        pageLoader.fadeOut("slow");
                        
                        getBookingAssigns(data, statesAssigns);

                    //Method 9: GetBookingsAssignsUpdates 
                    } else if (getIdMethod == 9){
                        console.log("Booking: Get Booking Assigns Updates");
                        getBookingAssignUpdates(data,idBookingAssign);

                    //Method 10: AddBooking Assigns
                }  else if (getIdMethod == 10){
                       if(data.result == true){
                            swal("Sucesso!", textMessageAddSuccess);
                        } else {
                            swal("Falhou!", textMessageAddSuccess);
                        }
                    //Method 11: AddBooking Assigns
                }  else if (getIdMethod == 11){

                     pageLoaderDiv.fadeOut();
                     pageLoader.fadeOut("slow");

                        if(data.result == true){
                              document.getElementById('booking').reset();
                            swal("Sucesso!", textMessageAddSuccess);
                        } else {
                             swal("Falhou!", "Ocorreu um erro");
                        }
                  //Method 12: Get Campaign
                }  else if (getIdMethod == 12){
            
                     getAdCampaingn(data);

                     //Method 13: Get List Detail
                }  else if (getIdMethod == 14){
                   
                     getListDetail(data);

                    //Method 16: Resource Data
                }  else if (getIdMethod == 16){
                     console.log("Resource Data");
                    
                     getResourceData(data);

                    //Method 17: Login Data
                }  else if (getIdMethod == 17){
                     console.log("User Data Creation");
                     getIdMethod = "";
                     createUser(data);

                        //Method 18: Update Account Data
                }  else if (getIdMethod == 18){
                     console.log("Update User Account");
                     getIdMethod = "";
                     requestWebService(19,extraParameters);

                    //Method 19: Get Account Data
                } else if (getIdMethod == 19){
                     console.log("Update User  Account");
                     updateLocalUser(data);

                } else {

                        console.log("Return Data");
                        console.log(data);
                       /* if (data == null || data == "undefined"){
                            //Do Nothing
                        } else {

                            data
                            resultWebService(data);
                        }*/
                        
                    }
            }, 
            error: function (err) { 
                console.log(err); 
                } 
            });
}

function createSettingsDate (date_settings, date_files,isSubscriptionActive){

        var settingsDate = {
            "_id": "config",
            "date_settings": date_settings_ws,
            "date_files": date_files_ws,
            "isSubscriptionActive": "true",
        };
       
        db.put(settingsDate).then(function(response){
            console.log("PouchDB: We create the Settings document");
            getIdMethod = 2;
            requestWebService(getIdMethod);
        
        }).catch(function(err){

            console.log(err);

        });
}

function updateSettingsDate (date_settings, date_files,isSubscriptionActive){

        db.get('config').then(function(webSetting) {

                // if (webSetting.date_files !== date_files_ws){
                    console.log("Start copying files from WebServer");
                    getIdMethod = 4;
                    requestWebService(getIdMethod);
                // }

                if (webSetting.date_settings == date_settings_ws){
                    //Handle Positive local = false;
                    var local = true;
                    getCompanyInfoLocal ();
        
                } else {
                    //Create document to save the new date
                    return db.put({
                        _id: 'config',
                        _rev: webSetting._rev,
                        "date_settings": date_settings_ws,
                        "date_files": date_files_ws,
                        "isSubscriptionActive": "true"
                    }).then(function(response) {
                        
                        console.log("PouchDB: DateSettings document was updated");
                        var local = false;
                        getIdMethod = 2;
                        requestWebService(getIdMethod);
                
                    }).catch(function (err) {
                        console.log("There was an error trying to create the document for the Date"); 
                    });
                }

        }).then(function(response) {
                // handle response
                    console.log("UpdateSettings function it's working");
        }).catch(function (err) {
            createSettingsDate ();
            createCompanyInfoLocal();
        });
}


function createCompanyInfoLocal (){

    var companyInfo = {
        "_id": "companyInfo",
        "logo": "",
        "name": "",
        "email": "",
        "about": "",
        "smallDescription": "",
        "aboutImg": "",
        "address": "",
        "lat": "",
        "long": "",
        "telephone": "",
        "telephoneMobileCompany": "",
        "website": "",
        "color": [""],
        "menu_ui":[""],
        "social_networks":[""],
        "singleWebPage":""
    };

    db.put(companyInfo).then(function(response){
        //handle response;
        console.log("PouchDB: We create the Company document");
    }).catch(function(err){
        console.log(err);
    });

}

function updateCompanyInfoLocal (logo, name, email, about, aboutImg, smallDescriptionCompany,fullDescriptionCompany, address, latitude, longitude, telephone, telephoneMobile, website, color, social_networks, menu_ui, companySingleWebPage, adCampaignConfig){

      company_menu_ui = company_menu_ui.reverse();

      db.get('companyInfo').then(function(companyInfo) {

            return db.put({
                    "_id": "companyInfo",
                    _rev: companyInfo._rev,
                    "logo": companyLogo,
                    "name": companyName,
                    "email": emailContact,
                    "about": aboutText,
                    "aboutImg": aboutImage,
                    "smallDescriptionCompany": smallDescription,
                    "fullDescriptionCompany": fullDescription,
                    "address": addressCompany,
                    "latitude": latCompany,
                    "longitude" : longCompany,
                    "telephone": telephoneCompany,
                    "telephoneMobile": telephoneMobileCompany,
                    "website": companyURL,
                    "color": companyColors,
                    "social_networks": socialNetworks,
                    "menu_ui": company_menu_ui,
                    "singleWebPage": companySingleWebPage,
                    "adCampaignConfig": adCampaignConfigs

                
            }).then(function(response){
                    //handle response;
                    console.log("PouchDB: We update the Company document");

            }).catch(function(err){
                console.log(err);
            });

      });
}

 function companyInfoWebService(data){

                    console.log("Company info comming from webservice");
            
                    companyTheme = data.settings.settings.theme;
                    companyLogo = data.settings.settings.logo; 
                    companyName = data.settings.settings.name;
                    aboutText = data.settings.settings.about;
                    aboutImage = data.settings.settings.aboutImage;
                    smallDescription = data.settings.settings.smallDescription;
                    fullDescription = data.settings.settings.fullDescription;
                    emailContact = data.settings.settings.emailContact;
                    addressCompany = data.settings.settings.address;
                    latCompany = data.settings.settings.addressLatitude;
                    longCompany = data.settings.settings.addressLongitude;
                    telephoneCompany =  data.settings.settings.telephone;
                    telephoneMobileCompany =  data.settings.settings.telephoneMobile;
                    companyURL = data.settings.settings.webpage;
                    companyColors = data.settings.settings.colors;
                    company_menu_ui = data.settings.menuItems;
                    socialNetworks = data.settings.settings.clientSocial.clientSocialNetworks;
                    singleWebPage = data.settings.singleWebPage;
                    adCampaignConfigs = data.settings.clientConfigs.adCampaignConfigs;
                    webpage = data.settings.webpage;


                generateCompanyHtml(companyName,aboutText,companyColors,adCampaignConfigs,companyLogo,webpage,aboutImage,emailContact,addressCompany,telephoneCompany,telephoneMobileCompany,smallDescription,fullDescription,company_menu_ui,singleWebPage,socialNetworks);

//\ companyInfo.adCampaignConfig companyInfo.logo companyInfo.website companyInfo.aboutImg companyInfo.email companyInfo.address companyInfo.telephone companyInfo.telephoneMobile companyInfo.smallDescriptionCompany companyInfo.menu_ui companyInfo.SingleWebPage companyInfo.social_networks
//companyAdCampaignConfig,companyLogo,companyLinkWebsite,companyAboutImg,companyEmail,companyAddress,companySmallDescriptionCompany,companyMenuUi,companySocialNetworks


                   init_map();
                    
                    updateCompanyInfoLocal ();

}

function getCompanyInfoLocal (){

     db.get('companyInfo').then(function(companyInfo) {
         if (companyInfo.name == "" || companyInfo.name == null || companyInfo.name == "undefined" ){
                companyInfoWebService();
         } else {

         
             generateCompanyHtml(companyInfo.name,companyInfo.about,companyInfo.color,companyInfo.adCampaignConfig,companyInfo.logo,companyInfo.website,companyInfo.aboutImg,companyInfo.email,companyInfo.address,companyInfo.telephone,companyInfo.telephoneMobile,companyInfo.smallDescriptionCompany,companyInfo.fullDescriptionCompany,companyInfo.menu_ui,companyInfo.SingleWebPage,companyInfo.social_networks);

       }
            }).then(function(response) {
                    // handle response
                    console.log("Company info comming from Local Storage");
                    
                    /*db.sync(remotedb).on('complete', function () {
                        // yay, we're in sync!
                        console.log("Database in Sync");
                        }).on('error', function (err) {
                        // boo, we hit an error!
                        });*/

            }).catch(function (err) {
                    console.log(err);
            });

}

function generateCompanyHtml(companyName,companyAbout,companyColor,companyAdCampaignConfig,companyLogo,companyLinkWebsite,companyAboutImg,companyEmail,companyAddress,companyTelephone,companyTelephoneMobile,companySmallDescriptionCompany,companyfullDescription,companyMenuUi,companySingleWebPage,companySocialNetworks){

                head_title.text(companyName);
                meta_description.text(companyAbout);

                console.log("companyInfo.color[0]");
                console.log(companyColor[0]);
                colorPrimary = companyColor[0].split("FF");

                console.log("colorPrimary[1]");
                console.log(colorPrimary[1]);
                elem_companyName.append(companyName);
                elem_aboutText.html(companyAbout);

                adCampaignConfigs = companyAdCampaignConfig;

                 //var rgbaColor = hexToRgbA("#"+colorPrimary[1]);
                 //console.log(rgbaColor);

                 //$('.bg-dark-home').css({"background-color":""+rgbaColor+""});

                $('.map-section').css("background","#"+colorPrimary[1]+"")
                /*Logo Company*/
                elem_logoSRC.attr("src", srcImages + companyLogo);
                $('#logo-footer').attr("src", srcImages + companyLogo);
                elem_logo.attr("href", companyLinkWebsite);
                /*Main Cover */
                elem_cover.attr('data-background',srcImgResources + companyAboutImg).css('background-image',"url("+ srcImgResources +  companyAboutImg +")");
                /*Email*/
                elem_email.html(companyEmail).attr('href',companyEmail);
                /*Adress*/
                elem_address.html(companyAddress);
                elem_adress_map.attr('data-address',companyAddress);

                   init_map();

              
                elem_contact.html(companyTelephone + "<br>" + companyTelephoneMobile);
             
                elem_small_description.html(companySmallDescriptionCompany);

                 $.each(companyMenuUi.reverse(), function(i, item){
                     if (companySingleWebPage){
                        elem_main_menu.append("<li><a href='#"+ arrayPages[companyMenuUi[i].idMenu] +"'  class='menuLink menu-lh menu-h'>" + companyMenuUi[i].text + "</a></li>");
                     } else {
                         if(companyMenuUi[i].type == 1){

                             var linkaddress = arrayPages[companyMenuUi[i].idMenu]+'.html';
                             var private = companyMenuUi[i].private;

                             elem_main_menu.prepend("<li><a data-private='"+private+"' data-link='"+linkaddress+"' class='menu-lh menu-h menuLink'>" + companyMenuUi[i].text + "</a></li>");

                             

                         } else if (companyMenuUi[i].type == 2){

                             var linkaddress = "list.html?id="+ companyMenuUi[i].idMenu;
                             var private = companyMenuUi[i].private;

                             elem_main_menu.prepend("<li><a data-private='"+private+"' data-link='"+linkaddress+"'  class='menu-lh menu-h menuLink'>" + companyMenuUi[i].text + "</a></li>");
                        
                        } else if (companyMenuUi[i].type == 3){

                                var linkaddress = "booking.html?id="+ companyMenuUi[i].idMenu;
                                var private = companyMenuUi[i].private;

                                elem_main_menu.prepend("<li><a data-private='"+private+"' data-link='"+linkaddress+"'  class='menu-lh menu-h menuLink'>" + companyMenuUi[i].text + "</a></li>");
                            }
                        }
                     
                    });

                        $.each(companySocialNetworks, function(i, item){

                            socialLink = companySocialNetworks[i].link;
                            
                          if(companySocialNetworks[i].idSocialNetwork == 1){
                              elem_social_network += '<a href="'+ socialLink +'" title="Facebook" target="_blank"><i class="fa fa-facebook"></i></a>';


                          } else if (companySocialNetworks[i].idSocialNetwork == 2){ 
                
                             elem_social_network += '<a href="'+ socialLink +'" title="Twitter" target="_blank"><i class="fa fa-twitter"></i></a>';

                          } else if (companySocialNetworks[i].idSocialNetwork == 3){ 
                            
                              elem_social_network += '<a href="'+ socialLink +'" title="Instagram" target="_blank"><i class="fa fa-instagram"></i></a>';

                          } else if (companySocialNetworks[i].idSocialNetwork == 4){ 
        
                              elem_social_network += '<a href="'+ socialLink +'" title="Google" target="_blank"><i class="fa fa fa-google-plus"></i></a>';

                          } else if (companySocialNetworks[i].idSocialNetwork == 5){ 
                           
                              elem_social_network += '<a href="'+ socialLink +'" title="LinkedIn+" target="_blank"><i class="fa fa-linkedin"></i></a>';
                          }
                          
                      });

                      if (elem_fullDesc.length){
                            elem_fullDesc.html(companyfullDescription);
                        }

                       all_social_network.html(elem_social_network);

}


/* Function to Handle The messages Result */

function resultWebService(data){

       console.log("Request Webservice Result");
       console.log(data);

       if(data['status'] != null || data['status'] != "undefined"){
            console.log(data['status']);
       }
       
       swal("ERRO "+ data['status'] +":", data['statusMessage']);

}

/* Function to get path from files on the server */
 function copyFiles(data){

     var srcFiles = data;
     var imageItem = "";
     var count = 0;


        $.each(data.platformImages.$values, function(i, item) {

            imageUrl[i] = data.platformImages.$values[i].url;
            imagesDir[i] = data.platformImages.$values[i].folder;
            imagePathNames[i] = data.platformImages.$values[i].path;
            imageType[i] = data.platformImages.$values[i].type;

            if (imageType[i] == 4){
                count = count + 1;
                $(".gal-img-"+[count]+"").attr('src',imageUrl[i]);
                $(".gal-href-"+[count]+"").attr('href',imageUrl[i]);
               // imageItem += '<div><div class="post-prev-img mb-0"><a href="'+srcImgResources + imagePathNames[i]+'" class="lightbox-gallery-2 mfp-image"><img src="'+srcImgResources + imagePathNames[i]+'" alt="" /></a></div></div>';
               
            }

        });

        $.each(data.platformVideos.$values, function(i, item) {

            videoPathNames[i] = data.platformVideos.$values[i].path;
            videoUrl[i] = data.platformVideos.$values[i].url;
            videoDir[i] = data.platformVideos.$values[i].folder;
        });


        copyRequest(imageUrl, imagePathNames, imagesDir, imageType, videoPathNames, videoUrl, videoDir);

    
}

/* Function to save the data & meta from the files that we copy */


function createImageInfoLocal (imageUrl, imagePathNames, imagesDir, imageType){

    var imagesInfoLocal = {
        "_id": "imageData",
        "imageUrl": imageUrl,
        "imagesDir": imagePathNames,
        "imagePathNames": imagesDir,
        "imageType": imageType
    };

    db.put(imagesInfoLocal).then(function(response){
        //handle response;
        console.log("PouchDB: We create the image document");
    }).catch(function(err){
        console.log(err);
    });
}


/* ---------------------------------------------
    Function to copy files to local server 
--------------------------------------------- */

function copyRequest(imageUrl, imagePathNames, imagesDir, imageType, videoPathNames, videoUrl, videoDir){
            
            urlSend = "sync/imgSync.php";
            $.ajax({    
                url: urlSend,
                type: 'POST', 
                data: { imageUrl: imageUrl, imageNames: imagePathNames, imageDirectories: imagesDir, videoUrl: videoUrl, videoPathNames: videoPathNames, videoDir: videoDir},
                success: function(data) {
                    // Handle Success
                    console.log("Copy files concluded width success");
                },  error: function (){
                    // Handle Failure
                }
            });
}

/* ---------------------------------------------
 Funtion to Get user ID
--------------------------------------------- */

function getUserId(){

     db.get('user').then(function(user) {

         userid = user.userid;
        extraParameters['userId'] = userid
                  

        }).catch(function (err) {
            console.log("No User logged");
        });

        
}

/* ---------------------------------------------
 Funtion to Get user Data
--------------------------------------------- */


function getUserData(){

     db.get('user').then(function(user) {

         userid = user.userid;
         name = user.name;
         birthday = user.birthDate;
         email = user.email;
         gender = user.gender;
         phone = user.phoneNumber;
         quote = user.quote;
         pictureUrl = user.pictureUrl;
         master = user.master;
         slaves = user.slaves;

         if (birthday != null ){
            birthday1 = moment.utc(birthday);

            birthday = moment(birthday1).format("DD-MM-YYYY");
            birthdayValue = moment(birthday1).format("YYYY-MM-DD");
        } 
        
          if (quote == null ){
            quote = "";
         } 
           if (phone == null || phone == 0 ){
            phone = "";
         } 

    
        
        console.log("user Data ID");
        console.log(
    userid 
    + name 
    + birthday
    + email
    + gender
    + quote
    + pictureUrl
    + master
    + slaves);

        extraParameters['userId'] = userid
                  

        }).catch(function (err) {
            console.log("No User logged");
        });

        
}

/* ---------------------------------------------
 Check if Menu if Private
 --------------------------------------------- */

function checkIfPrivate(private, linkaddress){

     console.log("Entramos no checkIfPrivate");

     linkFinal = baseUrl2 + linkaddress;

     if( private == false || private == "false" ){
        console.log("O link não é privado");
         window.open(linkFinal,"_self");

     } else {

          db.get('user').then(function(user) {
        
                if (user.userid != null || user.userid != 'undefined' ){
                    //Handle Positive User
                    console.log("User logged in");
                    var userid = user.userid;
                    extraParameters['userId'] = userid;

                    window.open(linkFinal,"_self");
                   
                } 
                
        }).catch(function () {

            elem_body.append($(loginIframe).hide().fadeIn(500));
            //var myWindow =  window.open("http://staging.yugoup.com/yugoweb/login/login.html","framename","menubar=no, toolbar=no, location=no, directories=no, status=no, scrollbars=no, resizable=no, dependent,top=200,left=800,width=430,height=510");

        $('<a target="login">&nbsp;</a>')[0].click();

         

        });

     }
}

function updateLocalUser(data){
//Update do user local
console.log("Update do user local");
console.log(data.accountData);

db.get('user').then(function (doc) {
  doc.name = data.accountData.name;
  doc.birthDate = data.accountData.birthDate;
  doc.gender = data.accountData.gender;
  doc.phoneNumber = data.accountData.phoneNumber;
  doc.quote = data.accountData.quote;
  doc.dateChange = data.accountData.dateChange;
 
  return db.put(doc);
}).then(function () {
  getUserData();
  setTimeout(setProfileData,200);
  $.magnificPopup.close();
  //return db.get('user');
}).then(function (doc) {
  console.log(doc);
});


}

/* ---------------------------------------------
 Google map
 --------------------------------------------- */

var gmMapDiv = $("#map-canvas");

function init_map(){
    (function($){
        
        $(".map-section").click(function(){
            $(this).toggleClass("js-active");
            $(this).find(".mt-open").toggle();
            $(this).find(".mt-close").toggle();
        });
        
        
        if (gmMapDiv.length) {
        
            var gmCenterAddress = gmMapDiv.attr("data-address");
            var gmMarkerAddress = gmMapDiv.attr("data-address");
            
            
            gmMapDiv.gmap3({
                action: "init",
                marker: {
                    address: gmMarkerAddress,
                    options: {
                        icon: "images/map-marker.png"
                    }
                },
                map: {
                    options: {
                        zoom: 14,
                        zoomControl: true,
                        zoomControlOptions: {
                            style: google.maps.ZoomControlStyle.SMALL
                        },
                        zoomControlOptions: {
                            position: google.maps.ControlPosition.LEFT_TOP
                        },
                        mapTypeControl: false,
                        scaleControl: false,
                        scrollwheel: false,
                        streetViewControl: false,
                        draggable: true,
                        styles: [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}]
                    }
                }
            });
        }
    })(jQuery);
}


/* ---------------------------------------------
 Close Login Iframe
 --------------------------------------------- */

function closeIFrameLogin(loginSuccess){
     console.log(loginSuccess);
     $('#login').fadeOut("slow", function() { $(this).remove()});

     if (loginSuccess == true){
        window.location.href = linkFinal;
     }
}




