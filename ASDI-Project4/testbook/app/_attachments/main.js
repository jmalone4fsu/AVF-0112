$db = $.couch.db("addressbook");

function refressAddressbook(){
	$("div#addressbook").empty();
	$db.view("addressbook/phonenumbers", {
		success: function(data){
			for (i in data.rows) {
				id=data.row[i].id;
				name = data.rows[i].key;
				phonenumber = data.rows[i].value;
				html = '<div class="address">' +
				'<span class="name">' + name + '</span>' +
				'<span class="phonenumber">' + phonenumber + '</span>' +
				'<a href="#" class="edit">edit</a> '+
				'<a href="#" class="delete">delete</a> '+
				'</div>';
				$("div#addressbook").append(html);
			}
	}});
}

$(document).ready(function() {
	$("#add a").click(function() { 
		refreshAddressbook();
	}
});