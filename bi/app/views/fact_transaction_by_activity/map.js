function(doc) {
	// !code vendor/iati/atts.js

	var a_identifier 		= att.regex(doc['iati-identifier']);

	var a_reporg_name = att.name(doc['reporting-org']);
	var a_reporg_code = att.code(doc['reporting-org']);

	var a_country_code = att.code(doc['recipient-country']);
	if (a_country_code == null)
	{
		a_country_code = att.code(doc['recipient-region'])
	}

	var a_country_name = att.name(doc['recipient-country']);
	if (a_country_name == null)
	{
		a_country_name = att.name(doc['recipient-region']);
	}
	
	a_country_code = att.up(a_country_code);
	a_country_name = att.up(a_country_name);
	
	sectors = ar.ray(doc['sector'])
	ts = ar.ray(doc['transaction'])

	for (i in ts)
	{
		var t_type 			= trans.type(ts[i]);
		var t_date 			= trans.year(trans.date(ts[i]));
		var t_amount 		= trans.value(ts[i]);
		var t_amount_i 		= parseInt(t_amount);

		t_provorg_name = att.name(ts[i]['provider-org']);
		t_provorg_code = att.code(ts[i]['provider-org']);  

		if (t_provorg_name == null)
		{
			t_provorg_name = a_reporg_name;
		}

		if (t_provorg_code == null)
		{
			t_provorg_code = a_reporg_code
		}

		t_recorg_name = att.name(ts[i]['receiver-org']);
		t_recorg_code = att.code(ts[i]['receiver-org']);  

		if (t_recorg_name == null)
		{
			t_recorg_name = a_country_name
		}

		if (t_recorg_code == null)
		{
			t_recorg_code = a_country_code
		}

		for (j in sectors)
		{
			t_sector_code = att.code(sectors[j]);
			t_sector_name = att.name(sectors[j]);

			emit([
//dim_keys
a_identifier,
t_sector_code,
t_recorg_name, // replace with code when ambiguities are removed
t_provorg_code,
a_country_code,
//invariant
a_identifier +'_'+ t_type +'_'+ t_date,
a_identifier +'_'+ t_type +'_'+ t_date,
t_type,
t_date
],
//fact
t_amount_i);
		}}}