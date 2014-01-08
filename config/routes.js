var Types = require('hapi').Types;


module.exports = [
    { 
    	method: 'GET', 
    	path: '/products', 
    	config: { 
    		handler: getProducts, 
    		query: { name: Types.String() } 
    	} 
    },{ 
    	method: 'GET', 
    	path: '/products/{id}', 
    	config: { 
    		handler: getProduct } 
    },{ 
    	method: 'POST', 
    	path: '/products', 
    	config: { 
    		handler: addProduct, 
    		payload: 'parse', 
    		schema: { 
    			name: Types.String().required().min(3) 
    		}, 
    		response: { 
    				id: Types.Number().required() 
    			} 
    	} 
   	},{
   		method: 'GET',
   		path: '/testing/{args}',
   		config: {
   			handler: justPrintSomething
   		}
   	}
];

function justPrintSomething(request){
	console.log(request.params.args);
	request.reply('Done.');
}

function getProducts(request) {

    if (request.query.name) {
        request.reply(findProducts(request.query.name));
    }
    else {
        request.reply(products);
    }
}

function findProducts(name) {
    return products.filter(function(product) {
        return product.name.toLowerCase() === name.toLowerCase();
    });
}

function getProduct(request) {
    var product = products.filter(function(p) {
        return p.id == request.params.id;
    }).pop();

    request.reply(product);
}

function addProduct(request) {
    var product = {
        id: products[products.length - 1].id + 1,
        name: request.payload.name
    };

    products.push(product);

    request.reply.created('/products/' + product.id)({
        id: product.id
    });
}


var products = [{
        id: 1,
        name: 'Guitar'
    },
    {
        id: 2,
        name: 'Banjo'
    }
];