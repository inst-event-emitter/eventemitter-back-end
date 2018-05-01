const { head } = require('lodash');

const { getTypeAndIndex } = require('../../../../app/services/elasticSearch');
const { createDocuments, removeDocuments } = require('../../helpers/elasticsearch_helper');
const EventFactory = require('../../helpers/factories/event');

describe('GET /api/v1/events resource', () => {
  context('when call without query params', () => {
    let response;
    const eventCount = 5;
    const { index, type } = getTypeAndIndex('event');
    const events = EventFactory.buildList(eventCount);

    before(async () => {
      await createDocuments(events, index, type);

      response = await global.app.get('/api/v1/events');
    });

    after(async () => {
      await removeDocuments(events, index, type);
    });

    it('should return status code 200', async () => {
      expect(response.status).to.be.equal(200);
    });

    it(`should respond ${eventCount} events`, async () => {
      expect(response.body).to.have.property('events').that.is.an('array');
      expect(response.body.events).to.have.lengthOf(eventCount);
      expect(response.body).to.have.property('total').that.is.a('number');

      const eventKeys = ['id', 'name', 'description', 'date'];
      expect(head(response.body.events)).to.include.all.keys(eventKeys);
    });
  });
});
