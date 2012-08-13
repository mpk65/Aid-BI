<!-- http://www.ensemble.ac.uk/wp/semantic-technologies/simile-exhibit/the-jsonx-importer -->
<!-- http://www.ensemble.ac.uk/simile/extensions/api/scripts/data/importers/jsonx-importer.js -->
<!-- link rel="exhibit/data" href="data.js" type="application/jsonx" ex:converter="converter"/ -->
<script type="text/javascript">
function converter(json) {
	console.log('converter here:');
  var items = json.items;
  for(var i=0;i<items.length;i++) {
			console.log(items[i]);
			});
  }
  console.log(json);
  return json;
}
</script>

