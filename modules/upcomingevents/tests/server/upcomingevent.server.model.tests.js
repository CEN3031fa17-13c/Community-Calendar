'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Upcomingevent = mongoose.model('Upcomingevent');

/**
 * Globals
 */
var user,
  upcomingevent;

/**
 * Unit tests
 */
describe('Upcomingevent Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Different',
      lastName: 'User',
      displayName: 'Full Different Name',
      email: 'test3@test.com',
      phone_number: '5555555556',
      username: 'different_username',
      password: 'Different_Password1!',
      provider: 'local'
    });

    user.save(function() {
      upcomingevent = new Upcomingevent({
        name: 'Upcomingevent Name',
        organization: 'University of Florida',
        location: 'Gainesville',
        eventDuration: {
          startDate: Date.now(),
          endDate: Date.now()
        },
        category: 'other',
        dress_code: 'other',
        description: 'description', 
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return upcomingevent.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without name', function(done) {
      upcomingevent.name = '';

      return upcomingevent.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Upcomingevent.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
