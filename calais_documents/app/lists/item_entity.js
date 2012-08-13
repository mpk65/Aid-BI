function(head, req) {
	var row; var labels = ['id','title','label','relevance','description','kind','activity_rel','offset'];
	send('{\"types\"\: {\"entity\" \: {\"pluralLabel\"\: \"entities\"}},\"items\"\:[');
	while(row = getRow()){
		send('{\"type\"\:\"entity\",');
		for (var i in row.key){
			send('\"' + labels[i] + '\":\"' + row.key[i] + '\",')
			};
			send('\"entity_count\"\:' + row.value + '},')
		}; 
	send('{}]}')
}