/*********************************************************************************/
/*                               Full Website Resources                        */
/*********************************************************************************/


var elem_booking_mode = "",
    elem_body = $("body");
    elem_social_network = "",
    socialAccountsAppend = $('#socialAccounts'),
    pageLoaderDiv = $(".page-loader div"),
    pageLoader = $(".page-loader");
    
var socialLink,
    socialLinkFacebook;


// Social ;
var  html_twitter = '<a href="'+ socialLink +'" title="Twitter" target="_blank"><i class="fa fa-twitter"></i></a>';
var  html_behance = '<a href="'+ socialLink +'" title="Behance" target="_blank"><i class="fa fa-behance"></i></a>';
var  html_linkedin = '<a href="'+ socialLink +'" title="LinkedIn+" target="_blank"><i class="fa fa-linkedin"></i></a>';
var  html_pinterest = '<a href="'+ socialLink +'" title="Pinterest" target="_blank"><i class="fa fa-pinterest"></i></a>';
var  html_googleplus = '<a href="'+ socialLink +'" title="Google" target="_blank"><i class="fa fa fa-google-plus"></i></a>';
var  html_youtube = '<a href="'+ socialLink +'" title="Youtube" target="_blank"><i class="fa fa-youtube-play"></i></a>';
var  html_vimeo = '<a href="'+ socialLink +'" title="Vimeo" target="_blank"><i class="fa fa-vimeo"></i></a>';
var  html_instagram = '<a href="'+ socialLink +'" title="Instagram" target="_blank"><i class="fa fa-instagram"></i></a>';

var facebookAccountHtmlMaster = '<div class="alt-service-wrap"> <div class="alt-service-item"> <div class="alt-service-icon"> <i class="fa fa-facebook" aria-hidden="true"></i> </div> <h3 class="alt-services-title font-alt">Facebook</h3> Conta principal </div> </div>;',
    googleAccountHtmlMaster = '<div class="alt-service-wrap"> <div class="alt-service-item"> <div class="alt-service-icon"> <i class="fa fa-google" aria-hidden="true"></i> </div> <h3 class="alt-services-title font-alt">Google</h3> Conta principal </div> </div>',
    microsoftAccountHtmlMaster = '<div class="alt-service-wrap"> <div class="alt-service-item"> <div class="alt-service-icon"> <i class="fa fa-windows" aria-hidden="true"></i> </div> <h3 class="alt-services-title font-alt">Microsoft</h3> Conta principal </div> </div>',
    linkedinAccountHtmlMaster = '<div class="alt-service-wrap"> <div class="alt-service-item"> <div class="alt-service-icon"> <i class="fa fa-linkedin" aria-hidden="true"></i> </div> <h3 class="alt-services-title font-alt">Linkedin</h3> Conta principal </div> </div>';

// Modal for the login;
var loginModal = $('<div class="white-popup row"><div class="col-md-10 col-md-offset-1">'
    +'<h3 class="section-title font-alt mb-10 mb-sm-40">Login</h3>'
    +'<h5 class="mb-20 mb-sm-40">Login before you can enter this area.</h5>'
    +'<form class="form contact-form" id="contact_form"><div class="clearfix">'
    +'<div class="form-group">'
    +'<input type="text" name="username" id="username" class="input-md round form-control" placeholder="Username" pattern=".{3,100}" required>'
    +'</div>'
    +'<div class="form-group">'
    +'<input type="password" name="password" id="password" class="input-md round form-control" placeholder="Password" pattern=".{5,100}" required>'
    +'</div></div>'
    +'<div class="clearfix">'
    +'<div class="cf-left-col">'
    +'<div class="form-tip pt-20">'
    +'<a href="">Forgot Password?</a>'
    +'</div></div>'
    +'<div class="cf-right-col"><div class="align-right pt-10"><button class="submit_btn btn btn-mod btn-medium btn-round" id="login-btn">Login</button></div></div></div><div class="clearfix"><div class="pt-10"><a onclick="facebookOauth()" class="btn btn-mod btn-medium btn-round btn-full fb_background" id="reg-btn">Facebook</a></div><div class="pt-10"><a onclick="googleOauth()" class="btn btn-mod btn-medium btn-round btn-full g_background" id="reg-btn">Google</a></div><div class="pt-10"><a class="btn btn-mod btn-medium btn-round btn-full in_background" id="reg-btn">Linkedin</a></div><div class="pt-10"><a class="btn btn-mod btn-medium btn-round btn-full ms_background" id="reg-btn">Microsoft</a></div></div></form></div></div>');


