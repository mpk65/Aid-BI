function(doc) {
	var fundorg = doc.activity_funding_org;
//	var fundorg_code = doc.activity_funding_org_ref.toLowerCase();
	var fundorg_code = doc.activity_funding_org.toLowerCase();
	var identifier = doc.iati_identifier;
	var ttype = doc.transaction_type_code;
	var amount = doc.amount_USD;
	var tdate = doc.transaction_date_iso;
	// http://code.google.com/p/simile-widgets/wiki/Timeline_EventSourceJSON_jsDate
	var ttdate = new Date('20' + tdate.split("/")[2],tdate.split("/")[0],tdate.split("/")[1],00,00,00,0);

	emit([fundorg_code,fundorg,identifier, doc.transaction_id, doc.rowid, doc._id, ttype, ttdate],amount);  
}