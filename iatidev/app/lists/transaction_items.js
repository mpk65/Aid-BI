// 	emit([identifier, doc.transaction_id, doc.rowid, doc._id, ttype, tdate],amount);  
// _list/transaction_items/activity_index?group_level=9&startkey=["47122-0715-AGO-04C-X"]&endkey=["47122-0715-AGO-04C-X\ufff0"]
// [identifier, transactionid, rowid, docid, ttype, tdate][tamount] 
// "key":["47122-0715-AGO-04C-X",1254,
//		"47122-0715-AGO-04C-X-AO-C-2012-12-31-4810",
//		"db2976a2a65f27122f60eea84f117d54",
//		"C",
//		"12/31/12"],
//		"value":4669500}
function(head, req) {
	var row; var labels = ['label','id','rid','doc_id','ttype','tdate'];
	send('{types\: {\"transaction\" \: {pluralLabel\: \"transactions\"}},items:[');
	while(row = getRow()){
		send('{\"type\"\:\"transaction\",');
		for (var i in row.key){
			send('\"' + labels[i] + '\":\"' + row.key[i] + '\",')
			};
			send('\"amount\"\:' + row.value + '},')
		}; 
	send(']}')
}