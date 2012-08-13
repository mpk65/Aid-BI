function(doc) {
		var a_identifier 		= doc['iati-identifier'];
		var a_title 			= doc['title'];
		var a_description 		= doc['description']['#text'];
		var a_status 			= doc['activity-status']['#text'];

		if (doc['recipient-country'] != null){
			var a_country_code 	= doc['recipient-country']['@code']} else {
		 	var a_country_code 	= doc['recipient-region']['@code']}
		
		var a_report			= a_identifier + "_report";
		var a_period			= a_identifier + "_period";
		
		
	emit([
	    a_identifier,
	    a_identifier,
	    a_title,
	    a_description,
	    a_status,
	    a_period,
// dim_keys
		a_country_code,
	    a_report
		],
// fact
		1);
}