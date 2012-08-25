function(doc) {
	// !code vendor/iati/atts.js
	ts = ar.ray(doc['transaction'])

	for (i in ts)
	{
		var t_type 			= ts[i]['transaction-type']['@code'];
		var t_date 			= ts[i]['value']['@value-date'].split("-")[0];

		emit([
		      t_date,
		      t_date,
		      t_type
		      ],
		      1);
	}
}