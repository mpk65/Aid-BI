//view fact_reports_ reports containing a doc.info.activities array
function(doc) {
	var report_id = doc._id;

	var entity_array = [];
	var activity_array = [];

	if (doc.doc.info.activities != null){
		for (act in doc.doc.info.activities){
			activity_array.push('NL-1-PPR-'+ doc.doc.info.activities[act]);


			for(f in doc){
				if (f.indexOf("http") != -1){
					for (ent in doc[f].instances){
						entity_array.push(doc[f].name + '_' + doc[f].instances[ent].offset);


						emit([
						      doc._rev,
						      doc._rev,
						      doc._rev,
						      doc[f].name + '_' + doc[f].instances[ent].offset,
						      'NL-1-PPR-'+ doc.doc.info.activities[act]
						      ],

						      1);
					}
				}
			}
		}
	}
}