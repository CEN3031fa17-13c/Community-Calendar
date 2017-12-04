'use strict';

/**
 * Module dependencies
 */
var subscriptionsPolicy = require('../policies/subscriptions.server.policy'),
    subscriptions = require('../controllers/subscriptions.server.controller');

module.exports = function (app) {
    // Subscriptions Routes
    app.route('/api/subscriptions').all(subscriptionsPolicy.isAllowed)
        .get(subscriptions.list)
        .post(subscriptions.create);

    app.route('/api/subscriptions/:subscriptionId').all(subscriptionsPolicy.isAllowed)
        .get(subscriptions.read)
        .put(subscriptions.update)
        .delete(subscriptions.delete);

    // Finish by binding the Subscription middleware
    app.param('subscriptionId', subscriptions.subscriptionByID);

    // Sending subscription email to the new subscriber.
    app.route('/api/auth/subscription').post(subscriptions.sendMail);
};
