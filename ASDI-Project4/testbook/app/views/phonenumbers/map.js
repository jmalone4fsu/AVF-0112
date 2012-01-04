function(doc) {  
  if (doc.type == "address") {  
    emit(doc.name, doc.gift);  
  }  
}  