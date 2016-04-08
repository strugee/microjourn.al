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

// lib/methodNotAllowed.js - middleware that returns 405 Method Not Allowed.
//  Useful for mounting at the very end of a route as a fallback.

module.exports = function(req, res, params) {
	// TODO return an Allow header field, per RFC 7231
	res.setHeader('Content-Type', 'text/plain');
	res.writeHead(405);
	res.end('The requested method ' + req.method + ' is not allowed for the URL ' + req.originalUrl + '.');
};
