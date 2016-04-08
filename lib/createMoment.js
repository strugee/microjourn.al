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

// lib/createMoment.js - creates a moment in the db and sends appropriate responses

var Moment = require('../lib/moment');

module.exports = function(req, res, next) {
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
		}

		res.writeHead(201);
		res.end('{"id":' + momentDoc.id + '}');
	});
};
