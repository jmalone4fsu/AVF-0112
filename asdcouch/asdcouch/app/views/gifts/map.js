function (doc) {
	if (doc._id.substr(0, 5) === "gift:"){
		emit(doc._id.substr(0,4), {
			"catagory": doc.catagory,
			"whofor": doc.whofor,
			"item": doc.item,
			"note": doc.note,
			"bought": doc.bought,
			"wrapped": doc.wrapped
		});
	}
};