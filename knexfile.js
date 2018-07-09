'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/nox'
  },
	production: {
    client: 'pg',
    connection:  process.env.DB_URL

	}
};
