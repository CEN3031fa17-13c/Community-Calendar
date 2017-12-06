'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Newabout Schema
 * Save About field to the DB.
 */
var NewaboutSchema = new Schema({
    title: {
        type: String,
        default: 'About Community Calendar',
        required: 'Please fill about title',
        trim: true
    },
    textTitle: {
        type: String,
        default: 'Welcome to Community Calendar!.',
        required: 'Please fill about text title',
        trim: true
    },
    text: {
        type: String,
        default: 'We are a ticketing and registration website that focuses on allowing companies and organizations to\n' +
        '                  promote their events on a very affordable budget. Founded in 2017, local community members of\n' +
        '                  Tallahassee, FL partner to encourage support and exposure to the major events happening right here in\n' +
        '                  the Capital City we are proud to present to you our Community Calendar. Designed to make marketing\n' +
        '                  less stressful and more effective, Community Calendar is committed to enhancing community members\n' +
        '                  capitalization citywide while marketing on a budget!!',
        required: 'Please fill about text',
        trim: true
    },
    filename: {
        type: String,
        default: ''
    },
    imageURL: {
        type: String,
        default: 'modules/newabouts/client/img/aboutImages/default.png'
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Newabout', NewaboutSchema);
