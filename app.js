var Hapi = require('hapi')
	,Port = process.env.PORT || 4000
	,Server = Hapi.createServer('0.0.0.0', Port);


var drivers = [ { driverid: 1, car: 3, active: true}
			   ,{ driverid: 2, car: 2, active: true}
			   ,{ driverid: 3, car: 2, active: false} ],
	users = [ {userid: 1, lastLoginTime: '', lastLoginLocation: { lat: 37.79947, lng: -122.511635 }, lastTripId: 3214, firstName: 'Sherlock', lastName: 'Holmes'}];


Server.route([{
  	method: 'GET'
	, path: '/'
	, handler: function(req) {
    	req.reply('Home');
  	  }
	},{
	  method: 'GET'
	, path: '/drivers'
	, handler: function(req) {
    	req.reply(drivers);
      }	
	},{
		/* get driver by Id */
		method: 'GET'
		, path: '/driver/{id?}'
		, handler: function(req) {
		    if (req.params.id) {
		      if (drivers.length <= req.params.id)
		        return req.reply('Couldn\'t find that driver.').code(404);
		      
		      return req.reply(drivers[req.params.id]);
		    }
		    req.reply(drivers);
		  }
	},{
		/* check if driver is active */
		method: 'GET'
		, path: '/drivers/{active}'
		, handler: function(req) {
			if (req.params.id){
				if (drivers.length <= req.params.id)
		        	return req.reply('Couldn\'t find that driver.').code(404);
		      	
		      	if (req.params.active){
		      		return req.reply('Drive is active').code(200);
		      	}else{
		      		return req.reply('Drive is NOT active').code(200);
		      	}
			}
		}

	}

]);


console.log('Starting server listen to %s', Port);
Server.start();


