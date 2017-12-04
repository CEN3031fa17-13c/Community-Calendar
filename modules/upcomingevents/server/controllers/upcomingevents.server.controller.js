'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Upcomingevent = mongoose.model('Upcomingevent'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    multer = require('multer'),
    config = require(path.resolve('./config/config')),
    fs = require('fs'),
    _ = require('lodash'),
    aws = require('aws-sdk'),
    uuid = require('node-uuid');//creates unique ids


exports.uploadImage = function (req, res) { //used for server uploading
    var message = null;

    var upload = multer(config.uploads.upcomingEventUpload).single('newEventPicture');
    var upcomingEventUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;


    // Filtering to upload only images
    upload.fileFilter = upcomingEventUploadFileFilter;

    upload(req, res, function (uploadError) {
        if (uploadError) {
            return res.status(400).send({
                message: 'Error occurred while uploading upcoming event picture'
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
 * Create a Upcomingevent
 */
exports.create = function (req, res) {
    var upcomingevent = new Upcomingevent(req.body);
    upcomingevent.user = req.user;
    upcomingevent.contact = {
        email: req.user.email,
        phone_number: req.user.phone_number
    };

    upcomingevent.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(upcomingevent);
        }
    });
};

/**
 * Show the current Upcomingevent
 */
exports.read = function (req, res) {
    // convert mongoose document to JSON
    var upcomingevent = req.upcomingevent ? req.upcomingevent.toJSON() : {};

    // Add a custom field to the Article, for determining if the current User is the "owner".
    // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
    upcomingevent.isCurrentUserOwner = req.user && upcomingevent.user && upcomingevent.user._id.toString() === req.user._id.toString();

    res.jsonp(upcomingevent);
};

/**
 * Update a Upcomingevent
 */
exports.update = function (req, res) {

    var upcomingevent = req.upcomingevent;
    upcomingevent = _.extend(upcomingevent, req.body);
    if (req.user.roles == 'user') {
        var contact = {
            email: req.user.email,
            phone_number: req.user.phone_number
        };
        upcomingevent.contact = contact;
    }
    
    upcomingevent.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(upcomingevent);
        }
    });
};

/**
 * Delete an Upcomingevent
 */
exports.delete = function (req, res) {
    var upcomingevent = req.upcomingevent;

    upcomingevent.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(upcomingevent);
        }
    });
};

/**
 * List of Upcomingevents
 */
exports.list = function (req, res) {
    Upcomingevent.find().sort('-created').populate('user', 'displayName').exec(function (err, upcomingevents) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(upcomingevents);
        }
    });
};

exports.signS3 = function(req, res){    //for this function to work, set AWS variables in environment
    const s3 = new aws.S3({             //TODO take in key of old image objects and delete
        region: 'us-east-1', 
        credentials: {
            "accessKeyId": config.aws.AWS_ACCESS_KEY_ID,
            "secretAccessKey": config.aws.AWS_SECRET_ACCESS_KEY
        }
    });
        const fileName = uuid.v4();
        const fileType = req.params.filetype;
        res.end();

        const s3Params = {
        Bucket: 'community-calendar',
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
        };

    s3.getSignedUrl('putObject', s3Params, (err, data) => { //get signed URL
        if(err){
            console.log(err);
            return res.end();
        }
        const returnData = {
            signedRequest: data,
            url: `https://community-calendar.s3.amazonaws.com/${s3Params.Key}`
        };
        res.write(JSON.stringify(returnData));
        res.end();
    });
};

/**
 * Upcomingevent middleware
 */
exports.upcomingeventByID = function (req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Upcomingevent is invalid'
        });
    }

    Upcomingevent.findById(id).populate('user', 'displayName').exec(function (err, upcomingevent) {
        if (err) {
            return next(err);
        } else if (!upcomingevent) {
            return res.status(404).send({
                message: 'No Upcomingevent with that identifier has been found'
            });
        }
        req.upcomingevent = upcomingevent;
        next();
    });
};
