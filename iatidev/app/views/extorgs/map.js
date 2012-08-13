function(doc) {

//	var iid = doc.activity_extending_org_ref.toLowerCase();
//	var iid = doc.activity_extending_org.toLowerCase();
	if (doc.activity_extending_org != null){var iid = doc.activity_extending_org.toLowerCase()}else{var iid = 'extorg'};

	var label = doc.activity_extending_org;
	
	emit([iid,label,iid],
			1);
		}