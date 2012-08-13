// 	emit([fundorg_code, fundorg, identifier, doc.transaction_id, doc.rowid, doc._id, ttype, tdate],amount);  
// http://127.0.0.1:5984/iati_usd/_design/exhibit/_list/transaction_items_by_fundorg/fundorg_index?group_level=8&startkey=[%22cafod%22]&endkey=[%22cafod\ufff0%22]
// [fundorg_code, fundorg, identifier, transactionid, rowid, docid, ttype, tdate][tamount] 
// "key":[
//		"cafod"
//		"CAFOD"
//		"47122-0715-AGO-04C-X",
//		1254,
//		"47122-0715-AGO-04C-X-AO-C-2012-12-31-4810",
//		"db2976a2a65f27122f60eea84f117d54",
//		"C",
//		"12/31/12"],
//		"value":4669500}
function(head, req) {
	var row; var labels = ['fundorg_code','fundorg','label','id','rid','doc_id','ttype','tdate'];
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