var loadingCubeanimation = '<div class="sk-folding-cube">'
+'<div class="sk-cube1 sk-cube"></div>'
+'<div class="sk-cube2 sk-cube"></div>'
+'<div class="sk-cube4 sk-cube"></div>'
+'<div class="sk-cube3 sk-cube"></div>'
+'</div>';


var loginIframe = '<iframe allowtransparency="true" class="loginIframe" src="https://staging.yugoup.com/yugoweb/login/login.html" id="login"></iframe>';

var sucesso = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2"> <circle class="path circle" fill="none" stroke="#73AF55" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"/> <polyline class="path check" fill="none" stroke="#73AF55" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "/> </svg> <p class="success">Sucesso</p>'; 

/*********************************************************************************/
/*                            Menu Links Resources                               */
/*********************************************************************************/

function getMainMenu(companyMenuUi,companySingleWebPage){

    var html_elem_main_menu = "";

    var linkaddress,
        private;

        $.each(companyMenuUi, function(i, item){

                     if (companySingleWebPage){
                        html_elem_main_menu += "<li><a href='#"+ arrayPages[companyMenuUi[i].idMenu] +"'>" + companyMenuUi[i].text + "</a></li>";

                     } else {

                         
                         if(companyMenuUi[i].type == 1){

                             linkaddress = arrayPages[companyMenuUi[i].idMenu]+'.html';
                             private = companyMenuUi[i].private;

                             html_elem_main_menu += "<li><a data-private='"+private+"' data-link='"+linkaddress+"' class='menu-lh menu-h menuLink'>" + companyMenuUi[i].text + "</a></li>";


                         } else if (companyMenuUi[i].type == 2){

                             linkaddress = "list.html?id="+ companyMenuUi[i].idMenu;
                             private = companyMenuUi[i].private;

                             html_elem_main_menu += "<li><a data-private='"+private+"' data-link='"+linkaddress+"'  class='menu-lh menu-h menuLink'>" + companyMenuUi[i].text + "</a></li>";
                        
                        } else if (companyMenuUi[i].type == 3){

                                 linkaddress = "booking.html?id="+ companyMenuUi[i].idMenu;
                                private = companyMenuUi[i].private;

                                html_elem_main_menu += "<li><a data-private='"+private+"' data-link='"+linkaddress+"'  class='menu-lh menu-h menuLink'>" + companyMenuUi[i].text + "</a></li>";
                            }
                        }
                     
                    });

                    return  html_elem_main_menu ;
    
}

/*********************************************************************************/
/*                            Booking Resources Resources                        */
/*********************************************************************************/

function getBookingMode(bookingMode,tabTextAdd,tabTextList){

    var html = "";

    if(bookingMode == 2){
            html += '<ul class="nav nav-tabs tpl-tabs animate"><li style="width:50%" class="active"><a href="#one" data-toggle="tab">'+tabTextAdd+'</a></li>';
            html += '<li style="width:50%" ><a href="#two" data-toggle="tab" onclick="requestBookingAssigns();">'+ tabTextList +'</a></li></ul>';
    }

    return html;

}



