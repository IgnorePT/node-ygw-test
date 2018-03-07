/******************************************************************************************/
/***                                 Declare Variables                                  ***/
/******************************************************************************************/


/******************************************************************************************/
/***                                 Cache Selectors                                    ***/
/******************************************************************************************/

var elem_name = $("#name"),
    elem_email = $("#email"),
    elem_gender = $("#gender"),
    elem_birthday = $("#elem_birthday"),
    elem_phone = $("#phone"),
    elem_quote = $("#quote");
    

$(document).ready(function () {

getUserData();

setTimeout(setProfileData,300);

});


function setProfileData(){

userName.html(name);
userBirthday.html(birthday);
userEmail.html(email);
userTelphone.html(phone);
userGender.html(arrayGender[gender]);
profilePicture = pictureUrl;

console.log(master);

if(master == 0) {
    socialAccountsAppend.append(facebookAccountHtmlMaster);
}

if(master == 1){
    pictureUrlArr = pictureUrl.split("?");
    socialAccountsAppend.html(googleAccountHtmlMaster);
    profilePicture = pictureUrlArr[0];
    
}

if(master == 2) {
    
    socialAccountsAppend.html(microsoftAccountHtmlMaster);
}

if(master == 3) {
    socialAccountsAppend.html(linkedinAccountHtmlMaster);
}


userPictureSrc.attr("src",profilePicture);
userPictureHref.attr("href",profilePicture);


userQuote.html(quote);




}

  function editprofile(){

            if(gender == 1){
                checkMale = "selected";
                checkFemale = "";
                checkUndefined = "";
            } else if (gender == 2){
                checkMale = "";
                checkFemale = "selected";
                checkUndefined = "";
            } else {
                checkMale = "";
                checkFemale = "";
                checkUndefined = "selected";
            }

            id = 1;

            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            if(dd<10){
                    dd='0'+dd
                } 
                if(mm<10){
                    mm='0'+mm
                } 

            today = yyyy+'-'+mm+'-'+dd;

            minDate = "1900-01-01"


            if(birthday == null || birthday == 'undefined'){

                valueBday = '';
                
            } else {
                
                valueBday = 'value="'+ birthdayValue +'"';
            }

 // var srcEdit = '<div class="wrapper.editprofile"> <form id="editProfileForm" class="form-editprofile"> <h2 class="form-signin-heading">Editar Perfil</h2> <input type="text" class="form-control" name="name" data-type="name" placeholder="'+name+'" value="'+name+'" required="" autofocus="" /> <input id="datepicker" type="date" class="form-control" name="birthday" data-type="birthday" value="'+ birthday +'" placeholder="Data Aniversario"/><input type="text" class="form-control" name="Telemovel" data-type="phoneNumber" placeholder="Telemovel" value="'+phone+'"/> <input type="text" class="form-control" name="Quote" data-type="quote" placeholder="Quote" value="'+quote+'"/> <div class="form-control-radio "><input type="radio" '+checkMale+' data-type="gender" name="gender" value="1"> Masculino <input type="radio" data-type="gender" '+checkFemale+' name="gender" value="2"> Femenino <input type="radio" data-type="gender" '+checkUndefined+' name="gender" value="3"> Não definido<br> </div> <a class="btn btn-lg btn-primary btn-block" onclick="editProfileData();">Guardar Alterações</a> </form> </div>';
  var formEdit = '<div class="wrapper.editprofile">' 
        +'<form id="editProfileForm" role="form" class="form form-editprofile">' 
        +'<h2 class="form-signin-heading">Editar Perfil</h2>'
        +'<div class="mb-20 mb-md-10">'
        +'<input type="text" class="input-md form-control" name="name" data-type="name" placeholder="'+name+'" value="'+name+'" required="" autofocus="" />'
        +'</div>'
        +'<div class="mb-20 mb-md-10">'
        +'<input  type="date" class="input-md form-control" name="birthday" data-type="birthday" '+valueBday+' max="'+today+'" min="'+minDate+'"/>'
        +'</div>'
        +'<div class="mb-20 mb-md-10">'
        +'<input type="text" class="input-md form-control" name="Telemovel" data-type="phoneNumber" placeholder="Telemovel" value="'+phone+'"/>' 
        +'</div>'
        +'<div class="mb-20 mb-md-10">'
        +'<input type="text" class="input-md form-control" name="Quote" data-type="quote" placeholder="Quote" value="'+quote+'"/>' 
        +'</div>'
        +'<div class="mb-30 mb-md-10">'
        +'<select data-type="gender">'
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

       
        

            $.magnificPopup.open({
                items: {
                    src: formEdit,
                    type: 'inline'
                },
                callbacks: {
                        open: function() {
                        // Will fire when this exact popup is opened
                        // this - is Magnific Popup object
                        jQuery('#datetimepicker1').datetimepicker({ startDate:'+1971/05/01', format:'d-m-Y',datepicker:true, timepicker: false,theme:'dark',step:15 })
                    }
                },
                closeBtnInside: true,
                closeOnBgClick:true,
                showCloseBtn:true,
                //closeMarkup: '<button title="%title%" class="mfp-close" style="position: absolute;top: 15px;right: 25.5em;"><i class="fa fa-times fa-fa-4x" aria-hidden="true"></i></button>',
            });
        }
        
        
    function editProfileData(){

        var accountDataObj = {};
            var $inputs = $('#editProfileForm :input');
            var editResult,
            momentElem;

        db.get('user').then(function (usersData) {
            console.log("*******************************usersData******************************");
            console.log(usersData);
            accountDataObj = usersData;

            console.log($inputs);

        $inputs.each(function(i, item){
            
            editResult = $(this).val();

            console.log("$inputs.dataset.type");
            console.log($inputs[i].dataset.type);
            console.log(editResult);

            if($inputs[i].dataset.type == "name"){
              accountDataObj["name"] = editResult;
            }

            if($inputs[i].dataset.type == "birthday"){
                momentElemB = moment.utc(editResult);
                console.log("momentElemB");
                console.log(momentElemB);
                accountDataObj["birthDate"] = momentElemB._d;
            }

            if($inputs[i].dataset.type == "quote"){
              accountDataObj["quote"] = editResult;
            }

             if($inputs[i].dataset.type == "phoneNumber"){
                 if (editResult != null || editResult != "" ){
                   editResult = Number(editResult)
                 }
              accountDataObj["phoneNumber"] = editResult;
            }

              if($inputs[i].dataset.type == "gender"){
                accountDataObj["gender"] = Number(editResult);
            }


        });

        console.log(accountDataObj);
        
        extraParameters["accountData"] = accountDataObj;
        console.log("extraParameters Account Data");
        console.log(extraParameters);

       requestWebService(18,extraParameters);

        });

    }

    function birthDateDefault(birthday){
            
    }
