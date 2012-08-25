function(doc) {
	// !code vendor/iati/atts.js

	var a_identifier 			= att.regex(doc['iati-identifier']);
	var a_title 				= att.trunc(att.regex(doc['title'])); if (a_title == null) {a_title = a_identifier};
	var a_description 			= att.trunc(att.regex(att.name(doc['description']))); if (a_description == null) {a_description = a_identifier};
	var a_status 				= att.name(doc['activity-status']);
	var a_country_code 			= att.code(doc['recipient-country']);
	if (a_country_code == null){a_country_code = att.code(doc['recipient-region']);
	if (a_country_code == null){a_country_code = 'Missing country mpk65';}
	}
	var a_report			= a_identifier + "_report";
	var a_period			= a_identifier + "_period";

	ts = ar.ray(doc['transaction'])
	for (i in ts)
	{t_provorg_code = att.code(ts[i]['provider-org']);if (t_provorg_code == null){t_provorg_code = att.name(doc['reporting-org'])}
	
	a_country_code = att.up(a_country_code);

	emit([t_provorg_code,
	      a_identifier,
	      a_identifier,
	      a_title,
	      a_description,
	      a_status,
	      a_period,
	      a_country_code,
	      a_report
	      ],
	      1);
	}
}
