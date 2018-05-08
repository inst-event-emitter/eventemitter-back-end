const bodybuilder = require('bodybuilder');
const { get, isEmpty } = require('lodash');

const pickPaginationParameters = require('./pick_pagination_params');

module.exports = class EventQueryBuilder {
  constructor(query) {
    this.query = query;
    this.body = bodybuilder();
  }

  static create(query) {
    return new EventQueryBuilder(query);
  }

  withName() {
    const name = String(get(this.query, 'name', '')).trim();
    if (!isEmpty(name)) {
      this.body.query('match', 'name', name);
    }

    return this;
  }

  withDescription() {
    const description = String(get(this.query, 'description', '')).trim();
    if (!isEmpty(description)) {
      this.body.query('match', 'description', description);
    }

    return this;
  }

  withPagination() {
    const { limit, offset } = pickPaginationParameters(this.query, { limit: 10, offset: 0 });

    this.body.from(offset).size(limit);

    return this;
  }

  withDateRange() {
    const { fromDate = null, toDate = null } = this.query;

    this.body.query('range', 'date', { gte: fromDate, lte: toDate, format: 'epoch_second' });

    return this;
  }

  build() {
    return this.body.build();
  }
};
