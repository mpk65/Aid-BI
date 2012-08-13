function(doc) {

//	var iid = doc.activity_funding_org_ref.toLowerCase();
	var iid = doc.activity_funding_org.toLowerCase();
	var label = doc.activity_funding_org;
	
	emit([iid,label,iid],
			1);
		}