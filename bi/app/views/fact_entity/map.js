function(doc) {
	for(f in doc){
		if (f.indexOf("http") != -1){
			var type = doc[f]._type;
			if (type != 'URL'){
			for (ent in doc[f].instances){
				var detection = doc[f].instances[ent].detection;
				if (detection != null){detection = detection.replace(/\n/gm,'');
				var entity_name = doc[f].name;
				if (entity_name != null){
					entity_name = entity_name.replace(/\n/gm,'');
					var entity_id	= entity_name + '_' + doc[f].instances[ent].offset;

					emit([
					      entity_id,
					      doc._id,
					      entity_name,
					      doc[f].relevance, 
					      detection.substring(1,detection.length - 2).replace(']','<div class=exact>').replace('[','</div>'),
					      doc[f]._type,
					      doc._id.substring(0,5),
					      doc[f].instances[ent].offset
					      ],

					      1)}}}}
		//}
	};
}}