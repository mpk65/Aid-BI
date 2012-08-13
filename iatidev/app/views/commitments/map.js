function(doc) {

	var ttcode = doc.transaction_type_code;
	var sdate = doc.date_start_actual;
	var edate = doc.date_end_actual;
	var aamount = doc.amount_USD;
	var country = doc.activity_recipient_country;
	var donor = doc.activity_reporting_org;
	// http://simile-widgets.org/wiki/Timeline_EventSources#Date_Time_Formats
	var sstart = new Date(Date.UTC('20' + sdate.split("/")[2],sdate.split("/")[0],sdate.split("/")[1],00,00,00,0));
	var eend = new Date(Date.UTC('20' + edate.split("/")[2],edate.split("/")[0],edate.split("/")[1],00,00,00,0));
	var startyear = '20' + sdate.split("/")[2];
	var endyear = '20' + edate.split("/")[2];
	var ccode = doc.activity_recipient_country_code.toLowerCase();
	var title = doc.title + ' ' + country + ' ' + startyear + '-'+ endyear;
	
	emit([startyear,endyear,donor,country,ccode,title,ttcode],
			aamount);
		}
	