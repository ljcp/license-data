var semver = require('semver')
var util = require('util')
var _ = require('lodash')
var getPackageJson = require('./getPackageJson.js')
var extractLink = require('./extractLink.js')
var extractLicense = require('./extractLicense.js')

module.exports = getPackageReportData

/*
	collect the data for a single package
*/
function getPackageReportData(package, versionRangeOrCallback, callback) {
	var versionRange = versionRangeOrCallback
	if (arguments.length === 2) {
		var split = package.split('@')
		
		if (split.length !== 2) {
			throw new Error('invalid package: ' + package)
		}

		callback = versionRangeOrCallback
		package = split[0]
		versionRange = split[1]
	}

	if (typeof callback !== 'function') {
		throw new Error('missing callback argument')
	}
	
	versionRange = semver.validRange(versionRange)

	if (!versionRange) {
		//console.log(util.format('skipping %s (invalid semversion)', package));
		var message = "";
		
		return callback(null, { name: package, comment: message })
	}

	getPackageJson(package, function(err, json) {
		if (err) return callback(err)

		// dont think it is possible but just to make sure.
		if (!json.versions) {
			return callback(new Error('no versions in registry for package ' + package))
		}

		// find the right version for this package
		var versions = _.keys(json.versions)

		var version = semver.maxSatisfying(versions, versionRange)

		if (!version) {
			return callback(new Error('cannot find a version that satisfies range ' + versionRange + ' in the registry'))
		}

		getPackageJson(package, version, function(err, json) {
			if (err) return callback(err)

			/*
				finally, callback with all the data
			*/
			callback(null, { 
				name: package,
				licenseType: extractLicense(json),
				homePage: extractLink(json),
				version: version.toString()
			})
		})
	})
}