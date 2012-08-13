//view fact_reports_ reports containing a doc.info.activities array
function(doc) {
	var report_id = doc._id;
	if (doc.doc.info.activities != null){
		for (act in doc.doc.info.activities){
			emit(['NL-1-PPR-'+ doc.doc.info.activities[act],report_id],1);
		}}}
