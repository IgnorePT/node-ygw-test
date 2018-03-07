/*                     Booking's Teste                       */

//Variables URL

// Variable for errors and sucess messages
var err = "",
    succ= "";

var rules = "rules: {";
var rules_input = "";
var appendValidator = "";
var validate = "";
var messages ="messages: {";
var messages_input = "",
    timepicker_settign = true,
    format = "",
    datepicker_setting = true;


// Variable for HTML elments
var all_elem = "",
    img_elem = "",
    elem_bookingOptionTextBox = "",
    elem_bookingOptionDate = "",
    elem_bookingOptionPickerNumber = "",
    elem_bookingOptionDropdown= "",
    elem_bookingOptionCheckBox = "",
    elem_bookingOptionMediaPickerBoth="",
    elem_bookingOptionTextArea = "",
    elem_bookingHelperHtml = "",
    elem_bookingAssingSection = "",
    elem_bookingAssingSectionDD = "",
    elem_all_bookingAssign = "",
    elem_bookingUpdateInfo = "",
    elem_booking_mode = "";

// Selectors
var elem_bookingTitle = $("#bookingTitle"),
    elem_bookingSendButton = $("#submit_btn2"),
    elem_bookingDeleteButton = $("#delete_btn"),
    elem_bookingDescription = $("#booking_description"),
    elem_bookingMain = $("#bookingDefault"),
    elem_bookingDescription = $("#booking_description"),
    elem_BookingMode = $('#bookingmode');

//Variables Booking Settings
var id_booking = "",
    bookingTitle = "",
    tabTextAdd = "",
    tabTextList = "",
    textButtonAdd = "",
    textButtonDelete = "",
    textMessageAddSuccess = "",
    textMessageAdd = "",
    bookingAssignStatusSettings = "",
    typeOption = "",
    bookingStateAssigns = [];

    var fileName = "Ficheiro_imagem.jpg";

// Variables for Booking Options
var bookingOptions = "",
    bookingOptionTextArea = "",
    bookingOptionDate = "",
    bookingOptionPickerNumber = "",
    bookingOptionDropdown = "",
    bookingOptionTextArea = "",
    bookingOptionCheckBox = "",
    bookingOptionMediaPickerBoth="",
    bookingHelperType = "",
    bookingAssigns = "";

