function(doc) {

	var iid = doc.activity_recipient_country_code.toLowerCase();
	var label = doc.activity_recipient_country;
	
	emit([iid,label,iid],
			1);
		}