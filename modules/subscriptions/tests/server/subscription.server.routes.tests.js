// 'use strict';

// var should = require('should'),
//   request = require('supertest'),
//   path = require('path'),
//   mongoose = require('mongoose'),
//   User = mongoose.model('User'),
//   Subscription = mongoose.model('Subscription'),
//   express = require(path.resolve('./config/lib/express'));

// /**
//  * Globals
//  */
// var app,
//   agent,
//   credentials,
//   user,
//   subscription;

// /**
//  * Subscription routes tests
//  */
// describe('Subscription CRUD tests', function () {

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
//       phone_number: '5555555655',
//       username: credentials.username,
//       password: credentials.password,
//       provider: 'local'
//     });

//     // Save a user to the test db and create new Subscription
//     user.save(function () {
//       subscription = {
//         email: 'testemail@testers.com'
//       };

//       done();
//     });
//   });

//   it('should be able to save a Subscription if logged in', function (done) {
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

//         // Save a new Subscription
//         agent.post('/api/subscriptions')
//           .send(subscription)
//           .expect(200)
//           .end(function (subscriptionSaveErr, subscriptionSaveRes) {
//             // Handle Subscription save error
//             if (subscriptionSaveErr) {
//               return done(subscriptionSaveErr);
//             }

//             // Get a list of Subscriptions
//             agent.get('/api/subscriptions')
//               .end(function (subscriptionsGetErr, subscriptionsGetRes) {
//                 // Handle Subscriptions save error
//                 if (subscriptionsGetErr) {
//                   return done(subscriptionsGetErr);
//                 }

//                 // Get Subscriptions list
//                 var subscriptions = subscriptionsGetRes.body;

//                 // Set assertions
//                 (subscriptions[0].user._id).should.equal(userId);
//                 (subscriptions[0].name).should.match('Subscription name');

//                 // Call the assertion callback
//                 done();
//               });
//           });
//       });
//   });

//   it('should be able to update an Subscription if signed in', function (done) {
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

//         // Save a new Subscription
//         agent.post('/api/subscriptions')
//           .send(subscription)
//           .expect(200)
//           .end(function (subscriptionSaveErr, subscriptionSaveRes) {
//             // Handle Subscription save error
//             if (subscriptionSaveErr) {
//               return done(subscriptionSaveErr);
//             }

//             // Update Subscription name
//             subscription.name = 'WHY YOU GOTTA BE SO MEAN?';

//             // Update an existing Subscription
//             agent.put('/api/subscriptions/' + subscriptionSaveRes.body._id)
//               .send(subscription)
//               .expect(200)
//               .end(function (subscriptionUpdateErr, subscriptionUpdateRes) {
//                 // Handle Subscription update error
//                 if (subscriptionUpdateErr) {
//                   return done(subscriptionUpdateErr);
//                 }

//                 // Set assertions
//                 (subscriptionUpdateRes.body._id).should.equal(subscriptionSaveRes.body._id);
//                 (subscriptionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

//                 // Call the assertion callback
//                 done();
//               });
//           });
//       });
//   });

//   it('should be able to get a list of Subscriptions if not signed in', function (done) {
//     // Create new Subscription model instance
//     var subscriptionObj = new Subscription(subscription);

//     // Save the subscription
//     subscriptionObj.save(function () {
//       // Request Subscriptions
//       request(app).get('/api/subscriptions')
//         .end(function (req, res) {
//           // Set assertion
//           res.body.should.be.instanceof(Array).and.have.lengthOf(1);

//           // Call the assertion callback
//           done();
//         });

//     });
//   });

//   it('should be able to get a single Subscription if not signed in', function (done) {
//     // Create new Subscription model instance
//     var subscriptionObj = new Subscription(subscription);

//     // Save the Subscription
//     subscriptionObj.save(function () {
//       request(app).get('/api/subscriptions/' + subscriptionObj._id)
//         .end(function (req, res) {
//           // Set assertion
//           res.body.should.be.instanceof(Object).and.have.property('name', subscription.name);

