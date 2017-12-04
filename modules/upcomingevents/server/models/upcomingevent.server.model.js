'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Upcomingevent Schema
 */
var UpcomingeventSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill upcoming event name',
        trim: true
    },
    organization: {
        type: String,
        default: '',
        required: 'Please fill upcoming event organization',
        trim: true
    },
    location: {
        type: String,
        default: '',
        required: 'Please fill upcoming event location',
        trim: true
    },
    eventDuration: {
        startDate: {
            type: Date,
            required: 'Please fill upcoming event duration',
            trim: true
        },
        endDate: {
            type: Date,
            required: 'Please fill upcoming event duration',
            trim: true
        }
    },
    category: {
        type: String,
        default: '',
        required: 'Please select upcoming event category',
        trim: true
    },
    dress_code: {
        type: String,
        default: '',
        required: 'Please select upcoming event dress code',
        trim: true
    },
    description: {
        type: String,
        default: '',
        required: 'Please fill upcoming event description',
        trim: true
    },
    coordinates: {
        latitude: Number,
        longitude: Number
    },
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    contact: {
        email: String,
        phone_number: Number
    },
    filename: {
        type: String,
        default: ''
    },
    imageURL: {
        type: String,
        default: 'modules/upcomingevents/client/img/eventImages/default.png'
    },
    filenameList: {type: [String]},
    imageURLList: {type: [String]},
    videoURL: {
        type: String,
        default: '',
        trim: true
    },
    likes: {
        type: Number,
        default: 0,
    },
    likedby: {type: [String]}
});

mongoose.model('Upcomingevent', UpcomingeventSchema);
