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
var concat = require('concat-stream');
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
				http.get('http://localhost:52472/moments/', function(res) {
					assert.equal(res.statusCode, 401);
					done();
				});
			},
			'should return the proper Content-Type': function(done) {
				http.get('http://localhost:52472/moments/', function(res) {
					assert.equal(res.headers['content-type'], 'text/plain');
					done();
				});
			},
			'should return the proper response body message': function(done) {
				http.get('http://localhost:52472/moments/', function(res) {
					res.pipe(concat(function(buf) {
						assert.equal(buf.toString(), 'Expected an Authorization header.');
						done();
					}));
				});
			}
		}
	}
};