//           // Call the assertion callback
//           done();
//         });
//     });
//   });

//   it('should return proper error for single Subscription with an invalid Id, if not signed in', function (done) {
//     // test is not a valid mongoose Id
//     request(app).get('/api/subscriptions/test')
//       .end(function (req, res) {
//         // Set assertion
//         res.body.should.be.instanceof(Object).and.have.property('message', 'Subscription is invalid');

//         // Call the assertion callback
//         done();
//       });
//   });

//   it('should return proper error for single Subscription which doesnt exist, if not signed in', function (done) {
//     // This is a valid mongoose Id but a non-existent Subscription
//     request(app).get('/api/subscriptions/559e9cd815f80b4c256a8f41')
//       .end(function (req, res) {
//         // Set assertion
//         res.body.should.be.instanceof(Object).and.have.property('message', 'No Subscription with that identifier has been found');

//         // Call the assertion callback
//         done();
//       });
//   });

//   it('should be able to delete an Subscription if signed in', function (done) {
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

//         // Save a new Subscription
//         agent.post('/api/subscriptions')
//           .send(subscription)
//           .expect(200)
//           .end(function (subscriptionSaveErr, subscriptionSaveRes) {
//             // Handle Subscription save error
//             if (subscriptionSaveErr) {
//               return done(subscriptionSaveErr);
//             }

//             // Delete an existing Subscription
//             agent.delete('/api/subscriptions/' + subscriptionSaveRes.body._id)
//               .send(subscription)
//               .expect(200)
//               .end(function (subscriptionDeleteErr, subscriptionDeleteRes) {
//                 // Handle subscription error error
//                 if (subscriptionDeleteErr) {
//                   return done(subscriptionDeleteErr);
//                 }

//                 // Set assertions
//                 (subscriptionDeleteRes.body._id).should.equal(subscriptionSaveRes.body._id);

//                 // Call the assertion callback
//                 done();
//               });
//           });
//       });
//   });

//   it('should not be able to delete an Subscription if not signed in', function (done) {
//     // Set Subscription user
//     subscription.user = user;

//     // Create new Subscription model instance
//     var subscriptionObj = new Subscription(subscription);

//     // Save the Subscription
//     subscriptionObj.save(function () {
//       // Try deleting Subscription
//       request(app).delete('/api/subscriptions/' + subscriptionObj._id)
//         .expect(403)
//         .end(function (subscriptionDeleteErr, subscriptionDeleteRes) {
//           // Set message assertion
//           (subscriptionDeleteRes.body.message).should.match('User is not authorized');

//           // Handle Subscription error error
//           done(subscriptionDeleteErr);
//         });

//     });
//   });

//   it('should be able to get a single Subscription that has an orphaned user reference', function (done) {
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

//           // Save a new Subscription
//           agent.post('/api/subscriptions')
//             .send(subscription)
//             .expect(200)
//             .end(function (subscriptionSaveErr, subscriptionSaveRes) {
//               // Handle Subscription save error
//               if (subscriptionSaveErr) {
//                 return done(subscriptionSaveErr);
//               }

//               // Set assertions on new Subscription
//               (subscriptionSaveRes.body.name).should.equal(subscription.name);
//               should.exist(subscriptionSaveRes.body.user);
//               should.equal(subscriptionSaveRes.body.user._id, orphanId);

//               // force the Subscription to have an orphaned user reference
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

//                     // Get the Subscription
//                     agent.get('/api/subscriptions/' + subscriptionSaveRes.body._id)
//                       .expect(200)
//                       .end(function (subscriptionInfoErr, subscriptionInfoRes) {
//                         // Handle Subscription error
//                         if (subscriptionInfoErr) {
//                           return done(subscriptionInfoErr);
//                         }

//                         // Set assertions
//                         (subscriptionInfoRes.body._id).should.equal(subscriptionSaveRes.body._id);
//                         (subscriptionInfoRes.body.name).should.equal(subscription.name);
//                         should.equal(subscriptionInfoRes.body.user, undefined);

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
//       Subscription.remove().exec(done);
//     });
//   });
// });