function getBookingAssignsElements(bookingAssigns){

     $.each (bookingAssigns, function(i, value){

      type = bookingAssigns[i].$type;
      idBookingAssign = bookingAssigns[i].id;
      idbooking = bookingAssigns[i].idBooking;
      dateCreation = bookingAssigns[i].dateCreation;
      dateUpdate = bookingAssigns[i].dateLastUpdate;
      responses = bookingAssigns[i].responses;
      idBookingStateAssign = bookingAssigns[i].idBookingStateAssign;

      if (responses != "" || responses != null){

      requestBookingAssignsUpdates(idBookingAssign);
        color = "";
        textState = "";

      $.each(statesAssigns,function(i, value){
        if (statesAssigns[i].id === idBookingStateAssign){
            color = statesAssigns[i].color;
            textState = statesAssigns[i].text;
            color = color.slice(2);
         }
      });

        dateUpdate = moment.utc(dateUpdate);
        dateUpdate = dateUpdate.local();
    
        dateUpdate = dateUpdate.fromNow(true);
            
     elem_bookingAssingSection += "<dt>";
      elem_bookingAssingSection += '<a style="border-left: #'+ color +' 6px solid" href="">'+ bookingTitle +' #'+ idBookingAssign +' <span style="float:right;margin-right:1.6em;font-size:0.7em">'+ textState +'</span><br>';
      elem_bookingAssingSection += "<span style='font-size:0.7em'>Ver mais detalhe</span>";
      elem_bookingAssingSection += "<span style='float:right;margin-right:1.6em;font-size:0.7em'>"+dateUpdate+"</span>";
      elem_bookingAssingSection += '</a>';
      elem_bookingAssingSection += "</dt>";

      elem_bookingAssingSection += "<dd style='display: none;'>";
      elem_bookingAssingSection += "<div class='row'>";
      elem_bookingAssingSection += "<h5 class='font-alt'><strong>Detalhe "+bookingTitle+"</strong></h5>";


      $.each (responses, function(j, value){ 
        $type = responses[j].$type;
        idBookingOption = responses[j].idBookingOption;
        result = responses[j].result;
        title = responses[j].title;
        typeOption = responses[j].typeOption
        
        if(typeOption == 2){
            var time = responses[j].time;
            var date = responses[j].date;

            console.log("Date$time");
            console.log(time);
            console.log(date);
            

            if (date != false && time != false){
            result = moment.utc(result).format('DD-MM-YYYY HH:mm');
            } else if (date != true && time != false) {
                result = moment.utc(result).format('HH:mm');
            } else if (date != false && time != true) {
                result = moment.utc(result).format('DD-MM-YYYY');
            }
           
        }
   

      

        elem_bookingAssingSection += "<strong>"+ title +": </strong>"+ result +"<br>";
      });

      elem_bookingAssingSection += "</div>";

      elem_bookingAssingSection += "<div id='updates_"+idBookingAssign+"'></div>";


      elem_bookingAssingSection += '</div></div>';
      
    }

  });

  return elem_bookingAssingSection;
}


function getBookingHelper(bookingHelper){

    bookingHelperType = bookingHelper.$type;
    
      if (bookingHelperType.indexOf("BookingOptionHelperText") >= 0 ){

                bookingHelperTexts = bookingHelper.texts[0].value;
                elem_bookingHelperHtml = '<div class="help-tip"><p>'+bookingHelperTexts+'</p></div>';
                return elem_bookingHelperHtml;

        } else if (bookingHelperType.indexOf("BookingOptionHelperImage") >= 0){

                bookingHelperTexts = data.bookingOptions[i].BookingOptionHelper.imagePath;
                pathimage = ""+ urlResolver(1,bookingHelperTexts)+"";

                imgTumb = '<img onclick="view(this);" style="max-width:50px; max-height:50px; position: relative;float: right;box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);" src="'+pathimage+'" />';

                elem_bookingHelperHtml ='<div id="thumb" data-chocolat-title="Set title"><a class="chocolat-image" href="'+pathimage+'" title="">'+imgTumb+'</a></div>';
                elem_bookingHelperHtml +='<img id="previewImage" src="#" alt="Image to load" /></a></div>'
                
                return elem_bookingHelperHtml;
        }
}

function getBookingOptionTextBox(id, typeOption, typeAssignValue, regexPatterns, regexDescription, titleBooking, requiredPlaceholder, requiredElement, valueElement, elem_bookingHelperHtml){

                    var html_bookingOptionTextBox = "";

                    html_bookingOptionTextBox += elem_bookingHelperHtml;
                    html_bookingOptionTextBox += "<div class='clearfix'>";
                    html_bookingOptionTextBox += '<div class="form-group">';
                    html_bookingOptionTextBox += '<input type="text" name="'+id+'" id="input'+id+'" class="input-md form-control TextBox" data-id="'+id+'"  data-typeoption="'+typeOption+'" data-type="'+typeAssignValue+'" pattern="'+ regexPatterns+'" data-regexdesc="'+regexDescription+'" placeholder="'+titleBooking+requiredPlaceholder+'" '+requiredElement+' '+valueElement+'></input>';
                    html_bookingOptionTextBox += "</div>";
                    html_bookingOptionTextBox += "</div>";

                    return html_bookingOptionTextBox;

}

