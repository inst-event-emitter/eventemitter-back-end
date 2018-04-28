const sinon = require('sinon');

describe('DELETE /api/v1/events/:id resource', () => {
  context('when ID is specified', () => {
    let response;

    before(async () => {
      sinon.stub(global.elasticSearchClient, 'delete').callsFake(() => Promise.resolve());

      response = await global.app.delete('/api/v1/events/123');
    });

    after(() => {
      global.elasticSearchClient.delete.restore();
    });

    it('should delete event and return status code 202', async () => {
      expect(response.status).to.be.equal(202);
    });
  });

  context('when ID is not specified', () => {
    let response;

    before(async () => {
      sinon.stub(global.elasticSearchClient, 'delete').callsFake(() => Promise.resolve());

      response = await global.app.delete('/api/v1/events/');
    });

    after(() => {
      global.elasticSearchClient.delete.restore();
    });

    it('should return status code 400', async () => {
      expect(response.status).to.be.equal(404);
    });
  });
});
