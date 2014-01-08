var hapi = require('hapi')
	, routes = require('./config/routes')
	, port = process.env.PORT || 4000
	, config = { docs: true }
	, http = new hapi.Server('0.0.0.0', port, config); 

http.addRoutes(routes);

console.log('starting server on port %s', port);
http.start();