function getBookingOptionDate(id,typeOption, timepicker_settign, datepicker_setting, typeAssignValue, titleBooking, requiredPlaceholder, requiredElement, elem_bookingHelperHtml){

            var html_bookingOptionDate = "";

            html_bookingOptionDate += elem_bookingHelperHtml;
            html_bookingOptionDate += "<div class='clearfix'><div class='form-group'>";
            html_bookingOptionDate += '<input id="datetimepicker'+id+'" type="text" class="input-md form-control" data-id="'+id+'" data-typeoption="'+typeOption+'" data-timepicker="'+timepicker_settign+'" data-datepicker="'+datepicker_setting+'" data-type="'+typeAssignValue+'" placeholder="'+titleBooking+requiredPlaceholder+'" '+requiredElement+'>';
            html_bookingOptionDate += "</div></div>";

            return html_bookingOptionDate;


}

function getBookingOptionPickerNumber(id,typeOption,typeAssignValue,titleBooking,requiredPlaceholder,requiredElement,minValue,maxValue,elem_bookingHelperHtml){

            var html_bookingOptionPickerNumber = "";

            html_bookingOptionPickerNumber += elem_bookingHelperHtml;
            html_bookingOptionPickerNumber += "<div class='clearfix'><div class='form-group'>";
            html_bookingOptionPickerNumber += '<input type="number" id="input'+id+'" class="input-md form-control" data-id="'+id+'" data-typeoption="'+typeOption+'" data-type="'+typeAssignValue+'" placeholder="'+titleBooking+requiredPlaceholder+'" '+requiredElement+' min="'+ minValue +'" max="'+maxValue+'">';
            html_bookingOptionPickerNumber += "</div></div>";

            return html_bookingOptionPickerNumber;

}

function getBookingOptionDropdown(id,typeOption,typeAssignValue,titleBooking,requiredPlaceholder,requiredElement,elem_bookingHelperHtml, dropdownElements){

                var html_bookingOptionDropdown = "";
                html_bookingOptionDropdown += elem_bookingHelperHtml;
                html_bookingOptionDropdown += "<div class='clearfix'><div id='input"+id+"' class='form-group'><select class='input-md form-control' data-id='"+id+"' data-type='"+typeAssignValue+"' data-typeoption='"+typeOption+"' "+requiredElement+">";
                html_bookingOptionDropdown += "<option value=''>"+ titleBooking + requiredPlaceholder +"</option>"
                
                $.each(dropdownElements,function(j,item){
                    var optionsId = dropdownElements[j].id;
                    var optionsName= dropdownElements[j].elementNames[0].value;

                     html_bookingOptionDropdown += '<option data-id="'+id+'" value="'+ optionsId +'" id="'+ optionsId +'">'+ optionsName +'</option>';
                });

                html_bookingOptionDropdown += "</select><label id='select"+id+"'></label></div></div>";

                return html_bookingOptionDropdown;


}

function getBookingOptionTextArea(id,typeOption,typeAssignValue,titleBooking,requiredPlaceholder,requiredElement,elem_bookingHelperHtml){

            var html_bookingOptionTextArea = "";
            html_bookingOptionTextArea += elem_bookingHelperHtml;
            html_bookingOptionTextArea += '<div class="clearfix"><textarea name="text" id="input'+ id +'" data-typeoption="'+typeOption+'" data-id="'+id+'" data-type="'+typeAssignValue+'" class="input-md form-control" rows="8" placeholder="'+ titleBooking + requiredPlaceholder +'" maxlength="400" '+requiredElement+'></textarea></div>';
            
            return html_bookingOptionTextArea;
}

