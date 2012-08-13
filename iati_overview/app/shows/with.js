function(doc, req) {
	var Mustache = require('vendor/couchapp/lib/mustache');
	var specs = doc;
	
	var template = this.templates.dimensions;
	if (req.query.template != null){
		if (req.query.template == 'overview'){template = this.templates.overview}
		if (req.query.template == 'dimensions'){template = this.templates.dimensions}
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

	var data = {
			doc 			: doc,
			req 			: req,

			exhibit			: specs.exhibit,
			zebrastyler		: specs.zebrastyler,
			jquery			: specs.jquery,
			onload			: specs.onload,
			onloadscript	: specs.onloadscript,

			shortcut_icon	: specs.shortcut_icon,
			stylesheet 		: specs.stylesheet,
			exhibit_logo	: specs.exhibit_logo,
			
			verbose			: req.query.verbose,
			comment			: 'true',
			
			activities_db	: specs.activities_db,
			activities_app  : specs.activities_app,
			activity_app	: specs.activity_app,
			
			documents_db	: specs.documents_db,
			documents_app   : specs.documents_app,
			document_app	: specs.document_app,
			
			reference_db	: specs.reference_db,
			reference_app	: specs.reference_app,
			geo_app			: specs.geo_app,
			
			main_db			: specs.main_db,
			main_app		: specs.main_app,

			transactions_view	: 'fact_' + slice,
			transactions_list 	: 'item_' + slice,

			activities_view		: 'fact_activity',
			activities_list		: 'item_activity',
			
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
			
	return Mustache.to_html(template, data );
}
	