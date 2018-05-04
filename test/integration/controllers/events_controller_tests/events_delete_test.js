const { get } = require('lodash');

const { getTypeAndIndex } = require('../../../../app/services/elasticSearch');
const { createDocuments, removeDocuments } = require('../../helpers/elasticsearch_helper');
const EventFactory = require('../../helpers/factories/event');

describe('DELETE /api/v1/events/:id resource', () => {
  context('when ID is specified', () => {
    let response;
    const eventCount = 5;
    const { index, type } = getTypeAndIndex('event');
    const events = EventFactory.buildList(eventCount);

    before(async () => {
      await createDocuments(events, index, type);

      response = await global.app.delete(`/api/v1/events/${get(events, '0.id')}`);
    });

    after(async () => {
      await removeDocuments(events.slice(1), index, type);
    });

    it('should delete event and return status code 202', async () => {
      expect(response.status).to.be.equal(202);
    });
  });

  context('when ID is not specified', () => {
    let response;

    before(async () => {
      response = await global.app.delete('/api/v1/events/');
    });

    it('should return status code 404', () => {
      expect(response.status).to.be.equal(404);
    });
  });
});