function getbookingOptionCheckBox(id,typeOption,typeAssignValue,titleBooking,requiredPlaceholder,requiredElement,elem_bookingHelperHtml){
            
            var html_bookingOptionCheckBox = "";
            html_bookingOptionCheckBox += elem_bookingHelperHtml;
            html_bookingOptionCheckBox += '<div class="clearfix"><label>'+ titleBooking+requiredPlaceholder+'</label>';
            html_bookingOptionCheckBox += '<div class="clearfix"><label class=""><input data-typeoption="'+typeOption+'" data-id="'+id+'" data-type="'+typeAssignValue+'" type="checkbox" id="'+ id +'" value="true" '+requiredElement+'>';
            html_bookingOptionCheckBox += '</label>';

            return html_bookingOptionCheckBox;

}

function getBookingOptionMediaPickerBoth(id,typeOption,typeAssignValue,titleBooking,requiredPlaceholder,requiredElement,elem_bookingHelperHtml,typeMedia,modeMedia){
            
            var html_bookingOptionMediaPickerBoth = "";

            if(typeMedia == 1){

                html_bookingOptionMediaPickerBoth += elem_bookingHelperHtml;
                html_bookingOptionMediaPickerBoth += '<div class="clearfix"><label for="exampleInputFile">'+titleBooking+requiredPlaceholder+'</label></div>';
                html_bookingOptionMediaPickerBoth += '<div class="clearfix"><div class="fileUpload btn btn-mod btn-border btn-medium btn-round"><i class="fa fa-picture-o"></i><span>Carregar Ficheiro</span><input data-typeMedia="'+typeMedia+'" data-modeMedia="'+modeMedia+'"  data-typeoption="'+typeOption+'" data-id="'+id+'" data-type="'+typeAssignValue+'" type="file" accept="image/*" class="upload fileChange" /></div>';
                html_bookingOptionMediaPickerBoth +='<img class="previewFile prev'+id+'" src="#" alt="Image to load" />';

            } else if (typeMedia == 2){

                //("Investigar");

            } else if (typeMedia == 3){

                if(modeMedia == 1){
                 
                          html_bookingOptionMediaPickerBoth += elem_bookingHelperHtml;
                          html_bookingOptionMediaPickerBoth += '<div class="clearfix"><label for="exampleInputFile">'+titleBooking+requiredPlaceholder+'</label></div>';
                          html_bookingOptionMediaPickerBoth += '<audio controls class="previewFile prev'+id+'" src="" id="audio'+ id +'"></audio>';
                          html_bookingOptionMediaPickerBoth += '<div class="clearfix"><div class="fileUpload btn btn-mod btn-border btn-medium btn-round"><i class="fa fa-microphone"></i><span>Carregar Ficheiro</span><input data-typeMedia="'+typeMedia+'" data-modeMedia="'+modeMedia+'" data-typeoption="'+typeOption+'" data-id="'+id+'" data-type="'+typeAssignValue+'" type="file" accept=".wav" class="upload fileChange" /></div>';
                    
                } else if (modeMedia == 1) {

                            html_bookingOptionMediaPickerBoth += elem_bookingHelperHtml;
                            html_bookingOptionMediaPickerBoth += '<div class="clearfix"><label for="exampleInputFile">'+titleBooking+requiredPlaceholder+'</label></div>';
                            html_bookingOptionMediaPickerBoth += '<div style="margin:10px;"> <audio controls src="" id="audio'+ id +'"></audio><br><a id="btn-start-recording'+id+'" onclick="startRecordingYGW('+id+')" class="fileUpload btn btn-mod btn-border btn-medium btn-round btnRecordAudio"><i class="fa fa-microphone"></i></a> <a id="btn-stop-recording'+id+'" onclick="stopRecordingYGW('+id+')" disabled class="fileUpload btn btn-mod btn-border btn-medium btn-round btnRecordAudio"><i class="fa fa-square"></i></a> <a id="btn-pause-recording'+id+'" onclick="restartRecordingYGW('+id+')" disabled class="fileUpload btn btn-mod btn-border btn-medium btn-round btnRecordAudio"><i class="fa fa-repeat"></i></a></div>';
                            html_bookingOptionMediaPickerBoth += '<div class="fileUpload"><input data-typeMedia="'+typeMedia+'" data-modeMedia="'+modeMedia+'" data-typeoption="'+typeOption+'" data-id="'+id+'" data-type="'+typeAssignValue+'" value="audio" class="upload" /></div>';
                            //data-typeoption="'+typeOption+'" data-id="'+id+'" data-type="'+typeAssignValue+'"
                            //elem_bookingOptionMediaPickerBoth += '<div class="clearfix"><div class="fileUpload btn btn-mod btn-border btn-medium btn-round"><i class="fa fa-picture-o"></i><span>Carregar Ficheiro</span><input data-typeoption="'+typeOption+'" data-id="'+id+'" data-type="'+typeAssignValue+'" type="file" class="upload imgInp" /></div>';
                            
                            var aScripts = document.getElementById('rtcRecording');

                            if (aScripts === null) {

                            var audioScript = document.createElement("script");
                                audioScript.id = "rtcRecording";
                                audioScript.type = "text/javascript";
                                audioScript.src = "js/audioInputs.js";
                                document.body.appendChild(audioScript); 

                            }
                                
                        } else if (modeMedia == 3){
                            html_bookingOptionMediaPickerBoth += elem_bookingHelperHtml;
                            html_bookingOptionMediaPickerBoth += '<div class="clearfix"><label for="exampleInputFile">'+titleBooking+requiredPlaceholder+'</label></div>';
                            html_bookingOptionMediaPickerBoth += '<audio controls class="previewFile prev'+id+'" src="" id="audio'+ id +'"></audio>';
                            html_bookingOptionMediaPickerBoth += '<div class="clearfix"><div class="fileUpload btn btn-mod btn-border btn-medium btn-round"><i class="fa fa-microphone"></i><span>Carregar Audio</span><input data-typeMedia="'+typeMedia+'" data-modeMedia="'+modeMedia+'" data-typeoption="'+typeOption+'" data-id="'+id+'" data-type="'+typeAssignValue+'" type="file" accept=".wav" class="upload fileChange" /></div>';
                            
                        }
                 
                }

                return html_bookingOptionMediaPickerBoth;

            }

