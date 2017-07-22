var pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/todo';

var client = new pg.Client(connectionString);

client.query('SELECT $1::int AS number', ['1'], function(err, result) {
	if(err) {      
		return console.error('error running query', err);
	}
	console.log(result.rows[0].number);    //output: 1	
});

module.exports = client;