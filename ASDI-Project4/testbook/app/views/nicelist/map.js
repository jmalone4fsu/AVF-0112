function(doc) {  
  if (doc.type == "gift") {  
    emit(doc.name, {
		"item": doc.gift,
		"bought": doc.bought,
		"cat": doc.cat
	});
}
}