/*********************************************************************************/
/*                                 List Resources                                */
/*********************************************************************************/

   function getListElement(listStyle,parent, uri, queryParameters, listName, listDescription, listIdList, listId,pathimage, counter){

    var html_elem_list = "";

           if (counter == 0){
                 html_elem_list += '<h2 class="section-title font-alt align-left mb-70 mt-50 mb-sm-40 fadeIn listParent">'+ titleList +'</h2>';
                 if(listStyle == 1){
                    html_elem_list += '<div class="row multi-columns-row">';
                 } else if(listStyle == 5){
                    html_elem_list += '<div class="row">';
                 }
            }

       if(listStyle == 1){

                /* <!-- Post Item --> */
                html_elem_list += '<div class="col-sm-6 col-md-4 col-lg-4 mb-md-50 wow fadeIn listParent" data-parent="'+ parent +'" data-wow-delay="0.1s" data-wow-duration="2s">';
                html_elem_list += '<div class="post-prev-img">';
                html_elem_list += '<a href="'+ uri + queryParameters +'"><img src="'+ + '" alt="" /></a>';
                html_elem_list += '</div>';
                html_elem_list += '<div class="post-prev-title font-alt"><a href="">'+ listName +'</a></div>';
                html_elem_list += '<div class="post-prev-text">'+ listDescription +'</div>';
                

                if(listHasChildren == true){
                     html_elem_list += '<div class="post-prev-more mb-30"><a href="'+uri+'?id='+listIdList+'&idParent='+ listId +'" class="btn btn-mod btn-gray btn-round">Ver mais<i class="fa fa-angle-right"></i></a></div>';
                }

                    html_elem_list += '</div>';
                
                } else if(listStyle == 2){

                    if(i == 0){
                        startText = 'start';
                    } else {
                         startText = '';
                    }

                 html_elem_list += '<section style="padding:40px" class="page-section listParent" id="'+ startText +'"><div class="container relative">';
                 html_elem_list += "<div class='row'>";
                /* <!-- Post Item --> */
                html_elem_list += '<div class="col-md-7 mb-sm-40">';
                html_elem_list += '<a href="'+ uri +'?id='+listIdList+'&idParent='+ listId +'"><img style="width: 653px" src="'+ pathimage +'" alt="" /></a>';
                html_elem_list += '</div>';

                html_elem_list += '<div class="col-md-5 col-lg-4 col-lg-offset-1"><div class="text">';
                html_elem_list += ' <h3 class="font-alt mb-30 mb-xxs-10">'+ listName +'</h3>';
                html_elem_list += '<p>'+ listDescription +'</p>';
                

                if(listHasChildren == true){
                     html_elem_list += '<div class="mt-40 mb-30"><a href="'+uri+'?id='+listIdList+'&idParent='+ listId +'" class="btn btn-mod btn-border btn-round btn-medium" target="_blank">Ver</a></div>';
                }

                html_elem_list += '</div></div>';
                html_elem_list += '</div>';

                html_elem_list += '</div></section>';
                
            } else if(listStyle == 4){

                /* <!-- Post Item --> */
                html_elem_list += '<div class="col-sm-6 col-md-4 col-lg-4 mb-md-50 wow fadeIn listParent" data-parent="'+ parent +'" data-wow-delay="0.1s" data-wow-duration="2s">';
                html_elem_list += '<div class="post-prev-img">';
                html_elem_list += '<a href="'+ uri + queryParameters +'"><img src="'+ pathimage +'" alt="" /></a>';
                html_elem_list += '</div>';
                html_elem_list += '<div class="post-prev-title font-alt"><a href="">'+ listName +'</a></div>';
                html_elem_list += '<div class="post-prev-text">'+ listDescription +'</div>';
                

                if(listHasChildren == true){
                     html_elem_list += '<div class="post-prev-more mb-30"><a href="'+uri+'?id='+listIdList+'&idParent='+ listId +'" class="btn btn-mod btn-gray btn-round">Ver mais<i class="fa fa-angle-right"></i></a></div>';
            }
                html_elem_list += '</div>';
                
            } else if(listStyle == 5){
                
                 html_elem_list += '<div class="col-sm-4 mb-xs-30 wow fadeInUp listParent" data-wow-delay="0.2s">';
                 html_elem_list += "<div class='team-item'>";
                /* <!-- Post Item --> */
                html_elem_list += '<div class="team-item-image">';
                html_elem_list += '<img src="'+ pathimage +'" alt="" />';
                html_elem_list += '<div class="team-item-detail">';

                html_elem_list += '<h4 class="font-alt normal">'+ listName +'</h4>';
                html_elem_list += '<p>'+ listDescription +'</p>';
                            html_elem_list += '</div>';
                        html_elem_list += '</div>';
                    html_elem_list += '</div>';
                html_elem_list += '</div>';

            } else {

                html_elem_list += '<div class="col-sm-6 col-md-4 col-lg-4 mb-md-50 wow fadeIn listParent" data-parent="'+ parent +'" data-wow-delay="0.1s" data-wow-duration="2s">';
                html_elem_list += '<div class="post-prev-img">';
                html_elem_list += '<a href="'+ uri + queryParameters +'"><img src="'+ pathimage +'" alt="" /></a>';
                html_elem_list += '</div>';
                html_elem_list += '<div class="post-prev-title font-alt"><a href="">'+ listName +'</a></div>';
                html_elem_list += '<div class="post-prev-text">'+ listDescription +'</div>';
                

                if(listHasChildren == true){
                     html_elem_list += '<div class="post-prev-more mb-30"><a href="'+uri+'?id='+listIdList+'&idParent='+ listId +'" class="btn btn-mod btn-gray btn-round">Ver mais<i class="fa fa-angle-right"></i></a></div>';
            }
                html_elem_list += '</div>';

            }

            return html_elem_list;

   }

   function getListElementTitle(listStyle){

        var html_elem_list = "";




        
        return html_elem_list;


   }


