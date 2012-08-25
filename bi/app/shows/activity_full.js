function(doc, req) {
	var Mustache = require('vendor/couchapp/lib/mustache');
	// !code vendor/iati/atts.js
	// !code config.js
		
	var identifier 				= att.regex(doc['iati-identifier']);
	var title 					= att.regex(doc['title']); 					if (title == null) 		{title = identifier};
	var description 			= att.regex(att.name(doc['description'])); 	if (description == null){description = identifier};
	var status 					= att.name(doc['activity-status']);
	var reporg 					= att.name(doc['reporting-org']);
	var collaboration_type 		= att.name(doc['collaboration-type']);
	var default_aid_type 		= att.name(doc['default-aid-type']);
	var default_finance_type 	= att.name(doc['default-finance-type']);
	var default_flow_type 		= att.name(doc['default-flow-type']);
	var default_tied_status 	= att.name(doc['default-tied-status']);
	var website 				= att.name(doc['activity-website']);
	
	var ads = ar.ray(doc['activity-date']); 
	var start_planned 			= att.dateOfType(ads,'start-planned');
	var start_actual  			= att.dateOfType(ads,'start-actual');
	var end_planned 			= att.dateOfType(ads,'end-planned');
	var end_actual 				= att.dateOfType(ads,'end-actual');

	var pos = ar.ray(doc['participating-org']); 
	var fundorg 	= att.nameOfType(pos,'Funding');
	var extorg 		= att.nameOfType(pos,'Extending');
	var imporg 		= att.nameOfType(pos,'Implementing');
		
	var sector_array = [];
	var ss = ar.ray(doc['sector']);
	for (i in ss) {
		sector_array.push({
			key		:	att.name(ss[i]),
			value	:	att.sigf(ss[i])});
	};
	
	var policy_array = [];
	var ps = ar.ray(doc['policy-marker']);
	for (i in ps) {
		policy_array.push({
			key		:	att.name(ps[i]),
			value	:	att.sigf(ps[i])});
	};

	var transaction_array = [];
	var ts = ar.ray(doc['transaction']);
	for (k in ts) {
		transaction_array.push({
			key		:	trans.type(ts[k]) + '@' + trans.date(ts[k]),
			value	:	'€ ' + trans.value(ts[k])});
	};

	var recipient = att.name(doc['recipient-country']);
	if (recipient == null){recipient = att.name(doc['recipient-region']);}
	
	var data = {
			store					: config.store,
			app						: config.app,
			document_view 			: 'context_entity',			// view for single report
			activities_view 		: 'fact_report_activities', // related activities of a report ajaxed into single report view
			doc_src					: '/' + config.store + '/' + doc._id,
			img_src					: '/' + config.store + '/_design/' + config.app + '/' + 'file_xml.png',

			update_time				: doc['@last-updated-datetime'],
			title      				: title,
			identifier 				: identifier,
			description				: description,
			status	   				: status,
			start_planned			: start_planned,
			start_actual			: start_actual,
			end_planned				: end_planned,
			end_actual 				: end_actual,
			r_country  				: recipient,
			reporg	   				: reporg,
			fundorg	   				: fundorg,
			extorg	   				: extorg,
			imporg	   				: imporg,
			collaboration_type		: collaboration_type,
			default_aid_type		: default_aid_type,
			default_finance_type	: default_finance_type,
			default_flow_type		: default_flow_type,
			default_tied_status		: default_tied_status,
			website					: website,

			sector_array			: sector_array,
			transaction_array		: transaction_array,
			policy_array			: policy_array
		};

	for (setting in config){data[setting] = config[setting]};

	return Mustache.to_html(this.templates.activity_full, data );
}

