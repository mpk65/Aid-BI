function(doc, req) {
	
	// remove properties not in final display
	var doc_array = [
	                 //"_id",
	                 //"_rev",
	                 //"_revisions",
	                 "iati_identifier",
	                 "title",
	                 "description",
	                 "date_end_actual",
	                 "date_end_planned",
	                 "date_start_actual",
	                 "date_start_planned",
	                 "status",
	                 "activity_recipient_country",
	                 "activity_recipient_region",
	                 "activity_recipient_location",
	                 "activity_reporting_org",
	                 "activity_funding_org",
	                 "activity_extending_org",
	                 "activity_implementing_org",
	                 "provider_org",
	                 "receiver_org",
	                 "aid_type",
	                 "finance_type",
	                 "flow_type",
	                 "item_sector",
	                 "item_value",
	                 "tied_status",
	                 "source_file",
	                 "activity_website",
	                 "contact_email",
	                 "contact_mailing_address",
	                 "contact_organisation",
	                 "contact_telephone",

	                 "related_activity_title",

	                 "activity_extending_org_ref",
	                 "activity_extending_org_type",

	                 "activity_funding_org_ref",
	                 "activity_funding_org_type",
	                 "activity_id",

	                 "activity_implementing_org_ref",
	                 "activity_implementing_org_type",

	                 "activity_lang",
	                 "activity_last_updated",

	                 "activity_recipient region_code",

	                 "activity_recipient_country_code",

	                 "activity_recipient_location_code",

	                 "activity_recipient_region_code",

	                 "activity_reporting_org_ref",
	                 "activity_reporting_org_type",

	                 "aid_type_code",

	                 "finance_type_code",

	                 "flow_type_code",

	                 "item_sector_code",
	                 "item_sector_vocabulary",

	                 "package_id",

	                 "provider_org_ref",
	                 "provider_org_type",

	                 "receiver_org_ref",
	                 "receiver_org_type",


	                 "status_code",

	                 "tied_status_code",

	                 "transaction.disbursement_channel_code",
	                 "transaction_date",
	                 "transaction_date_iso",
	                 "transaction_description",
	                 "transaction_id",
	                 "transaction_type",
	                 "transaction_type_code",

	                 "currency",
	                 "rowid",
	                 "amount_USD",
	                 "value_date"
	                 ];
	var null_array = [];
	var notnull_array = [];
	for (var i in doc_array){if (doc[doc_array[i]] == null){null_array.push(doc_array[i])}else{notnull_array.push(doc_array[i])}};
	send ('<table>');
	for (var i in notnull_array){send('<tr width="100%"><div id="'+ notnull_array[i] +'" class="pair"><td width="25%"><span class="key">' + notnull_array[i] + '</span></td><td><span class="value">' + doc[notnull_array[i]] + '</span></td></div></tr>')};
	for (var i in null_array){send('<tr width="100%"><div id="'+ null_array[i] +'" class="pair"><td width="25%"><span class="key">' + null_array[i] + '</span></td><td><span class="value">' + doc[null_array[i]] + '</span></td></div></tr>')};
	send ('</table>')
}