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
var db = require('../lib/mongo');
var Moment = require('../lib/moment');
var requireAuth = require('../lib/requireAuth');

router.use(requireAuth);

router.get('/', function(req, res) {
	res.send('Got a GET request for /moment/');
});

router.post('/', function(req, res, params) {
	// sanity checks

	if (!req.body.timestamp) {
		res.setHeader('Content-Type', 'text/plain');
		res.writeHead(400);
		res.end('Expected a "timestamp" key.');
		return;
	}

	if (!req.body.content) {
		res.setHeader('Content-Type', 'text/plain');
		res.writeHead(400);
		res.end('Expected a "content" key.');
		return;
	}

	// TODO deal with user stuff

	var moment = new Moment({
		timestamp: req.body.timestamp,
		content: req.body.content
	});

	moment.save(function(err, momentDoc) {
		if (err) {
			res.writeHead(500);
			res.end(err.toString(), function() {
				throw err;
			});
			return;
		}

		res.writeHead(201);
		res.end('{"id":' + momentDoc.id + '}');
	});
});

router.get('/:id', function(req, res) {
	Moment.findById(req.params.id, function(err, moment) {
		if (err) {
			res.setHeader('Content-Type', 'text/plain');
			res.writeHead(500);
			res.end(err.toString(), function() {
				throw err;
			});
			return;
		}

		if (!moment) {
			res.writeHead(404);
			// TODO write something useful to the response body
			res.end();
			return;
		}

		var response = {};

		response.id = moment._id;
		response.content = moment.content || '';
		response.timestamp = moment.timestamp;

		res.setHeader('Content-Type', 'application/json');
		res.writeHead(200);
		res.end(JSON.stringify(response));
	});
});

router.delete('/:id', function(req, res) {
	Moment.findById(req.params.id, function(err, moment) {
		if (err) {
			res.setHeader('Content-Type', 'text/plain');
			res.writeHead(500);
			res.end(err.toString(), function() {
				throw err;
			});
			return;
		}

		if (!moment) {
			res.writeHead(404);
			// TODO write something useful to the response body
			res.end();
			return;
		}

		moment.remove(function(err) {
			if (err) {
				res.setHeader('Content-Type', 'text/plain');
				res.writeHead(500);
				res.end(err.toString(), function() {
					throw err;
				});
				return;
			}

			res.writeHead(204);
			res.end();
		});
	});
});

module.exports = router;
