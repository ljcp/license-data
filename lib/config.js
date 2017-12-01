var rc = require('rc')

var config = module.exports = rc('license-report', {

	/*
		possible outputs:

		json || table || csv
	*/
	output: 'json', 

	/*
		if output is csv
	*/
	delimiter: ',',

	/*
		export deps or dev deps. falsey -> output everything
	*/
	only: null,

	/*
		npm registry url
	*/
	registry: 'https://registry.npmjs.org/',

	/*
		an array of package names that will be excluded from the  report
	*/	
	exclude: [],

	/*
		fields participating in the report and their order
	*/
	fields: [
		'licenseType',
		'homePage',
		'name',
		'version'
	],

	version: {
		value: '',
		label: 'version'
	},

    name: {
        value: '',
        label: 'name'
    },

	licenseType: {
		value: 'MIT',
		label: 'license type'
	},
    homePage: {
		value: '',
		label: 'homePage'
	},
	httpRetryOptions: {
		maxAttempts: 5,
		delay: 1000
	}
})
