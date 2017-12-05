'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Subscription = mongoose.model('Subscription');

/**
 * Globals
 */
var user,
  subscription;

/**
 * Unit tests
 */
describe('Subscription Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      phone_number: '5555555555',
      username: 'testusername',
      password: 'testpassword',
      provider: 'local'    
    });

    user.save(function() {
      subscription = new Subscription({
        email: 'subscriptionemail@notarealemail.com'
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      this.timeout(0);
      return subscription.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should be able to show an error when try to save without email', function(done) {
      subscription.email = '';

      return subscription.save(function(err) {
        should.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) {
    Subscription.remove().exec(function() {
      User.remove().exec(function() {
        done();
      });
    });
  });
});
