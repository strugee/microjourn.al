/*

 Copyright 2015 Alex Jordan <alex@strugee.net>.

 This file is part of microjourn.al.

 microjourn.al is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 microjourn.al is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with microjourn.al.  If not, see <http://www.gnu.org/licenses/>.

 */

// test/route-moment.js - tests for /moment

var assert = require('assert');
var http = require('http');
var request = require('superagent');
var startApp = require('./lib/start-app.js');

var server;

module.exports = {
	before: function() {
		server = startApp();
	},

	after: function() {
		server.close();
	},

	'/moment route': {
		'unauthorized request rejection': {
			'should return the proper status code': function(done) {
				request.get('http://localhost:52472/moments/').end(function(err, res) {
					assert.equal(res.statusCode, 401);
					done();
				});
			},
			'should return the proper Content-Type': function(done) {
				request.get('http://localhost:52472/moments/').end(function(err, res) {
					assert.equal(res.headers['content-type'], 'text/plain');
					done();
				});
			},
			'should return the proper response body message': function(done) {
				request.get('http://localhost:52472/moments/').end(function(err, res) {
					assert.equal(res.text, 'Expected an Authorization header.');
					done();
				});
			}
		},
		'GET on a nonexistant resource': {
			'should return the proper status code': function(done) {
				request.get('http://localhost:52472/moments/', function(err, res) {
					assert.equal(res.statusCode, 401);
					done();
				});
			},
			'should return the proper Content-Type': function(done) {
				request.get('http://localhost:52472/moments/', function(err, res) {
					assert.equal(res.headers['content-type'], 'text/plain');
					done();
				});
			}
		},
		'POST to /moments/ without a timestamp key': {
			'should return the proper status code': null,
			'should return the proper Content-Type': null,
			'should include the proper response body message': null
		},
		'POST to /moments/ without a content key': {
			'should return the proper status code': null,
			'should return the proper Content-Type': null,
			'should include the proper response body message': null
		},
		'POST to /moments/': {
			'should return the proper status code': null,
			'should return the proper Content-Type': null,
			'should return parseable JSON in the body': null,
			'should include the id in the body': null
		},
		'GET from /moments/:id': {
			'should return the proper status code': null,
			'should return the proper Content-Type': null,
			'should return parseable JSON in the body': null,
			'should include the id in the body': null,
			'should include the content in the body': null,
			'should include the timestamp in the body': null
		},
		'HEAD from /moments/:id': {
			'should return the proper status code': null,
			'should return the proper Content-Type': null,
			'should return parseable JSON in the body': null,
			'should return an empty body': null
		},
		'POST to /moments/:id': {
			'should return the proper status code': null,
			'should return the proper Content-Type': null
		},
		'CONNECT to /moments/:id': {
			'should return the proper status code': null,
			'should return the proper Content-Type': null,
			'should return the proper response body message': null
		},
		'PUT to /moments/:id without a timestamp key': {
			'should return the proper status code': null,
			'should return the proper Content-Type': null,
			'should return the proper response body message': null
		},
		'PUT to /moments/:id without a timestamp key': {
			'should return the proper status code': null,
			'should return the proper Content-Type': null,
			'should return the proper response body message': null
		},
		'PUT to /moments/:id': {
			'should return the proper status code': null,
			'should not return a Content-Type': null,
			'should return an empty body': null
		},
		'GET to /moments/:id after PUT': {
			'should include the id in the body': null,
			'should include the new content in the body': null,
			'should include the new timestamp in the body': null
		},
		'DELETE to /moments/:id': {
			'should return the proper status code': null,
			'should not return a Content-Type': null,
			'should return an empty body': null
		},
		'GET to /moments/:id after DELETE': {
			'should return the proper status code': null
		},
		'PUT to a non-existant /moments/:id': {
			'should return the proper status code': null,
			'should return the proper Content-Type': null,
			'should return the proper response body message': null
		}
	}
};
