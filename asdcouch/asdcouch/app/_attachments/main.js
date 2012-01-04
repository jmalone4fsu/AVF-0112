//--------------------------------------->
//-- main.js
// Author: Joseph Malone            
// Course: Advanced SDI
// Term  : 1111 Instructor: Rick Osborne
// Date  : November 09, 2011           
// ---------------------------------------->

$db = $.couch.db("jmaloneasd");


	function refreshList(){
		$('#nicelist').empty();
		$db.view("jmaloneasd/everything", {
			success: function(data) {
				$.each(data.rows, function(index, everything){
					id=data.rows[i].id;
					catagory = data.rows[i].key;
					whofor = data.rows[i].whofor;
					item = data.rows[i].item;
					note = data.rows[i].note;
					bought = data.rows[i].bought;
					wrapped = data.rows[i].wrapped;
					html = '<li>' +
					'<h2 class="catagory">' + catagory + '</h2>' +
					'<p class="whofor">' + whofor + '</p>'+
					'<p class="item">' + item + '</p>' +
					'<p class="note">' + note + '</p>' +
					'<p class="bought">' + bought + '</p>' +
					'<p class="wrapped">' + wrapped + '</p>' +
					'<p><a href="#" id="' + id + '" class="edit">Edit</a></p>' +
					'<p><a href="#" id="' + id + '" class="delete">Delete</a></p></li>';
					$("#nicelist").append(html)
				});
	            $("#nicelist").listview("refresh");
			}
		});
	}

	$(document).ready(function() {
		refreshList();
		
    $("#nicelist").click(function(event) {
        var $mytarget = $(event.target);
        
        if ($mytarget.is('a')) {
          id = $mytarget.attr("id");
          if ($mytarget.hasClass("edit")){
            if ($mytarget.hasClass("edit")) {
             $("button#add").show();
             $("form#update").remove();
             $db.openDoc(id, { success: function(doc) {
             addUpdateForm($mytarget.parent(), doc);
             }});
            }
          }
          
          if ($mytarget.hasClass("delete")){
            html = '&nbsp;<span class="deleteconfirm">Sure? <a href="#" id="' + id + '" class="dodelete">Yes</a> <a href="#" class="canceldelete">No</a></span>';
            $mytarget.parent().append(html);
          }
          
          if ($mytarget.hasClass("dodelete")){
            $db.openDoc(id, { success: function(doc) {
              $db.removeDoc(doc, { success: function(){
                $mytarget.parents("div.all").remove();
                $("#nicelist").listview("refresh");
              }})
            }});
          }
          
          if ($mytarget.hasClass("canceldelete")) {
            $mytarget.parents("span.deleteconfirm").remove();
          }
        }
    });
    $('div').live('pagehide', function(event, ui){
        var page = $(event.target);

        if(page.attr('data-cache') == 'never'){
        	window.location.reload();
        };
    });
    
    $("button#add").click(function(event) {
 	   $("form#update").remove();
 	   $("button#add").hide();
 	   addUpdateForm($("div#add"));
    });
    $("input.cancel").live('click', function(event) {
 	   $("button#add").show();
 	   $("form#update").remove();
 	   return false;
    });
    $("input.update").live('click', function(event) {
 	   var $mytarget = $(event.target);
 	   var $form = $mytarget.parents("form#update");
 	   var $doc = $form.data('existingDoc') || {};
 	   $doc.type = "all";
 	   $doc.whofor = $form.find("input#whofor").val();
 	   $doc.item = $form.find("input#item").val();
 	   $doc.note = $form.find("input#note").val();
 	   $doc.bought = $form.find("input#bought").val();
 	   $doc.wrapped = $form.find("input#wrapped").val();

 	   $db.saveDoc(
 			   $doc, { success: function(){
 				   $("button#add").show();
 				   $("form#update").remove();
 				   $("#nicelist").listview("refresh");
 				   $.mobile.changePage( "#asdi3", "slidedown", true, true );
 				   }
 		});
 	   return false;
    })



	$('#clrlist a').click(function (){
		$('#nicelist').empty();
	});
});
