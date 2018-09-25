'use strict';
const restify = require('restify');
const bodyParser = require('body-parser');

const server = restify.createServer({
    name: 'Project UKI',
    version: '1.0.0'
});

server.use(bodyParser.json());

require('./components/routes/routes')(server);

global.config = require('./components/configurations/config');

server.listen(config.port, function () {
    console.log('%s listen di %s', server.name, server.url);
});