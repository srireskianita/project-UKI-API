'use strict';
const restify = require('restify');
const bodyParser = require('body-parser');

const corsMiddleWare = require('restify-cors-middleware');

const server = restify.createServer({
    name: 'Project UKI',
    version: '1.0.0'
});

const cors = corsMiddleWare({
    origins: ['*'],
    allowHeaders: ['UKI-App-Version'],
    exposeHeaders: []
});

server.pre(cors.preflight);
server.use(cors.actual);

server.use(bodyParser.json());

require('./components/routes/routes')(server);

global.config = require('./components/configurations/config');

server.listen(config.port, function () {
    console.log('%s listen di %s', server.name, server.url);
});