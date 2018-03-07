/* Variables */

var listName = [],
 listDescription = [],
 listImage = [],
 listContext = [],
 listID = [],
 parentID = [],
 hasChildrenInfo = [];

var listChildName = [],
 listChildHasChildren = [],
 listChildParentID = [],
 listChildListID = [];

var getListsURL = "http://demo.staging.yugoapp.com/webservices/v1.0/Service.svc/features/resources/getList?publicKey=yugoapp00001&lang=pt-PT&idList=86" ;



var elem_firstCategory = $('#firstCategory'),
 elem_secondCategory = $('#secondCategory'),
 elem_mini = $('.tab-pane'),
 dynamic_li = "",
 dynamic_body = "",
 dynamic_th = "";


/*=======================================================================*/ 

  $(document).ready(function () { 

        $.ajax({
             url: getListsURL, 
            dataType: "json",
            xhrFields: {
                withCredentials: false
            },
            headers: {
            },
            method: 'GET', 
            success: function (data) { 
                 $.each (data.resources, function(i, item) {
                    listName[i] = data.resources[i].name;
                    listDescription[i] = data.resources[i].description;
                    listImage[i] = data.resources[i].image;
                    listContext[i] = data.resources[i].context;
                    listID[i] = data.resources[i].idList;
                    parentID[i] = data.resources[i].id;
                    hasChildrenInfo[i] = data.resources[i].hasChildren;

                    if (i == 0){
                        var active = "class = active";
                    } else {
                        active = "";
                    }

                    

                     elem_firstCategory.append('<li '+ active +'><a href="#mini-'+ i +'" data-toggle="tab">'+ listName[i] +'</a></li>');
                     elem_mini.attr('id', 'mini'+ i);

                     if (hasChildrenInfo[i] == true) {
                         //getListChilds (listID[i], parentID[i]);
                     } 
                     console.log(listName[i]);
                    
                     
                 });
               

            
            
            },
            error: function(){
    
            }

        });

                
  }); 

  function getLists(){
  }

  function updateLists(){

  }

 /* function getListChilds(listID, parentID){
      
       var getChildListsURL = "http://demo.staging.yugoapp.com/webservices/v1.0/Service.svc/features/resources/getList?publicKey=yugoapp00001&lang=pt-PT&idList="+ listID +"&idParent="+ parentID;

        return $.ajax({
            url: getChildListsURL, 
            dataType: "json",
            xhrFields: {
                withCredentials: false
            },
            headers: {
            },
            method: 'GET', 
            success: function (data) { 
                level = 0;
                $.each (data.resources, function(i, item) {
                   listChildName[i] = data.resources[i].name;
                   listChildHasChildren[i] = data.resources[i].hasChildren;
                   listID[i] = data.resources[i].idList;
                   parentID[i] = data.resources[i].id;

                   level ++;
                   console.log(level);
                   dynamic_body += " <tbody>";
                   if(level == 1){
                       dynamic_th += "<thead><tr><th><th>"+ listChildName[i] +"</th><th style='width:20%;'></th></tr></thead>";
                   } else if (level == 2) {
                       dynamic_body += "<tr><td>"+ listChildName[i] +"<div class='small'> with Nettle Purée, Black Trumpets & Smoked Yolk</div></td><td class='align-right'></td></tr>";
                   };
                   dynamic_body += " </tbody></table>";

                    if (hasChildrenInfo[i] == true) {
                         getListChilds (listID[i], parentID[i]);
                     } 
                });
                elem_secondCategory.append(dynamic_th, dynamic_body);
                elem_secondCategory.append(dynamic_body);
            }
        });
  }*/