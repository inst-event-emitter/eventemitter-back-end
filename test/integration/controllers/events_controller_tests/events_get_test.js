const sinon = require('sinon');
const { isEmpty, head } = require('lodash');

describe('GET /api/v1/events resource', () => {
  context('when call without query params', () => {
    let response;

    before(async () => {
      sinon.stub(global.elasticSearchClient, 'search').callsFake(() => Promise.resolve({
        hits: {
          hits: [{
            _id: '123',
            _source: {
              name: 'some event name',
              description: 'some event description',
              date: '2018-04-05 12:30'
            }
          }],
          total: 1
        }
      }));

      response = await global.app.get('/api/v1/events');
    });

    after(() => {
      global.elasticSearchClient.search.restore();
    });

    it('should return status code 200', async () => {
      expect(response.status).to.be.equal(200);
    });

    it('should respond events', async () => {
      expect(response.body).to.have.property('events').that.is.an('array');
      expect(response.body).to.have.property('total').that.is.a('number');

      if (!isEmpty(response.body.events)) {
        const eventKeys = ['id', 'name', 'date'];
        expect(head(response.body.events)).to.include.all.keys(eventKeys);
      }
    });
  });
});
