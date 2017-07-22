// config/passport.js

var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function (passport) {
	// local signup
	passport.use('local-signup', new LocalStrategy({
		// by default, local strategy uses username and password, gonna override them
		usernameField: 'name',
		passwordField: 'myid',
		passReqToCallback: true // allows us to pass back the entire request to the callback
	}, function (req, username, password, done) {
		// asynchronous
		// user.findOne wont fire unless data is sent back
		process.nextTick(function () {
			// check if the user trying to login already exists
			
			// User.findOne(username, function (err, user) {
			// 	console.log('---------------- here ------------------');
			// 	if (err) { // if error
			// 		console.log('error in passport: ' + err);
			// 		return done(err);
			// 	}
			// 	if (user) {
			// 		console.log('user already exists: ' + user);
			// 		return done(null, false, req.flash('signupMessage', 'username already exists.'));
			// 	}
			// 	else { // if no user with that username
			// 		var newUser = new User();
			// 		newUser.name = username;
			// 		newUser.myid = password;
			// 		console.log('new user, save to db');
			// 		// save the user
			// 		newUser.save(username, password, function (err) {
			// 			if (err) {
			// 				throw err;
			// 			}
			// 			return done(null, newUser);
			// 		});
			// 	}
			// });
			var result = User.findOne('hello');
			console.log(result);
		});
	}));
};