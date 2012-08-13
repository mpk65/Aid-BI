//view fact_reports_ reports containing a doc.info.activities array
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
				entity_array.push(doc[f].name + '_' + doc[f].instances[ent].offset);
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
	}}