function(head, req) {
	var row;
	send('{items:[');
	while(row = getRow()){
		send('{');
		for (var i in row.key){
			send('\"' + row.key[i] + '\":\"' + row.value[i] + '\",')
			};
			send('},')
		}; 
	send(']}')
}