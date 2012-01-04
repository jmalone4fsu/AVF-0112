function (doc) {
	if (doc._id.substr(0,7) === "dinner:") {
		emit(doc._id.substr(0,6), {
			"catagory": doc.catagory,
			"whofor": doc.whofor,
			"item": doc.item,
			"note": doc.note,
			"bought": doc.bought,
			"wrapped": doc.wrapped
		});
	}
}