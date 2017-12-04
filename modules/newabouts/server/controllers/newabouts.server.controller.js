'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Newabout = mongoose.model('Newabout'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    multer = require('multer'),
    config = require(path.resolve('./config/config')),
    fs = require('fs'),
    _ = require('lodash');


/**
 * Upload About image
 */
 //Unused in favor of AWS
exports.uploadImage = function (req, res) {
    var message = null;

    var upload = multer(config.uploads.aboutUpload).single('newAboutPicture');
    var aboutUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;


    upload.fileFilter = aboutUploadFileFilter;

    upload(req, res, function (uploadError) {
        if (uploadError) {
            return res.status(400).send({
                message: 'Error occurred while uploading about picture'
            });
        }
        else {
            return res.status(200).send({
                message: 'Is working!',
                file: req.file
            });
        }
    });
};


/**
 * Create a Newabout
 */
 //Unused in favor of AWS
exports.create = function (req, res) {
    var newabout = new Newabout(req.body);
    newabout.user = req.user;

    newabout.imageURL = config.uploads.aboutUpload.dest + newabout.filename;

    newabout.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(newabout);
        }
    });
};

/**
 * Show the current Newabout
 */
exports.read = function (req, res) {
    // convert mongoose document to JSON
    var newabout = req.newabout ? req.newabout.toJSON() : {};

    // Add a custom field to the Article, for determining if the current User is the "owner".
    // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
    newabout.isCurrentUserOwner = req.user && newabout.user && newabout.user._id.toString() === req.user._id.toString();

    res.jsonp(newabout);
};

/**
 * Update a Newabout
 */
exports.update = function (req, res) {
    var newabout = req.newabout;
    newabout = _.extend(newabout, req.body);    //create object based on request params


    newabout.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(newabout);
        }
    });
};

/**
 * Delete an Newabout
 */
exports.delete = function (req, res) {
    var newabout = req.newabout;

    newabout.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(newabout);
        }
    });
};

/**
 * List of Newabouts
 */
exports.list = function (req, res) {
    Newabout.find().sort('-created').populate('user', 'displayName').exec(function (err, newabouts) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(newabouts);
        }
    });
};

/**
 * Newabout middleware
 */
exports.newaboutByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Newabout is invalid'
        });
    }

    Newabout.findById(id).populate('user', 'displayName').exec(function (err, newabout) {
        if (err) {
            return next(err);
        } else if (!newabout) {
            return res.status(404).send({
                message: 'No Newabout with that identifier has been found'
            });
        }
        req.newabout = newabout;
        next();
    });
};