/*********************************************************************************/
/*                         Social Links Resources                                */
/*********************************************************************************/

function getSocialLinks(companySocialNetworks,companySocialVideos){

    $.each(companySocialNetworks, function(i, item){

            socialLink = companySocialNetworks[i].link;

            if(socialLink != null && socialLink != "undefined" && socialLink != ""){ 

                if(companySocialNetworks[i].idSocialNetwork == 1) {
                            elem_social_network += '<a href="'+ socialLink +'" title="Facebook" target="_blank"><i class="fa fa-facebook"></i></a>';
                } else if (companySocialNetworks[i].idSocialNetwork == 2) {
                            
                            elem_social_network += '<a href="'+ socialLink +'" title="Twitter" target="_blank"><i class="fa fa-twitter"></i></a>';

                } else if (companySocialNetworks[i].idSocialNetwork == 3) {
                    
                            elem_social_network += '<a href="'+ socialLink +'" title="Instagram" target="_blank"><i class="fa fa-instagram"></i></a>';

                } else if (companySocialNetworks[i].idSocialNetwork == 4) {
                            elem_social_network += '<a href="'+ socialLink +'" title="Google" target="_blank"><i class="fa fa fa-google-plus"></i></a>';

                } else if (companySocialNetworks[i].idSocialNetwork == 5) {
                    
                            elem_social_network += '<a href="'+ socialLink +'" title="LinkedIn+" target="_blank"><i class="fa fa-linkedin"></i></a>';
                } else if (companySocialNetworks[i].idSocialNetwork == 6) {
            
                            elem_social_network += '<a href="'+ socialLink +'" title="LinkedIn+" target="_blank"><i class="fa fa-linkedin"></i></a>';
                }
    
            }
            
        });

        $.each(companySocialVideos, function(i, item){

                    socialLink = companySocialVideos[i].link;

                    if(socialLink != null && socialLink != "undefined" && socialLink != ""){ 

                        if(companySocialVideos[i].idSocialNetwork == 1) {

                                        elem_social_network += '<a href="'+ socialLink +'" title="Youtube" target="_blank"><i class="fa fa-youtube-play"></i></a>';
                        
                        } else if (companySocialNetworks[i].idSocialNetwork == 2) {

                                        elem_social_network += '<a href="'+ socialLink +'" title="Vimeo" target="_blank"><i class="fa fa-vimeo-square"></i></a>';
                                
                        }
            
                    }
        });

        return elem_social_network;

}


