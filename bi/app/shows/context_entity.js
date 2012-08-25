function(doc, req) {
	var Mustache = require('vendor/couchapp/lib/mustache');
	// !code config.js
	
	var txt = doc.doc.info.document;
	var space = ' ';
	var title = doc._id;

	var activity_array = [];
	for (act in doc.doc.info.activities){
		// assumption prefix has to be generalised
		activity_array.push('NL-1-PPR-'+ doc.doc.info.activities[act]);
	}

	for(f in doc){
		if (f.indexOf("http") != -1){
			var type   = doc[f]['_type'];
			for (ent in doc[f].instances){

				var entity = doc[f].instances[ent]['exact'];
				var prefix = doc[f].instances[ent]['prefix'];
				var suffix = doc[f].instances[ent]['suffix'].substring(0,3);
				var offset = doc[f].instances[ent]['offset'];
				var pattern = prefix + space + entity + space + suffix;

				txt = txt.replace(entity + suffix,
						
						'<a name=\"' +
						offset + 
						'\">' +
						'<div class=\"entity\" '+
						'title = \"' +
						type +
						'\">' +
						entity +
						'</div>'+
						'</a>' +
						suffix
						);
			}}
	};
	var data = {
			store			: config.store,
			app				: config.app,
			activity_view	: 'activity_full',			// view for single activity
			doc_src 		: config.files_store + title + '.docx',
			img_src 		: '/' + config.store + '/_design/' + config.app + '/' + 'word.png',

			identifier		: req.query.identifier,
			title 			: title, 
			document		: txt,
			activity_array	: activity_array
	};

	for (setting in config){data[setting] = config[setting]};

	return Mustache.to_html(this.templates.context_entity, data );
}

