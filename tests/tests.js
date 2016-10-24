// tests/tests.js
process.env.NODE_ENV = 'test';

var server = require('../index');
var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = chai.assert;

chai.use(chaiHttp);

require('./author')(chai, server, assert);
require('./book')(chai, server, assert);