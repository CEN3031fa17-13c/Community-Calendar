'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Upcomingevent = mongoose.model('Upcomingevent'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  upcomingevent;

/**
 * Upcomingevent routes tests
 */
describe('Upcomingevent CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      phone_number: '5555555555',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Upcomingevent
    user.save(function () {
      upcomingevent = {
        name: 'Upcomingevent name',
        organization: 'University of Florida',
        location: 'Gainesville',
        eventDuration: {
          startDate: Date.now(),
          endDate: Date.now()
        },
        category: 'other',
        dress_code: 'other',
        description: 'description', 
      };

      done();
    });
  });

  it('should be able to save an Upcomingevent if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Upcomingevent
        agent.post('/api/upcomingevents')
          .send(upcomingevent)
          .expect(200)
          .end(function (upcomingeventSaveErr, upcomingeventSaveRes) {
            // Handle Upcomingevent save error
            if (upcomingeventSaveErr) {
              return done(upcomingeventSaveErr);
            }

            // Get a list of Upcomingevents
            agent.get('/api/upcomingevents')
              .end(function (upcomingeventsGetErr, upcomingeventsGetRes) {
                // Handle Upcomingevents save error
                if (upcomingeventsGetErr) {
                  return done(upcomingeventsGetErr);
                }

                // Get Upcomingevents list
                var upcomingevents = upcomingeventsGetRes.body;

                // Set assertions
                (upcomingevents[0].user._id).should.equal(userId);
                (upcomingevents[0].name).should.match('Upcomingevent name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Upcomingevent if not logged in', function (done) {
    agent.post('/api/upcomingevents')
      .send(upcomingevent)
      .expect(403)
      .end(function (upcomingeventSaveErr, upcomingeventSaveRes) {
        // Call the assertion callback
        done(upcomingeventSaveErr);
      });
  });

  it('should not be able to save an Upcomingevent if no name is provided', function (done) {
    // Invalidate name field
    upcomingevent.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Upcomingevent
        agent.post('/api/upcomingevents')
          .send(upcomingevent)
          .expect(400)
          .end(function (upcomingeventSaveErr, upcomingeventSaveRes) {
            // Set message assertion
            (upcomingeventSaveRes.body.message).should.match('Please fill upcoming event name');

            // Handle Upcomingevent save error
            done(upcomingeventSaveErr);
          });
      });
  });

  it('should be able to update an Upcomingevent if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Upcomingevent
        agent.post('/api/upcomingevents')
          .send(upcomingevent)
          .expect(200)
          .end(function (upcomingeventSaveErr, upcomingeventSaveRes) {
            // Handle Upcomingevent save error
            if (upcomingeventSaveErr) {
              return done(upcomingeventSaveErr);
            }

            // Update Upcomingevent name
            upcomingevent.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Upcomingevent
            agent.put('/api/upcomingevents/' + upcomingeventSaveRes.body._id)
              .send(upcomingevent)
              .expect(200)
              .end(function (upcomingeventUpdateErr, upcomingeventUpdateRes) {
                // Handle Upcomingevent update error
                if (upcomingeventUpdateErr) {
                  return done(upcomingeventUpdateErr);
                }

                // Set assertions
                (upcomingeventUpdateRes.body._id).should.equal(upcomingeventSaveRes.body._id);
                (upcomingeventUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Upcomingevents if not signed in', function (done) {
    // Create new Upcomingevent model instance
    var upcomingeventObj = new Upcomingevent(upcomingevent);

    // Save the upcomingevent
    upcomingeventObj.save(function () {
      // Request Upcomingevents
      request(app).get('/api/upcomingevents')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Upcomingevent if not signed in', function (done) {
    // Create new Upcomingevent model instance
    var upcomingeventObj = new Upcomingevent(upcomingevent);

    // Save the Upcomingevent
    upcomingeventObj.save(function () {
      request(app).get('/api/upcomingevents/' + upcomingeventObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', upcomingevent.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Upcomingevent with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/upcomingevents/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Upcomingevent is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Upcomingevent which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Upcomingevent
    request(app).get('/api/upcomingevents/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Upcomingevent with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Upcomingevent if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Upcomingevent
        agent.post('/api/upcomingevents')
          .send(upcomingevent)
          .expect(200)
          .end(function (upcomingeventSaveErr, upcomingeventSaveRes) {
            // Handle Upcomingevent save error
            if (upcomingeventSaveErr) {
              return done(upcomingeventSaveErr);
            }

            // Delete an existing Upcomingevent
            agent.delete('/api/upcomingevents/' + upcomingeventSaveRes.body._id)
              .send(upcomingevent)
              .expect(200)
              .end(function (upcomingeventDeleteErr, upcomingeventDeleteRes) {
                // Handle upcomingevent error error
                if (upcomingeventDeleteErr) {
                  return done(upcomingeventDeleteErr);
                }

                // Set assertions
                (upcomingeventDeleteRes.body._id).should.equal(upcomingeventSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Upcomingevent if not signed in', function (done) {
    // Set Upcomingevent user
    upcomingevent.user = user;

    // Create new Upcomingevent model instance
    var upcomingeventObj = new Upcomingevent(upcomingevent);

    // Save the Upcomingevent
    upcomingeventObj.save(function () {
      // Try deleting Upcomingevent
      request(app).delete('/api/upcomingevents/' + upcomingeventObj._id)
        .expect(403)
        .end(function (upcomingeventDeleteErr, upcomingeventDeleteRes) {
          // Set message assertion
          (upcomingeventDeleteRes.body.message).should.match('User is not authorized');

          // Handle Upcomingevent error error
          done(upcomingeventDeleteErr);
        });

    });
  });

  it('should be able to get a single Upcomingevent that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan2',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Orphan1',
      lastName: 'Test',
      displayName: 'Orphan Full Name',
      email: 'Orphantest@test.com',
      phone_number: '5555555556',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Upcomingevent
          agent.post('/api/upcomingevents')
            .send(upcomingevent)
            .expect(200)
            .end(function (upcomingeventSaveErr, upcomingeventSaveRes) {
              // Handle Upcomingevent save error
              if (upcomingeventSaveErr) {
                return done(upcomingeventSaveErr);
              }

              // Set assertions on new Upcomingevent
              (upcomingeventSaveRes.body.name).should.equal(upcomingevent.name);
              should.exist(upcomingeventSaveRes.body.user);
              should.equal(upcomingeventSaveRes.body.user._id, orphanId);

              // force the Upcomingevent to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Upcomingevent
                    agent.get('/api/upcomingevents/' + upcomingeventSaveRes.body._id)
                      .expect(200)
                      .end(function (upcomingeventInfoErr, upcomingeventInfoRes) {
                        // Handle Upcomingevent error
                        if (upcomingeventInfoErr) {
                          return done(upcomingeventInfoErr);
                        }

                        // Set assertions
                        (upcomingeventInfoRes.body._id).should.equal(upcomingeventSaveRes.body._id);
                        (upcomingeventInfoRes.body.name).should.equal(upcomingevent.name);
                        should.equal(upcomingeventInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Upcomingevent.remove().exec(done);
    });
  });
});
