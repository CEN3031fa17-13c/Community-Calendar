'use strict';

// Protractor configuration
var config = {
	framework: 'jasmine',
  	//seleniumAddress: 'http://localhost:4444/wd/hub',
  	// specs: ['modules/*/tests/e2e/*.js']
	specs: ['modules/upcomingevents/tests/e2e/event-spec-login.js']

};

// if (process.env.TRAVIS) {
//   config.capabilities = {
//     browserName: 'firefox'
//   };
// }

exports.config = config;
