

/* Config URL */
    var baseUrl= "http://demo.staging.radiongo.com/",
    baseUrl2= "https://staging.yugoup.com/yugoweb/1/"
    publicKey="yugoup00002",
    backFiles="backoffice/files/clients/",
    arrayResources = ["","bookings/", "resources/","ads/"];
    

//List
var uriList = "http://demo.staging.radiongo.com/list.html";
var uriListDetalhe = "http://demo.staging.radiongo.com/detail.html";

/* Login */
var redirectUri_facebook = "https://staging.yugoapp.com/yugoweb/login/login.html",
    redirectUri_google = "https://staging.yugoapp.com/yugoweb/login/login.html",
    redirectUri_linkedin = "https://staging.yugoup.com/yugoweb/1/login.html",
    redirectUri_microsoft = "https://staging.yugoup.com/yugoweb/1/login.html";



var arrayParameters = {},
    parametersExtra = {},
    urlParameters = {},
    extraParameters = {},
    urlRequest = "",
    bytesArray = [],
    objInit = "",
    data = [],
    userExist = "",
    arrayMethod = ["error","getDates", "getSettings","registAccess","web/getAllFiles","features/resources/getList","features/booking/getBookingOptions","features/booking/getBookingSettings","features/bookingAssign/getBookingAssigns","features/bookingAssign/getBookingAssignUpdates","features/bookingAssign/deleteBookingAssign","features/bookingAssign/addBookingAssign","features/advertisement/getAdvertisingCampaign","features/multi/getMultiFeature","features/multi/getMultiFeature","/reports/registAction","/features/resources/get","/identities/loginIdentity","/identities/updateAccountData","identities/getAccountData"],
    arrayPages = ["404","index","profile","community","notifications","news","podcasts","votingSystem","about","about","about","about"],
    arrayTypeOption = ["TextBox","Date","PickerNumber","Dropdown","TextArea","CheckBox","MediaPicker"],
    arrayGender = ["Não definido","Masculino","Feminino","Outro"];
    


function buildUrlBase (idMethod) {

    urlParameters["http"] = "http:/";
    urlParameters["instance"] = "demo.staging.radiongo.com";
    urlParameters["webservice"] = "webservices";
    urlParameters["version"] = "v1.0";
    urlParameters["service"] = "Service.svc";
    urlParameters["method"] = arrayMethod[idMethod];

}


function buildInputBase () {

    arrayParameters["publicKey"] = publicKey;
    arrayParameters["platformId"] = 2;
    arrayParameters["lang"] = "pt-PT";

    return arrayParameters;
}

function urlResolver (type,extra) {

   dynamicUrl =  baseUrl + backFiles + publicKey +"/"+ arrayResources[type] + extra;

    return dynamicUrl;
}

  function simpleUTF8(strToConvert) {

      var utf8 = unescape(encodeURIComponent(strToConvert));

      return utf8;
  }


function GetParametersForRequest (idMethod, extraParameters) {

    extraParameters_size = (_.size(extraParameters));
    
    buildInputBase (idMethod);
    
    if (extraParameters_size > 0){
        $.extend(arrayParameters, extraParameters);
    }
        strToConvert = arrayParameters;
        //console.log(strToConvert);
        strToConvert = JSON.stringify(strToConvert);
        var bytesArray = simpleUTF8(strToConvert);
        return  bytesArray;
}



function GetEndPointRequest (idMethod, extraParameters) {

    buildUrlBase(idMethod);

    objInit = data["http"];

    urlRequest = "";

     $.each(urlParameters, function (i, value){

           if(urlParameters[i] == urlParameters["http"] ){
         
               urlRequest += urlParameters[i];
               
           } else {
           
               urlRequest += "/" + urlParameters[i];
           }

        });

        urlParameters = {};
        
        return urlRequest;
}

function urlPrivateAlert(){

    $('body').html("");
    

    swal({
        title: "Acesso Negado!",
        text: "Não tem permissão para entrar nesta pagina, efetue login e volte a tentar!",
        type: "error",
        allowEscapeKey:false,
        onClose: function(){
            window.location.href = baseUrl2;
        }
    }, function() {
        window.location.href = baseUrl2;
    });
    $(".sweet-overlay").css('background-color', '#FFF');
}

