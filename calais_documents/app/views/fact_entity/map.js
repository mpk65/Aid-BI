// view fact_entity
function(doc) {
	for(f in doc){
		if (f.indexOf("http") != -1){
			//if (doc[f]._type == "Country" || doc[f]._type == "Organization"){
				for (ent in doc[f].instances){
					var detection = doc[f].instances[ent].detection;

				emit([
					  doc[f].name + '_' + doc[f].instances[ent].offset,
					  doc._id,
				      doc[f].name,
				      doc[f].relevance, 
				      detection.substring(1,detection.length - 2).replace(']','<div class=exact>').replace('[','</div>'),
				      doc[f]._type,
					  doc._id.substring(0,5),
					  doc[f].instances[ent].offset
				      ],
				      
				      1)}}
		//}
	};
}