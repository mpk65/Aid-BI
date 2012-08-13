function(doc) {

//	var iid = doc.activity_implementing_org_ref.toLowerCase();
//	var iid = doc.activity_implementing_org.toLowerCase();
	if (doc.activity_implementing_org != null){var iid = doc.activity_implementing_org.toLowerCase()}else{var iid = 'imporg'};

	var label = doc.activity_implementing_org;
	
	emit([iid,label,iid],
			1);
		}