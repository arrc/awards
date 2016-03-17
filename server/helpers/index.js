'use strict';

let _ = require('lodash');

module.exports = _.extend(
  require('./create-record'),
  require('./scraper')
);
