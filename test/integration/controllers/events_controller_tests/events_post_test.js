const sinon = require('sinon');

describe('POST /api/v1/events resource', () => {
  context('when send with new event data', () => {
    let response;

    before(async () => {
      sinon.stub(global.elasticSearchClient, 'create').callsFake(() => Promise.resolve());

      response = await global.app.post('/api/v1/events').send({
        name: 'test name',
        description: 'test description',
        date: '2018-04-05 13:00'
      });
    });

    after(() => {
      global.elasticSearchClient.create.restore();
    });

    it('should create event and return status code 201', async () => {
      expect(response.status).to.be.equal(201);
    });
  });

  context('when send without data', () => {
    let response;

    before(async () => {
      sinon.stub(global.elasticSearchClient, 'create').callsFake(() => Promise.resolve());

      response = await global.app.post('/api/v1/events');
    });

    after(() => {
      global.elasticSearchClient.create.restore();
    });

    it('should return status code 400', async () => {
      expect(response.status).to.be.equal(400);
    });
  });
});
