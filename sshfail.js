

var client = require('./connection.js');

client.search({  
  index: 'logstash-2017.03.07',
  type: 'syslog',
  fields: ['geoip.country_name'],
  size: 20,
  body: {
    query: {
      bool: {
	must: [
          { match: { "tags": "ssh_brute_force_attack" } },
          { range : {
		"@timestamp" : {
                "gte": "2017-03-07T12:26:58.000Z", 
                "lte": "2017-03-07T13:26:58.000Z",
		}
	     }
	  }
	] 
    }
  }
 }
},function (error, response,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
      console.log("--- Response ---");
      console.log('Total hits: ',response.hits.total);
      console.log("--- Hits ---");
      response.hits.hits.forEach(function(hit){
        console.log(hit);
      })
    }
});
