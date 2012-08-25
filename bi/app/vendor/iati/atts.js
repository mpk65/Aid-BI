var ar = {
		ray : function(att) {
			if (att == null){return []};
			if (att[0] != null) {
				return att
			} else {
				r = [];
				r.push(att);
				return r;
			}
		}
}

var att = {
		code: function (att) {
			if (att == null)				{return att};
			// many codes of different organisations are the same, therefore we use the name
			if (att['#text'] != null)		{return att['#text']};
			if (att['@ref'] != null)		{return att['@ref']}; 
			if (att['@code'] != null)		{return att['@code']};
			if (att['@vocabulary'] != null)	{return att['@vocabulary']}; 
			// code reverts to name in case of missing
			if (att['#text'] != null)		{return att['#text']
			} else { // in case attribute is missing att is not an object
				return att}
		},
		hardcode: function (att) {
			if (att == null)				{return att};
			if (att['@ref'] != null)		{return att['@ref']}; 
			if (att['@code'] != null)		{return att['@code']};
		},
		name: function (att) {
			if (att == null)				{return att};
			if (att['#text'] != null)		{return att['#text']
			} else { // in case attribute is missing att is not an object
				return att}
		},
		date: function (att) {
			if (att == null)				{return att};
			if (att['@iso-date'] != null)	{return att['@iso-date']}
			if (att['#text'] 	!= null)		{return att['#text']
			} else { 
				return att}
		},
		sigf: function (att) {
			if (att == null)				{return att};
			if (att['@significance'] != null)		{return att['@significance']
			} else { 
				return 100}
		},
		type: function (att) {
			if (att == null)				{return att};
			if (att['@type'] != null)		{return att['@type']}
			if (att['@role'] != null)		{return att['@role']
			} else { 
				return ''}
		},
		regex: function (att){
			if (att == null)				{return att};
			return att.replace(/\//g,'_').replace(/\n/gm,'');
		},
		trunc: function (att){
			if (att == null)				{return att};
			return att.substring(0,63)
		},
		up: function (att){
			if (att == null)				{return att};
			return att.toUpperCase()
		},
		nameOfType: function (array,type){
			if (array == null){return array};
			var res;
			for (i in array){
				if (array[i]['@role'] == type){
					res = array[i]['#text'];
				};
				if (array[i]['@type'] == type){
					res = array[i]['#text'];
				}
			};
			return res;
		},
		dateOfType: function (array,type){
			if (array == null){return array};
			var res;
			for (i in array){
				if (array[i]['@role'] == type){
					res = array[i]['@iso-date'];
					if (res == null){res = array[i]['#text']}
				};
				if (array[i]['@type'] == type){
					res = array[i]['@iso-date'];
					if (res == null){res = array[i]['#text']}
				}
			};
			return res;
		}
}

var trans = {
		value: function (att){
			if (att == null)				{return att};
			if (att['@value'] != null)		{return att['@value']['#text']}; 
			if (att['value'] != null)		{
				if (att['value']['#text'] != null){return att['value']['#text']
				} else {
					return att['value']
					}
				}; 
			return 'missing transaction value ';
		},
		date: function (att){
			if (att == null)				{return att};
			if (att['@value'] != null)		{return att['@value']['@value-date']}; 
			if (att['value'] != null)		{
				if (att['value']['@value-date'] != null){return att['value']['@value-date']
				}}; 
			if (att['transaction-date'] != null)	{return att['transaction-date']['@iso-date']}; 
			return 'missing transaction date';
		},
		type: function (att){
			if (att == null)						{return att};
			if (att['transaction-type'] != null)	{return att['transaction-type']['@code']}; 
			if (att['transaction-type'] != null)	{return att['transaction-type']['#text']}; 
			return 'missing transaction type';
		},
		year: function (att){
			if (att == null)				{return att};
			if (att != null)				{return att.split("-")[0]}; 
			return 'missing transaction year';
		}
}