/*********************************************************************************/
/*                         Edit Profile Resources                                */
/*********************************************************************************/

function getFormEdit(name, valueBday, today, minDate, phone, quote, checkUndefined, checkMale, checkFemale, checkUndefined){

    var form = '<div class="wrapper.editprofile">' 
        +'<form id="editProfileForm" role="form" class="form form-editprofile">' 
        +'<h2 class="form-signin-heading">Editar Perfil</h2>'
        +'<div class="mb-20 mb-md-10">'
        +'<input type="text" class="input-md form-control" name="name" data-type="name" placeholder="'+name+'" value="'+name+'" required="" autofocus="" />'
        +'</div>'
        +'<div class="mb-20 mb-md-10">'
        +'<input  type="date" class="input-md form-control" name="birthday" data-type="birthday" '+valueBday+' max="'+ today +'" min="'+minDate+'"/>'
        +'</div>'
        +'<div class="mb-20 mb-md-10">'
        +'<input type="text" class="input-md form-control" name="Telemovel" data-type="phoneNumber" placeholder="Telemovel" value="'+phone+'"/>' 
        +'</div>'
        +'<div class="mb-20 mb-md-10">'
        +'<input type="text" class="input-md form-control" name="Quote" data-type="quote" placeholder="Quote" value="'+quote+'"/>' 
        +'</div>'
        +'<div class="mb-30 mb-md-10">'
        +'<select class="ygw-select-class" data-type="gender">'
        +'<option '+checkUndefined+' value="0">'+arrayGender[0]+'</option>'
        +'<option '+checkMale+' value="1">'+arrayGender[1]+'</option>'
        +'<option '+checkFemale+' value="2">'+arrayGender[2]+'</option>'
        +'<option '+checkUndefined+' value="3">'+arrayGender[3]+'</option>'
        +'</select>'
        +'</div>'
        +'<div class="align-right pt-10">'
        +'<a class="btn btn-mod btn-medium btn-round" onclick="editProfileData();">Guardar Alterações</a>'
        +' </div>'
        +'</form>' 
        +'</div>';


        return form;

}