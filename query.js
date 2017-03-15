'use strict';

var elasticsearch = require('elasticsearch');
var Promise = require('bluebird');

var log = console.log.bind(console);

var ejs = new elasticsearch.Client({
  host: 'localhost:9200',
//  log: 'trace'
});


"time based query search"

ejs.Request()
	.indices("logstash-2017.03.07")
	.types("syslog")
	.query(
		ejs.RangeFilter('log_date').from('2014-05-05 00:00:00.000').to('2014-05-11 00:00:00.000')
		.queries(ejs.MatchQuery('tags','ssh_brute_force_attack'))
	)
