/*

 Copyright 2015 Alex Jordan <alex@strugee.net>.

 This file is part of microjourn.al.

 microjourn.al is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.

 microjourn.al is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public
 License along with microjourn.al.  If not, see
 <http://www.gnu.org/licenses/>.

 */

// routes/user.js - routing handler for /user

var express = require('express');
var router = express.Router();
var db = require('../lib/mongo');

router.get('/', function(req, res) {
	res.send('Got a GET request for /user/');
});

router.get('/:id', function(req, res) {

});

router.post('/', function(req, res, params) {
});

module.exports = router;