function checkURLprivate(idMethod){

    var urlPrivate;
       
     db.get('companyInfo').then(function(company){

         var menu = company.menu_ui;

        $.each(menu, function(i, item){

                var menuTypePage = menu[i].type;
                var menuIdPage = menu[i].idMenu;
                var menuPrivatePage = menu[i].private;

            console.log("**************************Company Menu **************************");
            

            switch(typePage) {
                case 1:
                    if(typePage == menuTypePage && menuIdPage == idPageSetting && menuPrivatePage == true){
                     console.log("Mesmo ID e Type Pagina ");
                     urlPrivateAlert();
                        
                    } else {
                        urlPrivate = false;
                        break;
                        
                    } 
                    
                case 2:
                    var idList = getUrlParameter1('id');
                     if(typePage == menuTypePage && menuIdPage == idList && menuPrivatePage == true){
                         console.log("URL List");
                         urlPrivateAlert();
                            urlPrivate = true;
                        } else {
                        console.log("URL List");
                        urlPrivate = false;
                        break;
                    }  
                        

                case 3:
                    var idBooking = getUrlParameter1('id');
                    if(typePage == menuTypePage && menuIdPage == idBooking && menuPrivatePage == true){
                            console.log("URL List");
                            urlPrivateAlert();
                            urlPrivate = true;
                        } else {
                        console.log("URL List");
                        urlPrivate = false;
                        break;
                    }  

                default:
                console.log("Estamos no Default");
                    $(".acesso-negado-overlay" ).remove();
                    urlPrivate = false;
                    break;  
                }
        });

     console.log(urlPrivate);
     console.log(idMethod);
     if(urlPrivate != true){
         requestWebService(idMethod,extraParameters);
     }

     }).catch(function(err){

        console.log("No Company info");
        idMethod = 1;
        requestWebService(idMethod,extraParameters);
     });

    

}

function initialRequest(idMethod){

        db.get('user').then(function(user) {
        userid = user.userid;
        extraParameters['userId'] = userid
        userExist = true;
        console.log("userExist");
        console.log(userExist);
        requestWebService(idMethod,extraParameters);
        
        }).catch(function (err) {
            console.log("No User logged");
            userExist = false;
            checkURLprivate(idMethod);
        });

}


moment.locale('pt', {
    months : "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_octubro_novembro_dezembro".split("_"),
    monthsShort : "jan._fev._mar._abr._maio_jun._jul._ago._set._out._nov._dez.".split("_"),
    weekdays : "Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split("_"),
    weekdaysShort : "dom._seg._ter._qua._qui._sex._sab.".split("_"),
    weekdaysMin : "Do_Se_Te_Qua_Qui_Se_Sa".split("_"),
    longDateFormat : {
        LT : "HH:mm",
        LTS : "HH:mm:ss",
        L : "DD/MM/YYYY",
        LL : "D MMMM YYYY",
        LLL : "D MMMM YYYY LT",
        LLLL : "dddd D MMMM YYYY LT",
    },
    calendar : {
        sameDay: "[hoje] LT",
        nextDay: '[amanha] LT',
        nextWeek: 'dddd [na] LT',
        lastDay: '[ontem no] LT',
        lastWeek: 'dddd [a última] LT',
        sameElse: 'L'
    },
    relativeTime : {
        future : "em %s",
        past : "há %s",
        s : "alguns segundos",
        m : "um minuto",
        mm : "%d minutos",
        h : "uma hora",
        hh : "%d horas",
        d : "um dia",
        dd : "%d dias",
        M : "um mês",
        MM : "%d meses",
        y : "um ano",
        yy : "%d anos"
    },
    ordinalParse : /\d{1,2}(er|ème)/,
    ordinal : function (number) {
        return number + (number === 1 ? 'er' : 'ème');
    },
    meridiemParse: /PD|MD/,
    isPM: function (input) {
        return input.charAt(0) === 'PM';
    },
    // in case the meridiem units are not separated around 12, then implement
    // this function (look at locale/id.js for an example)
    // meridiemHour : function (hour, meridiem) {
    //     return /* 0-23 hour, given meridiem token and hour 1-12 */
    // },
    meridiem : function (hours, minutes, isLower) {
        return hours < 12 ? 'PD' : 'MD';
    },
    week : {
        dow : 1, // Monday is the first day of the week.
        doy : 4  // The week that contains Jan 4th is the first week of the year.
    }
});

moment.locale('pt');



/*function hexToRgbA(hex){

    console.log(hex);
    if (hex == null || hex == "undefined"){
        hex = "#000";
    }
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',1)';
    }
    throw new Error('Bad Hex');
}*/

  function openWin() { 

       var myWindow = window.open("http://staging.yugoup.com/yugoweb/login/login.html","_blank","menubar=no, toolbar=no, location=no, directories=no, status=no, scrollbars=no, resizable=no, dependent,top=200,left=800,width=430,height=510"); 
        //myWindow.document.write("<p>This is 'myWindow'</p>");
        //myWindow.focus(); 
    };

function returnColorPrimary () {

    colorPrimaryCardinal = "#" + colorPrimary[1];

    return  colorPrimaryCardinal

}

    function setDateTimePicker(id,datepicker_setting,timepicker_settign,format){

        console.log("Define DateTimePicker");

       var script = document.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = "setTimeout(function(){jQuery('#datetimepicker"+id+"').datetimepicker({ startDate:'+1971/05/01', format:'"+ format +"',datepicker:"+datepicker_setting+", timepicker: "+timepicker_settign+",theme:'dark',step:15 })}, 800);";
        document.body.appendChild(script);

             
       
    }

    var getUrlParameter1 = function getUrlParameter1(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};




