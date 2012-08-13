function(doc) {
	var country = doc.activity_recipient_country;
	var country_code = doc.activity_recipient_country_code.toLowerCase();
	var identifier = doc.iati_identifier;
	var ttype = doc.transaction_type_code;
	var amount = doc.amount_USD;
	var tdate = doc.transaction_date_iso;
	// http://code.google.com/p/simile-widgets/wiki/Timeline_EventSourceJSON_jsDate
	var ttdate = new Date('20' + tdate.split("/")[2],tdate.split("/")[0],tdate.split("/")[1],00,00,00,0);

	emit([country_code,country,identifier, doc.transaction_id, doc.rowid, doc._id, ttype, ttdate],amount);  
}