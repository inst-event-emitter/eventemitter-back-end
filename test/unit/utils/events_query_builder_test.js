const EventsQueryBuilder = require('../../../app/utils/events_query_builder');

describe('Util: events_query_builder.js', () => {
  context('when call create method', () => {
    it('should return instance of EventQueryBuilder', () => {
      const builder = EventsQueryBuilder.create();

      expect(builder).to.be.an.instanceof(EventsQueryBuilder);
    });
  });

  context('when call query builder methods', () => {
    it('should return expected query', () => {
      const query = {
        name: 'test-name  ',
        description: ' test-description',
        limit: 20,
        offset: 10
      };
      const body = EventsQueryBuilder.create(query)
        .withName()
        .withDescription()
        .withPagination()
        .build();

      expect(body).to.deep.eq({
        from: 10,
        size: 20,
        query: {
          bool: {
            must: [{
              match: {
                name: 'test-name',
              }
            }, {
              match: {
                description: 'test-description'
              }
            }]
          }
        }
      });
    });
  });
});
