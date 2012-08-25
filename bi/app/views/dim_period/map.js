function(doc) {
	// !code vendor/iati/atts.js
	if (doc['#type'] == 'iati-activity'){
	var a_identifier 		= att.regex(doc['iati-identifier']);
	var a_period			= a_identifier + "_period";
	var ads = ar.ray(doc['activity-date']);
	if (ads != null){
		var a_start_planned 			= att.dateOfType(ads,'start-planned');
		var a_start_actual  			= att.dateOfType(ads,'start-actual');
		var a_end_planned 				= att.dateOfType(ads,'end-planned');
		var a_end_actual 				= att.dateOfType(ads,'end-actual');
		
		emit([
		      a_period,
		      a_period,
		      a_start_planned,
		      a_start_actual,
		      a_end_planned,
		      a_end_actual
		      ],
		      1);
	}}}