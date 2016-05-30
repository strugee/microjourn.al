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
var methodNotAllowed = require('../lib/methodNotAllowed');
var sanityCheck = require('../lib/momentSanityCheck');
var createMoment = require('../lib/createMoment');

router.use(requireAuth);

router.get('/', function(req, res, next) {
	// TODO: limit query to user

	var query = Moment.find({});

	query.setOptions({
		sort: {
			timestamp: -1
		}
	});

	if (req.query.num) {
		var num = Number(req.query.num);

		if (Number.isNaN(num) || !Number.isInteger(num)) {
			res.writeHead(400);
			res.end(req.query.num + ' is not an integer');
			return;
		}

		query = query.limit(num);
	}

	query.exec(function(err, docs) {
		if (err) {
			next(err);
			return;
		}

		var response = [];

		docs.forEach(function(doc) {
			response.push({
				id: doc.id,
				timestamp: doc.timestamp,
				content: doc.content
			});
		});

		res.end(JSON.stringify(response));
	});
});

router.post('/', function(req, res, next) {
	// sanity checks

	if (!sanityCheck(req, res)) {
		return;
	}

	createMoment(req, res, next);
});

router.all('/', methodNotAllowed);

router.get('/:id', function(req, res, next) {
	Moment.findById(req.params.id, function(err, moment) {
		if (err) {
			next(err);
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

router.delete('/:id', function(req, res, next) {
	// TODO: should this return 410 Gone?
	Moment.findById(req.params.id, function(err, moment) {
		if (err) {
			next(err);
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
				next(err);
				return;
			}

			res.writeHead(204);
			res.end();
		});
	});
});

router.put('/:id', function(req, res, next) {
	// sanity checks

	if (!sanityCheck(req, res)) {
		return;
	}

	// Try to find an existing moment first - important because status codes
	Moment.findById(req.params.id, function(err, moment) {
		if (err) {
			next(err);
			return;
		}

		if (!moment) {
			// Reconciling ObjectIDs with custom moment names is difficult, so for now we punt
			// This is TODO
			res.writeHead(405);
			res.end('Cannot create moment with custom name');
			return;
		}

		// There was an existing moment, so we update it
		moment.timestamp = req.body.timestamp;
		moment.content = req.body.content;

		moment.save(function(err, momentDoc) {
			if (err) {
				next(err);
				return;
			}

			res.writeHead(204);
			res.end();
		});
	});
});

// TODO: handle 405 Method Not Allowed

module.exports = router;
