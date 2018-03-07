/*                     List's Teste                       */

//Variables
var idList = "",
    nameList = "",
    nameGetLocation = "",
    start = "";


// Selectors
var elem_listTitle = $(".listTitle"),
    elem_list = "",
    all_list_elem = "";



//Variables URL
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

if (local == true){
    nameGetLocation = company_menu_ui;
    var nameList = getListName(nameGetLocation,idList);
} else { 
    nameGetLocation = company_menu_ui;
    var nameList = getListName(nameGetLocation,idList);
}   




var currentLocation = window.location;

if (currentLocation.href.indexOf("detail.html") > -1) {
    
    idResource = getUrlParameter('id');
    extraParameters["id"] = Number(idResource);

    idMethod = 16;
    initialRequest(idMethod);

} else {

    idList = getUrlParameter('id');
    idParent = getUrlParameter('idParent');

    extraParameters["idList"] = Number(idList);

    if(idParent != null){
    extraParameters['idParent'] = Number(idParent);
    }

    idMethod = 5;
    initialRequest(idMethod);
}


function getListparent(data){

    
    $.each(data.listResources, function(i, value){
            elem_list = "";
            all_list_elem = "";
            listStyle = data.listResources.listStyle;
            titleList = data.listResources.title;

            elem_listTitle.html(titleList);

            $.each(data.listResources.resources, function(i, value){

            listId = data.listResources.resources[i].id;
            listName = data.listResources.resources[i].name;
            listDescription = data.listResources.resources[i].description;
            listimage = data.listResources.resources[i].image;
            listContext = data.listResources.resources[i].context;
            listHasChildren = data.listResources.resources[i].hasChildren;
            listIdList = data.listResources.resources[i].idList;
            parent = false;
            

            if (listHasChildren == true){
                uri = uriList;
                parent = true;
                queryParameters = '?id='+listIdList+'&idParent='+ listId +'';
               
            } else {
                uri = uriListDetalhe;
                queryParameters = '?id='+listId+'';
            }

            if (i == 0){
                 elem_list += '<h2 class="section-title font-alt align-left mb-70 mt-50 mb-sm-40 fadeIn listParent">'+ titleList +'</h2>';

                 if(listStyle == 1){
                    elem_list += '<div class="row multi-columns-row">';
                 }

                 if(listStyle == 5){
                    elem_list += '<div class="row">';
                 }

            }


            if(listStyle == 1){

                /* <!-- Post Item --> */
                elem_list += '<div class="col-sm-6 col-md-4 col-lg-4 mb-md-50 wow fadeIn listParent" data-parent="'+ parent +'" data-wow-delay="0.1s" data-wow-duration="2s">';
                elem_list += '<div class="post-prev-img">';
                elem_list += '<a href="'+ uri + queryParameters +'"><img src="http://demo.staging.radiongo.com/backoffice/files/clients/yugoup00001/resources/'+ listimage +'" alt="" /></a>';
                elem_list += '</div>';
                elem_list += '<div class="post-prev-title font-alt"><a href="">'+ listName +'</a></div>';
                elem_list += '<div class="post-prev-text">'+ listDescription +'</div>';
                

                if(listHasChildren == true){
                     elem_list += '<div class="post-prev-more mb-30"><a href="'+uri+'?id='+listIdList+'&idParent='+ listId +'" class="btn btn-mod btn-gray btn-round">Ver mais<i class="fa fa-angle-right"></i></a></div>';
            }
                elem_list += '</div>';
                
            } else if(listStyle == 2){

                    if(i == 0){
                    startText = 'start';
                 } else {
                     startText = '';
                 }

                 elem_list += '<section style="padding:40px" class="page-section listParent" id="'+ startText +'"><div class="container relative">';
                 elem_list += "<div class='row'>";
                /* <!-- Post Item --> */
                elem_list += '<div class="col-md-7 mb-sm-40">';
                elem_list += '<a href="'+ uri +'?id='+listIdList+'&idParent='+ listId +'"><img style="width: 653px" src="http://demo.staging.radiongo.com/backoffice/files/clients/yugoup00001/resources/'+ listimage +'" alt="" /></a>';
                elem_list += '</div>';

                elem_list += '<div class="col-md-5 col-lg-4 col-lg-offset-1"><div class="text">';
                elem_list += ' <h3 class="font-alt mb-30 mb-xxs-10">'+ listName +'</h3>';
                elem_list += '<p>'+ listDescription +'</p>';
                

                if(listHasChildren == true){
                     elem_list += '<div class="mt-40 mb-30"><a href="'+uri+'?id='+listIdList+'&idParent='+ listId +'" class="btn btn-mod btn-border btn-round btn-medium" target="_blank">Ver</a></div>';
                }

                elem_list += '</div></div>';
                elem_list += '</div>';

                elem_list += '</div></section>';
                
            } else if(listStyle == 4){

                /* <!-- Post Item --> */
                elem_list += '<div class="col-sm-6 col-md-4 col-lg-4 mb-md-50 wow fadeIn listParent" data-parent="'+ parent +'" data-wow-delay="0.1s" data-wow-duration="2s">';
                elem_list += '<div class="post-prev-img">';
                elem_list += '<a href="'+ uri + queryParameters +'"><img src="http://demo.staging.radiongo.com/backoffice/files/clients/yugoup00001/resources/'+ listimage +'" alt="" /></a>';
                elem_list += '</div>';
                elem_list += '<div class="post-prev-title font-alt"><a href="">'+ listName +'</a></div>';
                elem_list += '<div class="post-prev-text">'+ listDescription +'</div>';
                

                if(listHasChildren == true){
                     elem_list += '<div class="post-prev-more mb-30"><a href="'+uri+'?id='+listIdList+'&idParent='+ listId +'" class="btn btn-mod btn-gray btn-round">Ver mais<i class="fa fa-angle-right"></i></a></div>';
            }
                elem_list += '</div>';
                
            } else if(listStyle == 5){
                
                 elem_list += '<div class="col-sm-4 mb-xs-30 wow fadeInUp listParent" data-wow-delay="0.2s">';
                 elem_list += "<div class='team-item'>";
                /* <!-- Post Item --> */
                elem_list += '<div class="team-item-image">';
                elem_list += '<img src="http://demo.staging.radiongo.com/backoffice/files/clients/yugoup00001/resources/'+ listimage +'" alt="" />';
                elem_list += '<div class="team-item-detail">';

                elem_list += '<h4 class="font-alt normal">'+ listName +'</h4>';
                elem_list += '<p>'+ listDescription +'</p>';
                            elem_list += '</div>';
                        elem_list += '</div>';
                    elem_list += '</div>';
                elem_list += '</div>';

            } else {

                   /* <!-- Post Item --> */
                elem_list += '<div class="col-sm-6 col-md-4 col-lg-4 mb-md-50 wow fadeIn listParent" data-parent="'+ parent +'" data-wow-delay="0.1s" data-wow-duration="2s">';
                elem_list += '<div class="post-prev-img">';
                elem_list += '<a href="'+ uri + queryParameters +'"><img src="https://demo.staging.yugoup.com/backoffice/files/clients/yugoup00001/resources/'+ listimage +'" alt="" /></a>';
                elem_list += '</div>';
                elem_list += '<div class="post-prev-title font-alt"><a href="">'+ listName +'</a></div>';
                elem_list += '<div class="post-prev-text">'+ listDescription +'</div>';
                

                if(listHasChildren == true){
                     elem_list += '<div class="post-prev-more mb-30"><a href="'+uri+'?id='+listIdList+'&idParent='+ listId +'" class="btn btn-mod btn-gray btn-round">Ver mais<i class="fa fa-angle-right"></i></a></div>';
            }
                elem_list += '</div>';


            }

            });
            elem_list += '</div>';
           
        
    });

     all_list_elem += elem_list;

    $("#listSection").append(all_list_elem);

    $('imagemList').trigger('refresh.owl.carousel');

}


function getListName (nameGetLocation,idList){
                
    $.each(nameGetLocation, function(i, item){
        if(nameGetLocation[i].id == idList){
            return nameGetLocation[i].text;
        }
    });
}

function requestListDetail(listId,listIdList){
    idMethod = 14;
    extraParameters['idList'] = listIdList;
    requestWebService(idMethod);

}

function getListDetail(data){
    console.log(data);
    console.log("Chegamos aos filhos");
    $('.listParent').fadeOut("slow", getListparent(data));
}

function getResourceData(data){
console.log("data");
console.log(data);
    

            resourceId = data.resource.id;
            resourceName = data.resource.name;
            resourceDescription = data.resource.description;
            resourceImage = data.resource.image;
            resourceContext = data.resource.context;
            resourceHasChildren = data.resource.hasChildren;
            resourceIdList = data.resource.idList;

            urlResource="http://demo.staging.yugoup.com/backoffice/files/clients/yugoup00001/resources/"

            $('.resourceName').html(resourceName);
            $('.resourceDescription').html(resourceDescription);
            $('.resourceImg').attr('src',urlResource + resourceImage);
            $('.resourceContext').html(resourceContext);
            
     

}