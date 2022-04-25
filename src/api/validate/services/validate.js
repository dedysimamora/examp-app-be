'use strict';

/**
 * validate service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::validate.validate');
