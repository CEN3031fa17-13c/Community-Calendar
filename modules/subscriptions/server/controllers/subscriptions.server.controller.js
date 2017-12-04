'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Subscription = mongoose.model('Subscription'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    _ = require('lodash');

/**
 * Create a Subscription
 */
exports.create = function (req, res) {
    var subscription = new Subscription(req.body);
    subscription.user = req.user;

    subscription.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(subscription);
        }
    });
};

/**
 * Show the current Subscription
 */
exports.read = function (req, res) {
    // convert mongoose document to JSON
    var subscription = req.subscription ? req.subscription.toJSON() : {};

    // Add a custom field to the Article, for determining if the current User is the "owner".
    // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
    subscription.isCurrentUserOwner = req.user && subscription.user && subscription.user._id.toString() === req.user._id.toString();

    res.jsonp(subscription);
};

/**
 * Update a Subscription
 */
exports.update = function (req, res) {
    var subscription = req.subscription;

    subscription = _.extend(subscription, req.body);

    subscription.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(subscription);
        }
    });
};

/**
 * Delete an Subscription
 */
exports.delete = function (req, res) {
    var subscription = req.subscription;

    subscription.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(subscription);
        }
    });
};

/**
 * List of Subscriptions
 */
exports.list = function (req, res) {
    Subscription.find().sort('-created').populate('user', 'displayName').exec(function (err, subscriptions) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(subscriptions);
        }
    });
};

/**
 * Subscription middleware
 */
exports.subscriptionByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Subscription is invalid'
        });
    }

    Subscription.findById(id).populate('user', 'displayName').exec(function (err, subscription) {
        if (err) {
            return next(err);
        } else if (!subscription) {
            return res.status(404).send({
                message: 'No Subscription with that identifier has been found'
            });
        }
        req.subscription = subscription;
        next();
    });
};


/**
 * Original from Guangyu: Send subscription email.
 */
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'communityCalendar2017@gmail.com',
        pass: 'Team13C!'
    }
});

exports.sendMail = function (req, res) {
    var data = req.body;

    transporter.sendMail({
        from: 'communityCalendar2017@gmail.com',
        to: data.contactEmail,
        subject: 'Community Calendar Subscription.',
        text: data.contactMsg
    });

    res.json(data);
};
/* End of subscription email */
