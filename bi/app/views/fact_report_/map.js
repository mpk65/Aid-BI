function(doc) {
	var report_id = doc._id;
	var entity_array = [];
	var activity_array = [];

	for (act in doc.doc.info.activities){
		activity_array.push('NL-1-PPR-'+ doc.doc.info.activities[act]);
	}

	for(f in doc){
		if (f.indexOf("http") != -1){
			for (ent in doc[f].instances){
				var entity_name = doc[f].name;
				if (entity_name != null){
					entity_name = entity_name.replace(/\n/gm,'');
					var entity_id	= entity_name + '_' + doc[f].instances[ent].offset;
					entity_array.push(entity_id);
				}

			}
		}

		if (doc.doc.info.activities != null){

			emit([
			      report_id,
			      report_id,
			      doc._id,
			      entity_array,
			      activity_array
			      ],

			      1);
		}
	}
}