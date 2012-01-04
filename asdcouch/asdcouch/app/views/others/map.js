function (doc) {
	if (doc._id.substr(0,6) === "other:") {
		emit(doc._id.substr(0,5), {
			"catagory": doc.catagory,
			"whofor": doc.whofor,
			"item": doc.item,
			"note": doc.note,
			"bought": doc.bought,
			"wrapped": doc.wrapped
		});
	}
}