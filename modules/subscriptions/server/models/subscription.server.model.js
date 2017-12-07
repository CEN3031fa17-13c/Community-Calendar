 'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    validator = require('validator'),
    Schema = mongoose.Schema;

/**
 * A Validation function for local strategy email
 */
var validateLocalStrategyEmail = function (email) {
    return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email));
};

/**
 * Subscription Schema
 * Save subscriber emails.
 */
var SubscriptionSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        default: '',
        validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Subscription', SubscriptionSchema);
