function(head, req) {
	var row; var labels = ['id','label','title','entity','reported_activity'];
	send('{\"types\"\: {\"report\" \: {\"pluralLabel\"\: \"reports\"}}'+
			',\"properties\"\: {' +
			'\"entity\" \: {\"valueType\"\: \"item\"}' +
			',\"reported_activity\" \: {\"valueType\"\: \"item\"}'
			+'},\"items\"\:[');
	while(row = getRow()){
		send('{\"type\"\:\"report\",');
		for (var i in row.key){
			var pipo = row.key[i];
			if (isArray(pipo)){
				send('\"' + labels[i] + '\":[');
				for (var j in pipo){send('\"' + pipo[j] + '\",')}
				send('"dummy"],');
			}else{
				send('\"' + labels[i] + '\":\"' + pipo + '\",')
			}};
			send('\"report_count\"\:' + row.value + '},')
		}; 
	send('{}]}')
}
