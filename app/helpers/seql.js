/* eslint-disable no-restricted-globals */
const constants = require('../constants');
const _ = require('lodash');

exports.getRawParams = (dataParams, attributes) => {
  const where = {};
  _.each(_.keys(dataParams), (key) => {
      if (attributes[key]) {
          where[key] = dataParams[key];
      }
  });
  return where;
};


exports.getPaginationOptions = (params = {}) => {
  if (params.limit && params.limit === constants.pagination.ALL) {
    return {};
  }
  const pagination = { limit: constants.pagination.DEFAULT_LIMIT, offset: 0 };
  if (params.limit && !isNaN(params.limit)) {
    pagination.limit = parseInt(params.limit, 10);
  }
  if (params.page && !isNaN(params.page)) {
    pagination.offset = (parseInt(params.page, 10) - 1) * pagination.limit;
  }
  return pagination;
};

exports.generateSearchQuery = (dataParams, attributes) => {
  const where = {};
  _.each(_.keys(dataParams), (key) => {
    if (attributes[key]) {
      where[key] = { $iLike: `%${dataParams[key]}%` };
    }
  });
  return where;
};

