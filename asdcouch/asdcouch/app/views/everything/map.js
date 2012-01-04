function(doc) {  
	if (doc.type == "all") {  
		emit(doc.whofor, {
			"gift": doc.item,
			"desc": doc.note,
			"bought": doc.bought,
			"wrapped": doc.wrapped,
			"cat": doc.catagory
		});
	}
}