/** 
 * This file is a sample of how to implement Middleware using express
 */

const { express } = require('express');
const app = express();

/**
 * Define a middleware: 
 * Any middleware can access this three params:
 * @param {Object} request 
 * @param {Object} response 
 * @param {Function} next
 */
function middleware(request, response, next) {

    const { method, url } = request;     
    const log = `[${method.toUpperCase()} - ${url}]`

    console.log(log);

    /**
     * Once the next function is returned the flow of execution 
     * goes back to the requested route:
     */
    return next();
}


// How to define which route will the middleware be listen to:

app.use(middleware) // any route in the system

app.use('/routes/:id', middleware); // any route that matches the argument


// only this route will be intercept by the middleware
app.get('/route', middleware, (request, response) => {
    return response.json();
});