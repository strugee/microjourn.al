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

// routes/moment.js - routing handler for /moment

var express = require('express');
var router = express.Router();
var concat = require('concat-stream');
var db = require('../lib/mongo');
var Moment = require('../lib/moment');

//var concat = require('concat-stream');

router.get('/', function(req, res) {
	res.send('Got a GET request for /moment/');
});

router.get('/:id', function(req, res) {
	// TODO

	// db.get('SELECT * FROM moments WHERE id = ?;', req.params.id, function(err, row) {
	// 	if (err) {
	// 		res.writeHead(500);
	// 		res.end(err.toString(), function() {
	// 			throw err;
	// 		});
	// 	} else if (row === undefined) {
	// 		res.writeHead(404);
	// 		res.end();
	// 	} else {
	// 		res.writeHead(200);
	// 		res.write('{"active":');
	// 		if (row['active'] === 0) {
	// 			res.write('true');
	// 		} else {
	// 			res.write('false');
	// 		}
	// 		res.write(',"name":"' + row['name'] + '"}');
	// 		res.end();
	// 	}
	// });
});

router.post('/', function(req, res, params) {
	req.pipe(concat(function(buf) {
		var data;
		debugger;
		try {
			data = JSON.parse(buf.toString());
		} catch (e) {
			if (e instanceof SyntaxError) {
				res.writeHead(400);
				res.end(e.toString());
				return;
			} else {
				res.writeHead(500);
				res.end(e.toString(), function() {
					throw e;
				});
			}
		}

		// sanity checks

		if (!data.timestamp) {
			res.setHeader('Content-Type', 'text/plain');
			res.writeHead(400);
			res.end('Expected a "timestamp" key.');
		}

		if (!data.content) {
			res.setHeader('Content-Type', 'text/plain');
			res.writeHead(400);
			res.end('Expected a "content" key.');
		}

		var moment = new Moment({
			timestamp: data.timestamp,
			content: data.content
		});

		moment.save(function(err) {
			if (err) {
				res.writeHead(500);
				res.end(err.toString(), function() {
					throw err;
				});
			}

			res.writeHead(201);
			res.end('{"id":' + 'unknown' + '}');
		});
	}));
});

module.exports = router;
