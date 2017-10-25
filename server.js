var express = require('express'),
    bp = require('body-parser'),
    path = require('path'),
    port = 8000,
    app = express();
    session = require('express-session');

app.use(session({
    secret: 'mysecretestsecret',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}))

app.use(bp.json());

app.use(express.static(__dirname + '/client/dist'))

require('./server/config/mongoose');
var routes_setter = require('./server/config/routes.js');
// invoke the function stored in routes_setter and pass it the "app" variable
routes_setter(app);

app.listen(8000, function(){
    console.log('listening on port 8000...')
})