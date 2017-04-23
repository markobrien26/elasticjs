var request = require("request");

var client = require('./connection.js');

var ip = [];

client.search({  
  index: 'logstash-2017.03.07',
  type: 'syslog',
  body: {
    query: {
      bool: {
	must: [
          { match: { "tags": "ssh_brute_force_attack" } },
//          { range : {
//		"@timestamp" : {
//                "gte": "2017-03-07T17:26:58.000Z", 
//                "lte": "2017-03-07T18:26:58.000Z",
//		}
//	     }
//	  }
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
      if (!(ip.includes(hit._source.src_ip))){
	ip.push(hit._source.src_ip);
	var options = { method: 'POST',
	  url: 'http://localhost:3000/alerts',
	  headers:
	     {'content-type': 'application/x-www-form-urlencoded' },
	  form: { type: 'SSH', src_ip: hit._source.src_ip, city: hit._source.geoip.city_name, country: hit._source.geoip.country_name }
 };
	request(options, function (error, response, body) {
	  if (error) throw new Error(error);

	  console.log(hit._source.src_ip);
	});
	
       }
      })
    }
});
