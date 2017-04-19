var request = require("request");

var client = require('./connection.js');

client.search({  
  index: 'logstash-2017.03.07',
  body: {
    query: {
      bool: {
	must: [
          { match: { "type_instance": "lcp_water_out"  } },
          { range : {
		"@timestamp" : {
                "gte": "2017-03-07T01:00:58.000Z", 
                "lte": "2017-03-07T19:00:58.000Z",
		}
	     }
	  },
	  { range: {
		"value" : {
		"gte": "25",
		}
	     }
	  }
	] 
    }
  }
 }
},

function (error, response,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
      console.log("--- Response ---");
      console.log('Total hits: ',response.hits.total);
      console.log("--- Hits ---");
      response.hits.hits.forEach(function(hit){
	var options = { method: 'POST',
	  url: 'http://localhost:3000/alerts',
	  headers:
	     {'content-type': 'application/x-www-form-urlencoded' },
	  form: { type: 'LCP', host: hit._source.host, temperature: hit._source.value }
   };
	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  console.log(hit);
	});

       
      })
    }
});
