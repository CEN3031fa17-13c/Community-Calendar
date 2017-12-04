// 'use strict';

// var should = require('should'),
//   request = require('supertest'),
//   path = require('path'),
//   mongoose = require('mongoose'),
//   User = mongoose.model('User'),
//   Newabout = mongoose.model('Newabout'),
//   express = require(path.resolve('./config/lib/express'));

// /**
//  * Globals
//  */
// var app,
//   agent,
//   credentials,
//   user,
//   newabout;

// /**
//  * Newabout routes tests
//  */
// describe('Newabout CRUD tests', function () {

//   before(function (done) {
//     // Get application
//     app = express.init(mongoose);
//     agent = request.agent(app);

//     done();
//   });

//   beforeEach(function (done) {
//     // Create user credentials
//     credentials = {
//       username: 'username',
//       password: 'M3@n.jsI$Aw3$0m3'
//     };

//     // Create a new user
//     user = new User({
//       firstName: 'Full',
//       lastName: 'Name',
//       displayName: 'Full Name',
//       email: 'test@test.com',
//       username: credentials.username,
//       password: credentials.password,
//       provider: 'local'
//     });

//     // Save a user to the test db and create new Newabout
//     user.save(function () {
//       newabout = {
//         name: 'Newabout name'
//       };

//       done();
//     });
//   });

//   it('should be able to save a Newabout if logged in', function (done) {
//     agent.post('/api/auth/signin')
//       .send(credentials)
//       .expect(200)
//       .end(function (signinErr, signinRes) {
//         // Handle signin error
//         if (signinErr) {
//           return done(signinErr);
//         }

//         // Get the userId
//         var userId = user.id;

//         // Save a new Newabout
//         agent.post('/api/newabouts')
//           .send(newabout)
//           .expect(200)
//           .end(function (newaboutSaveErr, newaboutSaveRes) {
//             // Handle Newabout save error
//             if (newaboutSaveErr) {
//               return done(newaboutSaveErr);
//             }

//             // Get a list of Newabouts
//             agent.get('/api/newabouts')
//               .end(function (newaboutsGetErr, newaboutsGetRes) {
//                 // Handle Newabouts save error
//                 if (newaboutsGetErr) {
//                   return done(newaboutsGetErr);
//                 }

//                 // Get Newabouts list
//                 var newabouts = newaboutsGetRes.body;

//                 // Set assertions
//                 (newabouts[0].user._id).should.equal(userId);
//                 (newabouts[0].name).should.match('Newabout name');

//                 // Call the assertion callback
//                 done();
//               });
//           });
//       });
//   });

//   it('should not be able to save an Newabout if not logged in', function (done) {
//     agent.post('/api/newabouts')
//       .send(newabout)
//       .expect(403)
//       .end(function (newaboutSaveErr, newaboutSaveRes) {
//         // Call the assertion callback
//         done(newaboutSaveErr);
//       });
//   });

//   it('should not be able to save an Newabout if no name is provided', function (done) {
//     // Invalidate name field
//     newabout.name = '';

//     agent.post('/api/auth/signin')
//       .send(credentials)
//       .expect(200)
//       .end(function (signinErr, signinRes) {
//         // Handle signin error
//         if (signinErr) {
//           return done(signinErr);
//         }

//         // Get the userId
//         var userId = user.id;

//         // Save a new Newabout
//         agent.post('/api/newabouts')
//           .send(newabout)
//           .expect(400)
//           .end(function (newaboutSaveErr, newaboutSaveRes) {
//             // Set message assertion
//             (newaboutSaveRes.body.message).should.match('Please fill Newabout name');

//             // Handle Newabout save error
//             done(newaboutSaveErr);
//           });
//       });
//   });

//   it('should be able to update an Newabout if signed in', function (done) {
//     agent.post('/api/auth/signin')
//       .send(credentials)
//       .expect(200)
//       .end(function (signinErr, signinRes) {
//         // Handle signin error
//         if (signinErr) {
//           return done(signinErr);
//         }

//         // Get the userId
//         var userId = user.id;

//         // Save a new Newabout
//         agent.post('/api/newabouts')
//           .send(newabout)
//           .expect(200)
//           .end(function (newaboutSaveErr, newaboutSaveRes) {
//             // Handle Newabout save error
//             if (newaboutSaveErr) {
//               return done(newaboutSaveErr);
//             }

//             // Update Newabout name
//             newabout.name = 'WHY YOU GOTTA BE SO MEAN?';

//             // Update an existing Newabout
//             agent.put('/api/newabouts/' + newaboutSaveRes.body._id)
//               .send(newabout)
//               .expect(200)
//               .end(function (newaboutUpdateErr, newaboutUpdateRes) {
//                 // Handle Newabout update error
//                 if (newaboutUpdateErr) {
//                   return done(newaboutUpdateErr);
//                 }

//                 // Set assertions
//                 (newaboutUpdateRes.body._id).should.equal(newaboutSaveRes.body._id);
//                 (newaboutUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

//                 // Call the assertion callback
//                 done();
//               });
//           });
//       });
//   });

//   it('should be able to get a list of Newabouts if not signed in', function (done) {
//     // Create new Newabout model instance
//     var newaboutObj = new Newabout(newabout);

//     // Save the newabout
//     newaboutObj.save(function () {
//       // Request Newabouts
//       request(app).get('/api/newabouts')
//         .end(function (req, res) {
//           // Set assertion
//           res.body.should.be.instanceof(Array).and.have.lengthOf(1);

//           // Call the assertion callback
//           done();
//         });

//     });
//   });

//   it('should be able to get a single Newabout if not signed in', function (done) {
//     // Create new Newabout model instance
//     var newaboutObj = new Newabout(newabout);

