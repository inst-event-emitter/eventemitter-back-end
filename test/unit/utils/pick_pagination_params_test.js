const { BadRequest } = require('http-errors');

const pickPaginationPparams = require('../../../app/utils/pick_pagination_params');

describe('Util: pick_pagination_params.js', () => {
  context('when pass valid query', () => {
    it('should return expected params', () => {
      expect(pickPaginationPparams({ limit: 20, offset: 10 }))
        .to.deep.eq({ limit: 20, offset: 10 });
    });
  });

  context('when limit is not number', () => {
    it('should throw an error', () => {
      expect(pickPaginationPparams.bind(null, { limit: 'string', offset: 10 }))
        .to.throw(BadRequest);
    });
  });

  context('when offset is not number', () => {
    it('should throw an error', () => {
      expect(pickPaginationPparams.bind(null, { limit: 20, offset: 'string' }))
        .to.throw(BadRequest);
    });
  });

  context('when limit is negative', () => {
    it('should throw an error', () => {
      expect(pickPaginationPparams.bind(null, { limit: -20, offset: 10 }))
        .to.throw(BadRequest);
    });
  });

  context('when offset is negative', () => {
    it('should throw an error', () => {
      expect(pickPaginationPparams.bind(null, { limit: 20, offset: -10 }))
        .to.throw(BadRequest);
    });
  });
});
