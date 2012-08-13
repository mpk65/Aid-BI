function(doc, req) {
	var Mustache = require('vendor/couchapp/lib/mustache');
	var txt = doc.doc.info.document;
	var space = ' ';
	var title = doc._id;
	var docx = title + '.docx';
	var files_store = '/calais/_design/files/';
	var document_store = '/calais/_design/document/';
	var url = '<a href=\"' + files_store + docx + '\">' + '<img src=\"' + document_store + 'word.png' + '\" />' + '</a>';
	
	var activity_array = [];
	for (act in doc.doc.info.activities){
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
			identifier		: req.query.identifier,
			url 			: url,
			title 			: title, 
			document		: txt,
			activity_array	: activity_array
	};
	return Mustache.to_html(this.templates.context_entity, data );
}

