function(doc, req) {
	// doc is null http://guide.couchdb.org/draft/show.html#querying "show functions can also be called without a document ID at all"
	// the doc name "on" is used
	doc = null

	// !code config.js
	var Mustache = require('vendor/couchapp/lib/mustache');
	
	var template //= this.templates.slices;
	// every call to this.templates adds a template instead of replacing?
	if (req.query.template != null){
		if (req.query.template == 'slices'){template = this.templates.slices}
		if (req.query.template == 'facts'){template = this.templates.facts}
		}
		
	var limit = 300000;
	if (req.query.limit != null){limit = req.query.limit}

	var fact_boolean = false;
	var fact = 'transactions';
	if (req.query.fact != null){
		fact_boolean = true;
		fact 		 = req.query.fact}
	
	var slice = 'transaction';
	var slice_label = 'All'
	if (req.query.slice != null){
		slice = req.query.slice;
		slice_label = slice.replace('transaction_by_','')}

	var slice_activity = 'activity';
	if (req.query.slice != null){
		slice_activity = req.query.slice.replace('transaction','activity');
		}

	var data = {
			exhibit20		: '<script src="http://simile-widgets.org/exhibit/api/exhibit-api.js" type="text/javascript"></script>',
			exhibit22		: '<script src="http://api.simile-widgets.org/exhibit/2.2.0/exhibit-api.js" type="text/javascript"></script>',
			exhibit			: '<script src="http://static.simile.mit.edu/exhibit/api-2.2.0/exhibit-api.js" type="text/javascript"></script>',
			map				: '<script src="http://api.simile-widgets.org/exhibit/2.2.0/extensions/map/map-extension.js?gmapkey=AIzaSyAiWngg7-qHW2WRehO3bcC1pEx6bag3NoE" type="text/javascript"></script> ',
			chart			: '<script src="http://api.simile-widgets.org/exhibit/2.2.0/extensions/chart/chart-extension.js" type="text/javascript"></script>',
			time			: '<script src="http://api.simile-widgets.org/exhibit/2.2.0/extensions/time/time-extension.js" type="text/javascript"></script>',
			timeplot		: '<script src="http://api.simile-widgets.org/exhibit/2.2.0/extensions/timeplot/timeplot-extension.js"></script>',
			simileajax		: '<script src="http://simile.mit.edu/ajax/api/simile-ajax-api.js" type="text/javascript"></script>',
			zebrastyler		: '<script>var zebraStyler = function(item, database, tr) {if (tr.rowIndex % 2){tr.style.background = "Lightgrey";}else{tr.style.background = "WhiteSmoke";}}</script> ',
			onload			: 'onload()',
			onloadscript	: '<script>function onload(){console.log("onload:");}</script>',
			
			verbose			: req.query.verbose,
			comment			: 'true',
			
			activities_db	: config.store,
			activities_app  : config.app,
			activity_app	: config.app,
			
			documents_db	: config.store,
			documents_app   : config.app,
			document_app	: config.app,
			
			main_db			: config.store,
			main_app		: config.app,
			
			slices_schema		: 'slices_schema',
			facts_schema		: 'facts_schema',
			data				: 'data',

			with_specs			: 'with_specs',
			stub				: 'on',

			transactions_view	: 'fact_' + slice,
			transactions_list 	: 'item_' + slice,

			activities_view		: 'fact_' + slice_activity,
			activities_list		: 'item_' + slice_activity,
			
			periods_view		: 'dim_period',
			periods_list		: 'item_period',
			
			recipients_view		: 'dim_rcountry',
			recipients_list		: 'item_rcountry',
			country_coordinates	: 'coordinates_.js',

			recorgs_view		: 'dim_recorg',
			recorgs_list		: 'item_recorg',
			
			provorgs_view		: 'dim_provorg',
			provorgs_list		: 'item_provorg',

			sectors_view		: 'dim_sector',
			sectors_list		: 'item_sector',
			
			date_view			: 'dim_year',
			date_list			: 'item_year',

			fact_limit			: '&limit='+limit,
			fact_boolean		: fact_boolean,
			fact				: fact,
			slice				: slice,
			slice_label			: slice_label,
						
			the_end				: 'is here'
			};
	
	for (setting in config){data[setting] = config[setting]};
			
	return Mustache.to_html(template, data );
}
	