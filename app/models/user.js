// app/models/user.js
var client = require('../../config/database.js');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = { name : 'String', myid : 'String'};

// methods ======================
// generating a hash
userSchema.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// save user (insert data to db)
userSchema.save = function (username, password) {
	client.bulk({
		body: [
			{ index: {_index: 'gov', _type: 'mytype'} },
			userSchema,
		]
	}, function (err, resp) {
		if (err) {
			console.log("bulk error: " + err);
			return err;
		}
		else {
			console.log("--- Response ---" + resp);
			return resp;
		}
	});
};

// find user in db
userSchema.findOne = function (username) {
	var count = "count";
	client.search({
		index: 'gov',
		type: 'mytype',
		body: {
			query: {
				match : {
					name: username
				}
			}
		}
	}, function (err, response) {
		if (err) {
			console.log(err);
			//return err;
		}
		if (response) {
			count = JSON.stringify(response['hits']['total']);
			//console.log("this is count", count);
			// return response;
			//console.log(response);
			//console.log(JSON.stringify(response['hits']['total']));
			// return JSON.stringify(response['hits']['total']);
			return count;
		}
	});
	return count;
}

// var myBody = { name: "shlje",	myid: "998" };
// var result = bcrypt.hashSync(myBody.myid, bcrypt.genSaltSync(8), null);
// var check = bcrypt.compareSync(myBody.myid, result);



// create the model for users and expose it to our app
module.exports = userSchema;
