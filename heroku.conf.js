'use strict';

// Protractor configuration
var config = {
	framework: 'jasmine',
  	//seleniumAddress: 'http://localhost:4444/wd/hub',
  	specs: ['heroku.spec.js']
};

// if (process.env.TRAVIS) {
//   config.capabilities = {
//     browserName: 'firefox'
//   };
// }

exports.config = config;
