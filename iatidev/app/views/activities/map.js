function(doc) {

	var iid = doc.iati_identifier;
	var label = doc.title;
	var country = doc.activity_recipient_country;
	var country_code = doc.activity_recipient_country_code.toLowerCase();
//	var reporg_code = doc.activity_reporting_org_ref.toLowerCase();
	var reporg_code = doc.activity_reporting_org.toLowerCase();
//	var fundorg_code = doc.activity_funding_org_ref.toLowerCase();
	var fundorg_code = doc.activity_funding_org.toLowerCase();

//	var extorg_code = doc.activity_extending_org_ref.toLowerCase();
//	var extorg_code = doc.activity_extending_org.toLowerCase();
	if (doc.activity_extending_org != null){var extorg_code = doc.activity_extending_org.toLowerCase()}else{var extorg_code = 'extorg'};
	
//	var imporg_code = doc.activity_implementing_org_ref.toLowerCase();
//	var imporg_code = doc.activity_implementing_org.toLowerCase();
	if (doc.activity_implementing_org != null){var imporg_code = doc.activity_implementing_org.toLowerCase()}else{var imporg_code = 'imporg'};

	imporg_code = iid;
	
	var sdate = doc.date_start_actual;
	var edate = doc.date_end_actual;
	var startyear = '20' + sdate.split("/")[2];
	var endyear = '20' + edate.split("/")[2];
	
	emit([country_code,reporg_code,fundorg_code,extorg_code,imporg_code,label,startyear,endyear,iid],
			1);
		}