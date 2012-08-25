function(doc) {
	// !code vendor/iati/atts.js

	var a_country_code = att.regex(att.code(doc['recipient-country']));
	if (a_country_code == null)
	{
		a_country_code = att.regex(att.code(doc['recipient-region']));
	}

	var a_country_name = att.regex(att.name(doc['recipient-country']));
	if (a_country_name == null)
	{
		a_country_name = att.regex(att.name(doc['recipient-region']));
	}

	var h_country_code = att.hardcode(doc['recipient-country']);
	if (h_country_code == null)
	{
		h_country_code = att.hardcode(doc['recipient-region'])
	}
	
	a_country_code = att.up(a_country_code);
	a_country_name = att.up(a_country_name);
	
	emit([
	      a_country_code,
	      a_country_code,
	      a_country_name,
	      h_country_code.toLowerCase(),
	      a_country_name.substring(0,10)
	      ],
//	      fact
	      1);
}