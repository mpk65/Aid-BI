function(doc) {

//	var iid = doc.activity_reporting_org_ref.toLowerCase();
	var iid = doc.activity_reporting_org.toLowerCase();
	var label = doc.activity_reporting_org;
	
	emit([iid,label,iid],
			1);
		}