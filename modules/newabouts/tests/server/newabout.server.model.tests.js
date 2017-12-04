// 'use strict';

// /**
//  * Module dependencies.
//  */
// var should = require('should'),
//   mongoose = require('mongoose'),
//   User = mongoose.model('User'),
//   Newabout = mongoose.model('Newabout');

// /**
//  * Globals
//  */
// var user,
//   newabout;

// /**
//  * Unit tests
//  */
// describe('Newabout Model Unit Tests:', function() {
//   beforeEach(function(done) {
//     user = new User({
//       firstName: 'Full',
//       lastName: 'Name',
//       displayName: 'Full Name',
//       email: 'test@test.com',
//       username: 'username',
//       password: 'password'
//     });

//     user.save(function() {
//       newabout = new Newabout({
//         name: 'Newabout Name',
//         user: user
//       });

//       done();
//     });
//   });

//   describe('Method Save', function() {
//     it('should be able to save without problems', function(done) {
//       this.timeout(0);
//       return newabout.save(function(err) {
//         should.not.exist(err);
//         done();
//       });
//     });

//     it('should be able to show an error when try to save without name', function(done) {
//       newabout.name = '';

//       return newabout.save(function(err) {
//         should.exist(err);
//         done();
//       });
//     });
//   });

//   afterEach(function(done) {
//     Newabout.remove().exec(function() {
//       User.remove().exec(function() {
//         done();
//       });
//     });
//   });
// });
