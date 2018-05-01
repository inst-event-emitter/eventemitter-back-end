const chai = require('chai');
const supertest = require('supertest');
require('../app/utils/initializer');

const { initApp, app } = require('../app/server');
const { elasticSearchClient } = require('../app/services/elasticSearch');

initApp();
chai.should();

global.expect = chai.expect;
global.app = supertest.agent(app);
global.elasticSearchClient = elasticSearchClient;
