/******************************************************************************************/
/***                                 Ad Campaigns                                       ***/
/******************************************************************************************/

var elem_imageCampaign = $('.mfp-img');

var elem_adImage = $('#ad_img'),
    elem_adContainer = $('#adcontainer'),
    elem_adLink = $('#adlink'),
    elem_floater = $('.floater');

function getAdCampaingn(data){

    console.log(data.advertisingCampaign);
    typeResource= 3;

    if (data.advertisingCampaign == null || data.advertisingCampaign == "undefined"){
        // Nâo existem campanhas
        console.log("Não existem campanhas");
    } else {

        $.each(data.advertisingCampaign, function(i, value){

            idCampaign = data.advertisingCampaign.id;
            advertisingType = data.advertisingCampaign.advertisingType;
            imagePath = data.advertisingCampaign.imagePath;
            link = data.advertisingCampaign.link;
        
          if (advertisingType == 1){

              elem_adImage.attr('src', ''+urlResolver(typeResource,imagePath)+'');
              elem_adContainer.css('visibility','visible').slideDown();

              elem_adLink.click(function(){
                        window.open(link, '_blank');
                        idMethod = 15;
                        extraParameters["idAction"] = 13;
                        extraParameters["context"] = idCampaign;

                        requestWebService(idMethod,extraParameters);
                    });

            }

          if (advertisingType == 2){

               $.magnificPopup.open({
                        type:'image',
                        closeOnBgClick: false,
                        showCloseBtn: false,
                        enableEscapeKey: false,
                        mainClass: 'mfp-fade',
                        items: {
                            src: urlResolver(typeResource,imagePath),
                        },
                        callbacks: {
                        open: function() {
                            setTimeout(function(){
                                elem_floater.magnificPopup('close');
                            },fullbannerTimer); // 10000 == 10seconds
                            }
                        },
                        
                    }, 0 );
                    
                   elem_imageCampaign.click(function(){
                        window.open(link, '_blank');
                        idMethod = 15;
                        extraParameters["idAction"] = 13;
                        extraParameters["context"] = idCampaign;

                        requestWebService(idMethod,extraParameters);
                    });

          }

               
        }); 

         setTimeout(function(timer){
                  console.log("Hide Ad");
                  elem_adContainer.slideToggle();
              }, 10000);
    }
}
