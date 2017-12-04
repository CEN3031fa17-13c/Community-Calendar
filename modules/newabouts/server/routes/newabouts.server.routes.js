'use strict';

/**
 * Module dependencies
 */
var newaboutsPolicy = require('../policies/newabouts.server.policy'),
    newabouts = require('../controllers/newabouts.server.controller');

module.exports = function (app) {
    // Setting up the about profile api
    app.route('/api/newabouts/picture').all()
        .post(newabouts.uploadImage);

    // Newabouts Routes
    app.route('/api/newabouts').all(newaboutsPolicy.isAllowed)
        .get(newabouts.list)
        .post(newabouts.create);

    app.route('/api/newabouts/:newaboutId').all(newaboutsPolicy.isAllowed)
        .get(newabouts.read)
        .put(newabouts.update)
        .delete(newabouts.delete);

    // Finish by binding the Newabout middleware
    app.param('newaboutId', newabouts.newaboutByID);
};
