//['type','label','country','donor','start','end','startyear','endyear','code','amount']
function(head, req) {
	var row; var labels = ['startyear','endyear','donor','country','code','label','ttcode'];
	send('{items:[');
	while(row = getRow()){
		send('{\"type\"\:\"activities\",');
		for (var i in row.key){
			send('\"' + labels[i] + '\":\"' + row.key[i] + '\",')
			};
			send('\"amount\"\:' + row.value + '},')
		}; 
	send(']}')
}