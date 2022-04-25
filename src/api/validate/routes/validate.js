'use strict';

/**
 * validate router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::validate.validate');
