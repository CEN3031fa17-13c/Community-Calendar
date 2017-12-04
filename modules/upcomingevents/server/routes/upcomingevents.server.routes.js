'use strict';

/**
 * Module dependencies
 */
var upcomingeventsPolicy = require('../policies/upcomingevents.server.policy'),
    upcomingevents = require('../controllers/upcomingevents.server.controller');

module.exports = function (app) {
    // Setting up the events profile api
    app.route('/api/upcomingevents/picture').all()
        .post(upcomingevents.uploadImage);

    app.route('/api/upcomingevents/picture/:filename/:filetype').all()
        .get(upcomingevents.signS3);//necessary for S3 signed request

    // Upcomingevents Routes
    app.route('/api/upcomingevents').all(upcomingeventsPolicy.isAllowed)
        .get(upcomingevents.list)
        .post(upcomingevents.create);

    app.route('/api/upcomingevents/:upcomingeventId').all(upcomingeventsPolicy.isAllowed)
        .get(upcomingevents.read)
        .put(upcomingevents.update)
        .delete(upcomingevents.delete);


    // Finish by binding the Upcomingevent middleware
    app.param('upcomingeventId', upcomingevents.upcomingeventByID);
};
