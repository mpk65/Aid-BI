function(doc, req) {
	var Mustache = require('vendor/couchapp/lib/mustache');
	
	var store = '/buza_iati/';
	var store_ = '/buza_iati/_design/activity/';
	var url = '<a href=\"' + store + doc._id + '\">' + '<img src=\"' + store_ + 'file_xml.png' + '\" />' + '</a>';
	
	var sector_array = [];
	for (prop in doc) {
		if (prop == 'sector'){sector_array.push({key:doc['sector']['#text'],value:doc['sector']['@significance']});}
	};
	
	var policy_array = [];
	for (k in doc['policy-marker']) {
		policy_array.push({key:doc['policy-marker'][k]['#text'],value:doc['policy-marker'][k]['@significance']});
	};

	var transaction_array = [];
	for (k in doc['transaction']) {
		transaction_array.push({key:doc['transaction'][k]['transaction-type']['#text']+'@'+doc['transaction'][k]['transaction-date']['@iso-date'],value:'€ '+doc['transaction'][k]['value']['#text']});
	};

	var recipient
	if (doc['recipient-country'] != null){recipient = doc['recipient-country']['#text']}else{recipient = doc['recipient-region']['#text']}
	
	var data = {
			update_time				: doc['@last-updated-datetime'],
			url						: url,
			title      				: doc['title'],
			identifier 				: doc['iati-identifier'],
			description				: doc['description']['#text'],
			status	   				: doc['activity-status']['#text'],
			start_planned			: doc['activity-date'][0]['@iso-date'],
			start_actual			: doc['activity-date'][1]['@iso-date'],
			end_planned				: doc['activity-date'][2]['@iso-date'],
			end_actual 				: doc['activity-date'][3]['@iso-date'],
			r_country  				: recipient,
			reporg	   				: doc['reporting-org']['#text'],
			fundorg	   				: doc['participating-org'][0]['#text'],
			extorg	   				: doc['participating-org'][1]['#text'],
			imporg	   				: doc['participating-org'][2]['#text'],
			collaboration_type		: doc['collaboration-type']['#text'],
			default_aid_type		: doc['default-aid-type']['#text'],
			default_finance_type	: doc['default-finance-type']['#text'],
			default_flow_type		: doc['default-flow-type']['#text'],
			default_tied_status		: doc['default-tied-status']['#text'],

			sector_array			: sector_array,
			transaction_array		: transaction_array,
			policy_array			: policy_array,
		};

	return Mustache.to_html(this.templates.activity_full, data );
}

