function(doc) {
	// !code vendor/iati/atts.js
	
	if (doc['transaction'] != null){

	var a_identifier 		= att.regex(doc['iati-identifier']);

	var a_title 			= att.trunc(att.regex(doc['title']));
	if (a_title == null) {a_title = a_identifier};

	var a_description 		= att.trunc(att.regex(att.name(doc['description'])));
	if (a_description == null) {a_description = a_identifier};

	var a_status 			= att.name(doc['activity-status']);

	var a_country_code = att.code(doc['recipient-country']);
	if (a_country_code == null)
	{
		a_country_code = att.code(doc['recipient-region']);
		if (a_country_code == null)
		{
			a_country_code = 'Missing country mpk65';
		}
	}

	var a_report			= a_identifier + "_report";
	var a_period			= a_identifier + "_period";

	a_country_code = att.up(a_country_code);

	emit([
	      a_country_code,
	      a_identifier,
	      a_identifier,
	      a_title,
	      a_description,
	      a_status,
	      a_period,
//	      dim_keys
	      a_report
	      ],
//	      fact
	      1);
}}