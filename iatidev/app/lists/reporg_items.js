// ["gb-1", "Department for International Development", "gb-1"]
function(head, req) {
	var row; var labels = ['code','label','id'];
	send('{items:[');
	while(row = getRow()){
		send('{\"type\"\:\"reporg\",');
		for (var i in row.key){
			send('\"' + labels[i] + '\":\"' + row.key[i] + '\",')
			};
			send('\"count\"\:' + row.value + '},')
		}; 
	send(']}')
}