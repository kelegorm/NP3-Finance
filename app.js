var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// routes
routes(app);


// run application
mongoose.connect('mongodb://localhost:27017/finance', function(error) {
    if (error) {
        console.log('Mongoose.connect error: ' + error);
        return;
    }
    console.log('Connected to mongodb');

    http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
});