function(doc) {
		var a_identifier 		= doc['iati-identifier'];
		var a_period			= a_identifier + "_period";
		var tally				= 0;
	    var a_start_planned = "1990";
	    var a_start_actual = "1990";
	    var a_end_planned = "1990";
	    var a_end_actual = "1990";

		if (doc['activity-date'] != null){
			for (d in doc['activity-date'])
				{		
			if (doc['activity-date'][d]['@iso-date'] != null && doc['activity-date'][d]['@type'] == "start-planned"){
				var a_start_planned = doc['activity-date'][d]['@iso-date'].split('-')[0]; tally = tally + 1;
				} 
			if (doc['activity-date'][d]['@iso-date'] != null && doc['activity-date'][d]['@type'] == "start-actual"){
				var a_start_actual = doc['activity-date'][d]['@iso-date'].split('-')[0]; tally = tally + 1;
				} 
			if (doc['activity-date'][d]['@iso-date'] != null && doc['activity-date'][d]['@type'] == "end-planned"){
				var a_end_planned = doc['activity-date'][d]['@iso-date'].split('-')[0]; tally = tally + 1;
				} 
			if (doc['activity-date'][d]['@iso-date'] != null && doc['activity-date'][d]['@type'] == "end-actual"){
				var a_end_actual = doc['activity-date'][d]['@iso-date'].split('-')[0]; tally = tally + 1;
				} 
			}
			}
	emit([
	    a_period,
	    a_period,
	    a_start_planned,
	    a_start_actual,
	    a_end_planned,
	    a_end_actual
		],
// fact
		tally);
}