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
var startApp = require('./lib/start-app.js');

var server;

before('setup the app', function() {
	server = startApp();
});

after('tear down the app', function() {
	server.close();
});

describe('/moment route', function() {
	it('should reject unauthorized requests', function(done) {
		http.get('http://localhost:52472/moment/', function(res) {
			assert.isEqual(res.body, 'Expected an Authorization header.');
			done();
		});
	});
});
