'use strict';

var elasticsearch = require('elasticsearch');
var Promise = require('bluebird');

var log = console.log.bind(console);

var client = new elasticsearch.Client({
  host: 'localhost:9200',
//  log: 'trace'
});


function search() {
  return client.search({
    index: 'logstash-2017.03.07',
    q: 'ssh_brute_force_attack'
  }).then(function (resp){
    var fs = require('fs');
    fs.writeFile('ssh.txt', JSON.stringify(resp.hits.hits), function (err) {
      if (err) return console.log(err);
      console.log('reponse written to file');
    });
  }
);
}

function closeConnection() {
  client.close();
}


function waitForIndexing() {
  log('Wait for indexing ....');
  return new Promise(function(resolve) {
    setTimeout(resolve, 4000);
  });
}

Promise.resolve()
  .then(waitForIndexing)
  .then(search)
  .then(closeConnection);