var getUrlParameter = function getUrlParameter(sParam) {
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

// Functions
     idBooking = getUrlParameter('id');
     extraParameters["idBooking"] = idBooking;
 
    idMethod = 7;
    initialRequest(idMethod);


    function bookingSettings(data){

        bookingTitle = data.bookingSettings.bookingSettingTexts.text;
        bookingMode = data.bookingSettings.bookingMode;
        //console.log("Booking Mode:");
        //console.log(bookingMode);
        //console.log(data.bookingSettings.bookingMode);

        bookingDescription = data.bookingSettings.bookingSettingTexts.description;
        tabTextAdd = data.bookingSettings.bookingSettingTexts.textAdd;
        tabTextList = data.bookingSettings.bookingSettingTexts.textList;
        textButtonAdd = data.bookingSettings.bookingSettingTexts.textButtonAdd;
        textButtonDelete = data.bookingSettings.bookingSettingTexts.textButtonDelete;
        textMessageAddSuccess = data.bookingSettings.bookingSettingTexts.textMessageAddSuccess;
        textMessageAdd = data.bookingSettings.bookingSettingTexts.textMessageAddSuccess;
        statesAssigns = data.bookingSettings.bookingStateAssigns;

        elem_bookingTitle.html(bookingTitle);
        elem_bookingSendButton.html(textButtonAdd);
        elem_bookingDeleteButton.html(textButtonDelete);
        elem_bookingDescription.html(bookingDescription);

        if(bookingMode == 2){
            elem_booking_mode += '<ul class="nav nav-tabs tpl-tabs animate"><li style="width:50%" class="active"><a href="#one" data-toggle="tab">'+tabTextAdd+'</a></li>';
            elem_booking_mode += '<li style="width:50%" ><a href="#two" data-toggle="tab" onclick="requestBookingAssigns();">'+ tabTextList +'</a></li></ul>';

            elem_BookingMode.prepend(elem_booking_mode);

    }
        

        requestWebService (6,extraParameters);
    }
               

function getBookingsOptions(data){

  $.each (data.bookingOptions, function(i, value){

      rules_input = "";
      messages_input = "";
      CustomValidator = "";

      count_max = i + 1;

      type = data.bookingOptions[i].$type;
      id = data.bookingOptions[i].id;
      id_Booking = data.bookingOptions[i].idBooking;
      required = data.bookingOptions[i].required;
      iconPrimary = data.bookingOptions[i].iconValue;
      titleBooking = data.bookingOptions[i].titles[0].value;
      typeAssignValue = "com.izilabs.Lib.Enterprise.Bookings.BookingAssignValue, com.izilabs.Lib.Enterprise"; 


      if (typeof data.bookingOptions[i].BookingOptionHelper === 'undefined' || data.bookingOptions[i].BookingOptionHelper === null){
          //Handle Err
          err += ('BookingOptionHelper Não definido');
          bookingHelperType = "";
          bookingHelperTexts = "";
          elem_bookingHelperHtml = '';

      } else {
          bookingHelperType = data.bookingOptions[i].BookingOptionHelper.$type;

            if (bookingHelperType.indexOf("BookingOptionHelperText") >= 0 ){
                bookingHelperTexts = data.bookingOptions[i].BookingOptionHelper.texts[0].value;
                elem_bookingHelperHtml = '<div class="help-tip"><p>'+bookingHelperTexts+'</p></div>';

            } else if (bookingHelperType.indexOf("BookingOptionHelperImage") >= 0){
                bookingHelperTexts = data.bookingOptions[i].BookingOptionHelper.imagePath;
                pathimage = ""+ urlResolver(1,bookingHelperTexts)+"";
                imgTumb = '<img onclick="view(this);" style="max-width:50px; max-height:50px; position: relative;float: right;box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);" src="'+pathimage+'" />';
                elem_bookingHelperHtml ='<div id="thumb" data-chocolat-title="Set title"><a class="chocolat-image" href="'+pathimage+'" title="">'+imgTumb+'</a></div>';
                elem_bookingHelperHtml +='<img id="previewImage" src="#" alt="Image to load" /></a></div>'
                
            }
      }
    
      bookingOptionTextBox = type.indexOf("BookingOptionTextBox");
      bookingOptionDate = type.indexOf("BookingOptionDate");
      bookingOptionPickerNumber = type.indexOf("BookingOptionPickerNumber");
      bookingOptionDropdown = type.indexOf("BookingOptionDropdown");
      bookingOptionTextArea = type.indexOf("BookingOptionTextArea");
      bookingOptionCheckBox = type.indexOf("BookingOptionCheckBox");
      bookingOptionMediaPickerBoth = type.indexOf("BookingOptionMediaPicker");
      //bookingOptionMediaPickerBoth = type.indexOf("BookingAssignValueMediaAudio");

        if (required == true){
                requiredElement = "required";
                requiredPlaceholder = "*";
        } else {    
                requiredElement= "";
                requiredPlaceholder="";    
        }

        if (bookingOptionTextBox > 0){
            idRegexPattern = data.bookingOptions[i].idRegexPattern;
            regexPatterns = data.bookingOptions[i].regexPattern;
            regexDescription = data.bookingOptions[i].regexDescription;
            textBoxDefaultValue = data.bookingOptions[i].textBoxDefaultValue;
             typeOption = 1;

           
            elem_bookingOptionTextBox += elem_bookingHelperHtml;
            elem_bookingOptionTextBox += "<div class='clearfix'>";
            elem_bookingOptionTextBox += '<div class="form-group">';
            elem_bookingOptionTextBox += '<input type="text" name="'+id+'" id="input'+id+'" class="input-md form-control TextBox" data-id="'+id+'"  data-typeoption="'+typeOption+'" data-type="'+typeAssignValue+'" pattern="'+ regexPatterns+'" data-regexdesc="'+regexDescription+'" placeholder="'+titleBooking+requiredPlaceholder+'" '+requiredElement+'></input>';
            elem_bookingOptionTextBox += "</div>";
            elem_bookingOptionTextBox += "</div>";


            /*** Validation Rules ***/


            var regex = new RegExp(regexPatterns);

            all_elem += elem_bookingOptionTextBox;
            elem_bookingOptionTextBox = "";
}

   
       if (bookingOptionDate > 0){
           dateBooking = data.bookingOptions[i].date;
           hourBooking = data.bookingOptions[i].time;
           iconSecondary = data.bookingOptions[i].secondIcon;
           typeOption = 2;

           if (dateBooking == true && hourBooking == true ){

               timepicker_settign = true;
               datepicker_setting = true;
               format = "Y-m-d H:i"

                
                setDateTimePicker(id,datepicker_setting,timepicker_settign,format);

                
           } else if (dateBooking == true && hourBooking == false ) {

                timepicker_settign = false;
                datepicker_setting = true;
                format = "Y-m-d"
                
                setDateTimePicker(id,datepicker_setting,timepicker_settign,format);

           } else {

                timepicker_settign = true;
                datepicker_setting = false;
                format = "H:i"
                
                setDateTimePicker(id,datepicker_setting,timepicker_settign,format);

           }

            elem_bookingOptionDate += elem_bookingHelperHtml;
            elem_bookingOptionDate += "<div class='clearfix'><div class='form-group'>";
            elem_bookingOptionDate += '<input id="datetimepicker'+id+'" type="text" class="input-md form-control" data-id="'+id+'" data-typeoption="'+typeOption+'" data-timepicker="'+timepicker_settign+'" data-datepicker="'+datepicker_setting+'" data-type="'+typeAssignValue+'" placeholder="'+titleBooking+requiredPlaceholder+'" '+requiredElement+'>';
            elem_bookingOptionDate += "</div></div>";

           all_elem += elem_bookingOptionDate;
           elem_bookingOptionDate = "";
       }


        if (bookingOptionPickerNumber > 0){
            minValue = data.bookingOptions[i].minValue;
            maxValue = data.bookingOptions[i].maxValue;
            typeOption = 3;

            elem_bookingOptionPickerNumber += elem_bookingHelperHtml;
            elem_bookingOptionPickerNumber += "<div class='clearfix'><div class='form-group'>";
            elem_bookingOptionPickerNumber += '<input type="number" id="input'+id+'" class="input-md form-control" data-id="'+id+'" data-typeoption="'+typeOption+'" data-type="'+typeAssignValue+'" placeholder="'+titleBooking+requiredPlaceholder+'" '+requiredElement+' min="'+ minValue +'" max="'+maxValue+'">';
            elem_bookingOptionPickerNumber += "</div></div>";
            

            all_elem += elem_bookingOptionPickerNumber;
        }

        if (bookingOptionDropdown > 0){

            typeOption = 4;

                elem_bookingOptionDropdown += elem_bookingHelperHtml;
                elem_bookingOptionDropdown += "<div class='clearfix'><div id='input"+id+"' class='form-group'><select class='input-md form-control' data-id='"+id+"' data-type='"+typeAssignValue+"' data-typeoption='"+typeOption+"' "+requiredElement+">";
                elem_bookingOptionDropdown += "<option value=''>"+ titleBooking + requiredPlaceholder +"</option>"
                
                $.each(data.bookingOptions[i].dropdownElements,function(j,item){
                    var optionsId = data.bookingOptions[i].dropdownElements[j].id;
                    var optionsName= data.bookingOptions[i].dropdownElements[j].elementNames[0].value;

                     elem_bookingOptionDropdown += '<option data-id="'+id+'" value="'+ optionsId +'" id="'+ optionsId +'">'+ optionsName +'</option>';
                });

                elem_bookingOptionDropdown += "</select><label id='select"+id+"'></label></div></div>";
                
            

            all_elem += elem_bookingOptionDropdown;
            elem_bookingOptionDropdown = "";

        }

        if (bookingOptionTextArea > 0){

            typeOption = 5;
            elem_bookingOptionTextArea += elem_bookingHelperHtml;
            elem_bookingOptionTextArea += '<div class="clearfix"><textarea name="text" id="input'+ id +'" data-typeoption="'+typeOption+'" data-id="'+id+'" data-type="'+typeAssignValue+'" class="input-md form-control" rows="8" placeholder="'+ titleBooking + requiredPlaceholder +'" maxlength="400" '+requiredElement+'></textarea></div>';
            
            all_elem += elem_bookingOptionTextArea;
        }

        if (bookingOptionCheckBox >= 0){

            typeOption = 6;

           elem_bookingOptionCheckBox += elem_bookingHelperHtml;
            elem_bookingOptionCheckBox += '<div class="clearfix"><label>'+ titleBooking+requiredPlaceholder+'</label>';
            elem_bookingOptionCheckBox += '<div class="clearfix"><label class=""><input data-typeoption="'+typeOption+'" data-id="'+id+'" data-type="'+typeAssignValue+'" type="checkbox" id="'+ id +'" value="true" '+requiredElement+'>';
            elem_bookingOptionCheckBox += '</label>';

            all_elem += elem_bookingOptionCheckBox;
        }

        if (bookingOptionMediaPickerBoth > 0){

            typeOption = 7;
            typeMedia = data.bookingOptions[i].type;
            modeMedia = data.bookingOptions[i].mode;
            typeAssignValue = "com.izilabs.Lib.Enterprise.Bookings.BookingAssignValueMedia, com.izilabs.Lib.Enterprise";

            if(typeMedia == 1){

                elem_bookingOptionMediaPickerBoth += elem_bookingHelperHtml;
                elem_bookingOptionMediaPickerBoth += '<div class="clearfix"><label for="exampleInputFile">'+titleBooking+requiredPlaceholder+'</label></div>';
                elem_bookingOptionMediaPickerBoth += '<div class="clearfix"><div class="fileUpload btn btn-mod btn-border btn-medium btn-round"><i class="fa fa-picture-o"></i><span>Carregar Ficheiro</span><input data-typeMedia="'+typeMedia+'" data-modeMedia="'+modeMedia+'"  data-typeoption="'+typeOption+'" data-id="'+id+'" data-type="'+typeAssignValue+'" type="file" accept="image/*" class="upload fileChange" /></div>';
                elem_bookingOptionMediaPickerBoth +='<img class="previewFile prev'+id+'" src="#" alt="Image to load" />';

            } else if (typeMedia == 2){

                //("Investigar");

            } else if (typeMedia == 3){

                var mode = data.bookingOptions[i].mode;

                switch(mode){
                    case 1:
                          elem_bookingOptionMediaPickerBoth += elem_bookingHelperHtml;
                          elem_bookingOptionMediaPickerBoth += '<div class="clearfix"><label for="exampleInputFile">'+titleBooking+requiredPlaceholder+'</label></div>';
                          elem_bookingOptionMediaPickerBoth += '<audio controls class="previewFile prev'+id+'" src="" id="audio'+ id +'"></audio>';
                          elem_bookingOptionMediaPickerBoth += '<div class="clearfix"><div class="fileUpload btn btn-mod btn-border btn-medium btn-round"><i class="fa fa-microphone"></i><span>Carregar Ficheiro</span><input data-typeMedia="'+typeMedia+'" data-modeMedia="'+modeMedia+'" data-typeoption="'+typeOption+'" data-id="'+id+'" data-type="'+typeAssignValue+'" type="file" accept=".wav" class="upload fileChange" /></div>';
                        break;
                

                    case 2:
                        elem_bookingOptionMediaPickerBoth += elem_bookingHelperHtml;
                        elem_bookingOptionMediaPickerBoth += '<div class="clearfix"><label for="exampleInputFile">'+titleBooking+requiredPlaceholder+'</label></div>';
                        elem_bookingOptionMediaPickerBoth += '<div style="margin:10px;"> <audio controls src="" id="audio'+ id +'"></audio><br><a id="btn-start-recording'+id+'" onclick="startRecordingYGW('+id+')" class="fileUpload btn btn-mod btn-border btn-medium btn-round btnRecordAudio"><i class="fa fa-microphone"></i></a> <a id="btn-stop-recording'+id+'" onclick="stopRecordingYGW('+id+')" disabled class="fileUpload btn btn-mod btn-border btn-medium btn-round btnRecordAudio"><i class="fa fa-square"></i></a> <a id="btn-pause-recording'+id+'" onclick="restartRecordingYGW('+id+')" disabled class="fileUpload btn btn-mod btn-border btn-medium btn-round btnRecordAudio"><i class="fa fa-repeat"></i></a></div>';
                        elem_bookingOptionMediaPickerBoth += '<div class="fileUpload"><input data-typeMedia="'+typeMedia+'" data-modeMedia="'+modeMedia+'" data-typeoption="'+typeOption+'" data-id="'+id+'" data-type="'+typeAssignValue+'" value="audio" class="upload" /></div>';
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
                            
                        break;

                      
                    case 3:
                          elem_bookingOptionMediaPickerBoth += elem_bookingHelperHtml;
                          elem_bookingOptionMediaPickerBoth += '<div class="clearfix"><label for="exampleInputFile">'+titleBooking+requiredPlaceholder+'</label></div>';
                          elem_bookingOptionMediaPickerBoth += '<audio controls class="previewFile prev'+id+'" src="" id="audio'+ id +'"></audio>';
                          elem_bookingOptionMediaPickerBoth += '<div class="clearfix"><div class="fileUpload btn btn-mod btn-border btn-medium btn-round"><i class="fa fa-microphone"></i><span>Carregar Audio</span><input data-typeMedia="'+typeMedia+'" data-modeMedia="'+modeMedia+'" data-typeoption="'+typeOption+'" data-id="'+id+'" data-type="'+typeAssignValue+'" type="file" accept=".wav" class="upload fileChange" /></div>';
                          
                        break;
                 
                }



            }

            all_elem += elem_bookingOptionMediaPickerBoth;
            elem_bookingOptionMediaPickerBoth = "";

        }


  });

  

  elem_bookingMain.append(all_elem);

setTimeout(function(){

    $('.previewFile').css('display', "none");
    $(".fileChange").change(function(){
        readURL(this);
    });
},100)

               

}

/* Image Functions */
    function readURL(input) {
        console.log("readURL");
        console.log(input);
        prevID = input.getAttribute("data-id");
        if (input.files && input.files[0]) {
            
            var reader = new FileReader();
            $('.prev'+ prevID +'').css('display', "block");

            reader.onload = function (e) {
                 $('.prev'+ prevID +'').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

function view(img) {
    $('#thumb').Chocolat();    
}

 function requestBookingAssigns(){

    pageLoaderDiv.fadeIn();
    pageLoader.fadeIn("slow");

    getIdMethod = 8;
    requestWebService(getIdMethod, extraParameters);

 }

/* Function to get the bookings already sended */ 

 function getBookingAssigns(data){

 console.log("Get booking assign is working");
  elem_bookingAssingSection = "";
  console.log(data.bookingAssigns);

  if (data.bookingAssigns.length != 0){

   $.each (data.bookingAssigns, function(i, value){

      type = data.bookingAssigns[i].$type;
      idBookingAssign = data.bookingAssigns[i].id;
      idbooking = data.bookingAssigns[i].idBooking;
      dateCreation = data.bookingAssigns[i].dateCreation;
      dateUpdate = data.bookingAssigns[i].dateLastUpdate;
      responses = data.bookingAssigns[i].responses;
      idBookingStateAssign = data.bookingAssigns[i].idBookingStateAssign;

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

      elem_bookingAssingSection += "</dd>";
      
    }

  });

} else {

         elem_bookingAssingSection += "<div class='col-sm-12 mt-40 mb-40 align-center'><h4 class='uppercase'>Não Existem Items a mostrar</h4></div>";

     }
        
      $("#bookingAssigns").html(elem_bookingAssingSection);

    // Toggle
    var allToggles = $(".toggle > dd").hide();
    
    $(".toggle > dt > a").click(function(){
    
        if ($(this).hasClass("active")) {
        
            $(this).parent().next().slideUp("easeOutExpo");
            $(this).removeClass("active");
            
        }
        else {
            var current = $(this).parent().next("dd");
            $(this).addClass("active");
            $(this).parent().next().slideDown("easeOutExpo");
        }
        return false;
    });

    

 }

 function requestBookingAssignsUpdates(idBookingAssign){

    getIdMethod = 9;
    extraParameters['idBookingAssign'] = idBookingAssign;
    requestWebService(getIdMethod, extraParameters,idBookingAssign);

 }  


function getBookingAssignUpdates(data,idBookingAssign){
 console.log("getBookingAssignUpdates");

 elem_bookingUpdateInfo = "";

 if (typeof data.bookingAssignUpdates.$values !== 'undefined' && data.bookingAssignUpdates.$values.length > 0) {
    elem_bookingUpdateInfo += "<hr>";
    elem_bookingUpdateInfo += "<h5 class='font-alt'><strong>Atualizações</strong></h5>";
    $.each (data.bookingAssignUpdates.$values.reverse(), function(i, value){

        if (typeof data.bookingAssignUpdates.$values[i].idBookingAssignState === 'undefined' || data.bookingAssignUpdates.$values[i].idBookingAssignState === null){
          //Handle Err
          err += ('BookingAssignUpdate não definido');

      } else {

        idBookingAssignState = data.bookingAssignUpdates.$values[i].idBookingAssignState;
            
        $.each(statesAssigns,function(j, value){
            if (statesAssigns[j].id === idBookingAssignState){
                color2 = statesAssigns[j].color;
                colorState2 = color2.slice(2);
                textState2 = statesAssigns[j].text;
                elem_bookingUpdateInfo += "<strong Style='float: left;color:#"+ colorState2 +"'>"+ textState2 +"</strong><br>";
              }

        });
      }

        message = data.bookingAssignUpdates.$values[i].message;

        dateUpdate = data.bookingAssignUpdates.$values[i].dateUpdate;
        dateUpdate = moment.utc(dateUpdate);
        dateUpdate = dateUpdate.local();

        dateUpdateFormat = moment(dateUpdate).format("DD-MM-YYYY HH:mm");

        
        dateUpdateFrom = moment(dateUpdate).fromNow();

        if(message == null || message == ""){
            elem_bookingUpdateInfo += "<p style='float: left'><strong>Mensagem: </strong>Sem mensagem</p>";

        } else {
            elem_bookingUpdateInfo += "<p style='float: left'><strong>Mensagem: </strong>"+ message +"</p>";
        }
      
        elem_bookingUpdateInfo += "<span style='float: right'>"+ dateUpdateFrom +"</span><br>";
        elem_bookingUpdateInfo += "<span style='float: right'>"+ dateUpdateFormat +"</span><br>";
        elem_bookingUpdateInfo += "<hr>";
    });
}

$('#updates_'+idBookingAssign+'').html(elem_bookingUpdateInfo);
}


 


/* Function to validate the booking and send */ 

function validateBooking(){

    var $inputs = $('#booking :input');
    var failValidation = false;
    

    console.log($inputs);

    var responseArray = {};
    var responseFinal = {};
    var finalResponses = {};
    var resposeArrayF = [];
    
    var result,
        momentElem,
        idBookingOption,
        typeOption,
        type,
        typeMedia,
        modeMedia,
        fileNameValue,
        dataURLSplit;

        console.log($inputs);

    $inputs.each(function(i, item){

        $('#label'+ $inputs[i].dataset.id).remove();
        required = $inputs[i].required;
        result = $(this).val();
        
        if(required && result == ""){
            if($inputs[i].dataset.typeoption == 4) {
                $('#input'+$inputs[i].dataset.id+'').after('<label id="label'+$inputs[i].dataset.id+'" class="error" for="input'+$inputs[i].dataset.id+'">Tem que Selecionar uma opção</label>');
                failValidation = true;
            } else if($inputs[i].dataset.typeoption == 2) {
                $('#datetimepicker'+$inputs[i].dataset.id+'').after('<label id="label'+$inputs[i].dataset.id+'" class="error" for="input'+$inputs[i].dataset.id+'">Tem que preencher este campo</label>');
            failValidation = true;
            } else {
                $('#input'+$inputs[i].dataset.id+'').after('<label id="label'+$inputs[i].dataset.id+'" class="error" for="input'+$inputs[i].dataset.id+'">Tem que preencher este campo</label>');
            failValidation = true;
            }
            

        } else if(result != ""){

            responseArray["idBookingOption"] = $inputs[i].dataset.id;
            responseArray["$type"] = $inputs[i].dataset.type;
            responseArray["typeOption"] = $inputs[i].dataset.typeoption;
            responseArray["pattern"] = $inputs[i].pattern;
            responseArray["regexDesc"] = $inputs[i].dataset.regexdesc;
            responseArray["filename"] = "";

            


        if (!result.match(responseArray["pattern"])) {
            $('#input'+$inputs[i].dataset.id+'').after('<label id="label'+$inputs[i].dataset.id+'" class="error" for="input'+$inputs[i].dataset.id+'">'+responseArray["regexDesc"]+'</label>');
            failValidation = true;
        }

        if (responseArray["typeOption"] == 2){

            console.log("Estamos no typeOption 2");

            var datePicker = $inputs[i].dataset.datepicker;
            var timePicker = $inputs[i].dataset.timepicker;
        
             if($inputs[i].dataset.datepicker === "false" && $inputs[i].dataset.timepicker === "true"){

                

                result = '2017-03-26 ' + result;
                momentElem = moment.utc(result);
                result = momentElem._d;
                console.log(result);

             } else {

                momentElem = moment.utc(result);
                result = momentElem._d;
           

             }
           
        }

          if (responseArray["typeOption"] == 3 || responseArray["typeOption"] == 4 ){

              console.log("Estamos no typeOption 3 & 4");

            var minValue = $inputs[i].min;
            var maxValue = $inputs[i].max;
            result = Number(result);

            if (result < minValue || result > maxValue ){
                            failValidation = true;
                            $('#input'+$inputs[i].dataset.id+'').after('<label id="label'+$inputs[i].dataset.id+'" class="error" for="input'+$inputs[i].dataset.id+'">O valor tem que estar entre '+minValue+' - '+maxValue+'</label>');
            } else {
                 //result = Number(result);
            }
        }

        if (responseArray["typeOption"] == 6 ){
            console.log("Estamos no typeOption 6");

            result = (result == "true");
        }

         
        if (responseArray["typeOption"] == 7 ){

            console.log("Estamos no typeOption 7");

              var typeMedia = $inputs[i].dataset.typemedia;
              var modeMedia = $inputs[i].dataset.modemedia;
              var input_id = $inputs[i].dataset.id;

            switch(typeMedia){
                case "1":
                console.log("Estamos no Type Media 1");
                    type = "com.izilabs.Lib.Enterprise.Bookings.BookingAssignValueMediaPicture, com.izilabs.Lib.Enterprise";
                    
                    fileNameValue = "image."+$inputs[i].value.split('.')[1];
                    responseArray["filename"] = fileNameValue;
                    result = $('.prev'+ input_id +'').attr("src");
                    dataURLSplit = result.split(',')[1];
                    alert(dataURLSplit);
                    result = dataURLSplit;
                    break;

                case "2":
                    console.log("Estamos no Type Media 2");
                     break;
                case "3":
                    console.log("Estamos no Type Media 3");
                    type = "com.izilabs.Lib.Enterprise.Bookings.BookingAssignValueMediaAudio, com.izilabs.Lib.Enterprise";
                    fileNameValue = "audio.wav";
                    responseArray["filename"] = fileNameValue;
                    var audioSrc;

                    if(modeMedia == 2){
                         console.log("Estamos no mode 2");
                            audioSrc = $inputs[i].dataset.audio;
                    } else { 
                        console.log("Estamos no mode 1");
                            result = $('.prev'+ input_id +'').attr("src");
                            dataURLSplit = result.split(',')[1];
                            alert(dataURLSplit);
                            audioSrc = dataURLSplit;
                    }

                    
                    result = audioSrc;
                    break;
            }
        }
            responseArray["$type"] = type;
            responseArray["result"] = result;

            if (responseArray["typeOption"] == 7 ){
                resposeArrayF.push({
                    "$type" : responseArray["$type"],
                    "typeOption" : responseArray["typeOption"],
                    "result" : responseArray["result"],
                    "idBookingOption" : responseArray["idBookingOption"],
                    "filename" : responseArray["filename"]
                });
            } else {
                resposeArrayF.push({
                "$type" : responseArray["$type"],
                "typeOption" : responseArray["typeOption"],
                "result" : responseArray["result"],
                "idBookingOption" : responseArray["idBookingOption"]
                });
            }
        } else {
            console.log("Campo Vazio");
        }
    });

    if(failValidation != true){
        finalResponses["responses"] = resposeArrayF;
        extraParameters["responses"] = finalResponses;
        extraParameters["idBooking"] = idBooking;


        pageLoaderDiv.fadeIn();
        pageLoader.fadeIn("slow");
    
        requestWebService(11,extraParameters);
    }

}

/* Function to get Image byte array information */ 

    function getBase64Image(id_input){     

        var p;
        var canvas = document.createElement("canvas");
        var img1 = document.createElement("img");
        p=document.getElementsByClassName('prev'+ id_input +'').src;
        img1.setAttribute('src', p); 
        canvas.width = img1.width; 
        canvas.height = img1.height; 
        var ctx = canvas.getContext("2d"); 
        ctx.drawImage(img1, 0, 0); 
        var dataURL = canvas.toDataURL("image/*");
    
        var splitDataUrl = dataURL.split(',')[1];
            
        return splitDataUrl;
    } 


    function setDateTimePicker(id,datepicker_setting,timepicker_settign,format){

        console.log("Define DateTimePicker");

       var script = document.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = "setTimeout(function(){jQuery('#datetimepicker"+id+"').datetimepicker({ startDate:'+1971/05/01', format:'"+ format +"',datepicker:"+datepicker_setting+", timepicker: "+timepicker_settign+",theme:'dark',step:15 })}, 800);";
        document.body.appendChild(script);
       
    }


    
        