//     // Save the Newabout
//     newaboutObj.save(function () {
//       request(app).get('/api/newabouts/' + newaboutObj._id)
//         .end(function (req, res) {
//           // Set assertion
//           res.body.should.be.instanceof(Object).and.have.property('name', newabout.name);

//           // Call the assertion callback
//           done();
//         });
//     });
//   });

//   it('should return proper error for single Newabout with an invalid Id, if not signed in', function (done) {
//     // test is not a valid mongoose Id
//     request(app).get('/api/newabouts/test')
//       .end(function (req, res) {
//         // Set assertion
//         res.body.should.be.instanceof(Object).and.have.property('message', 'Newabout is invalid');

//         // Call the assertion callback
//         done();
//       });
//   });

//   it('should return proper error for single Newabout which doesnt exist, if not signed in', function (done) {
//     // This is a valid mongoose Id but a non-existent Newabout
//     request(app).get('/api/newabouts/559e9cd815f80b4c256a8f41')
//       .end(function (req, res) {
//         // Set assertion
//         res.body.should.be.instanceof(Object).and.have.property('message', 'No Newabout with that identifier has been found');

//         // Call the assertion callback
//         done();
//       });
//   });

//   it('should be able to delete an Newabout if signed in', function (done) {
//     agent.post('/api/auth/signin')
//       .send(credentials)
//       .expect(200)
//       .end(function (signinErr, signinRes) {
//         // Handle signin error
//         if (signinErr) {
//           return done(signinErr);
//         }

//         // Get the userId
//         var userId = user.id;

//         // Save a new Newabout
//         agent.post('/api/newabouts')
//           .send(newabout)
//           .expect(200)
//           .end(function (newaboutSaveErr, newaboutSaveRes) {
//             // Handle Newabout save error
//             if (newaboutSaveErr) {
//               return done(newaboutSaveErr);
//             }

//             // Delete an existing Newabout
//             agent.delete('/api/newabouts/' + newaboutSaveRes.body._id)
//               .send(newabout)
//               .expect(200)
//               .end(function (newaboutDeleteErr, newaboutDeleteRes) {
//                 // Handle newabout error error
//                 if (newaboutDeleteErr) {
//                   return done(newaboutDeleteErr);
//                 }

//                 // Set assertions
//                 (newaboutDeleteRes.body._id).should.equal(newaboutSaveRes.body._id);

//                 // Call the assertion callback
//                 done();
//               });
//           });
//       });
//   });

//   it('should not be able to delete an Newabout if not signed in', function (done) {
//     // Set Newabout user
//     newabout.user = user;

//     // Create new Newabout model instance
//     var newaboutObj = new Newabout(newabout);

//     // Save the Newabout
//     newaboutObj.save(function () {
//       // Try deleting Newabout
//       request(app).delete('/api/newabouts/' + newaboutObj._id)
//         .expect(403)
//         .end(function (newaboutDeleteErr, newaboutDeleteRes) {
//           // Set message assertion
//           (newaboutDeleteRes.body.message).should.match('User is not authorized');

//           // Handle Newabout error error
//           done(newaboutDeleteErr);
//         });

//     });
//   });

//   it('should be able to get a single Newabout that has an orphaned user reference', function (done) {
//     // Create orphan user creds
//     var _creds = {
//       username: 'orphan',
//       password: 'M3@n.jsI$Aw3$0m3'
//     };

//     // Create orphan user
//     var _orphan = new User({
//       firstName: 'Full',
//       lastName: 'Name',
//       displayName: 'Full Name',
//       email: 'orphan@test.com',
//       username: _creds.username,
//       password: _creds.password,
//       provider: 'local'
//     });

//     _orphan.save(function (err, orphan) {
//       // Handle save error
//       if (err) {
//         return done(err);
//       }

//       agent.post('/api/auth/signin')
//         .send(_creds)
//         .expect(200)
//         .end(function (signinErr, signinRes) {
//           // Handle signin error
//           if (signinErr) {
//             return done(signinErr);
//           }

//           // Get the userId
//           var orphanId = orphan._id;

//           // Save a new Newabout
//           agent.post('/api/newabouts')
//             .send(newabout)
//             .expect(200)
//             .end(function (newaboutSaveErr, newaboutSaveRes) {
//               // Handle Newabout save error
//               if (newaboutSaveErr) {
//                 return done(newaboutSaveErr);
//               }

//               // Set assertions on new Newabout
//               (newaboutSaveRes.body.name).should.equal(newabout.name);
//               should.exist(newaboutSaveRes.body.user);
//               should.equal(newaboutSaveRes.body.user._id, orphanId);

//               // force the Newabout to have an orphaned user reference
//               orphan.remove(function () {
//                 // now signin with valid user
//                 agent.post('/api/auth/signin')
//                   .send(credentials)
//                   .expect(200)
//                   .end(function (err, res) {
//                     // Handle signin error
//                     if (err) {
//                       return done(err);
//                     }

//                     // Get the Newabout
//                     agent.get('/api/newabouts/' + newaboutSaveRes.body._id)
//                       .expect(200)
//                       .end(function (newaboutInfoErr, newaboutInfoRes) {
//                         // Handle Newabout error
//                         if (newaboutInfoErr) {
//                           return done(newaboutInfoErr);
//                         }

//                         // Set assertions
//                         (newaboutInfoRes.body._id).should.equal(newaboutSaveRes.body._id);
//                         (newaboutInfoRes.body.name).should.equal(newabout.name);
//                         should.equal(newaboutInfoRes.body.user, undefined);

//                         // Call the assertion callback
//                         done();
//                       });
//                   });
//               });
//             });
//         });
//     });
//   });

//   afterEach(function (done) {
//     User.remove().exec(function () {
//       Newabout.remove().exec(done);
//     });
//   });
// });
