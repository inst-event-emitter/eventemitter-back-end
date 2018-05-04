[![Build Status](https://travis-ci.org/inst-event-emitter/eventemitter-backend.svg?branch=master)](https://travis-ci.org/inst-event-emitter/eventemitter-backend)

# Event Emitter backend

## Testing

Before test please run:

`docker-compose -f docker-compose.test.yml up`

This command creates elastic search container.
You may connect to Elasticsearch through 127.0.0.1:9200 or 127.0.0.1:9300.

To ensure that container is running:

`docker-compose -f docker-compose.test.yml ps`

When container is up for the first time, you should create index in the elasticsearch:

```
  curl -X PUT \
  -H "Content-Type: application/json" \
  -d @elasticsearch/template.json \
  http://localhost:9200/event-emitter-test
```
    
 Then you can run all tests locally by executing `npm test` or `yarn test` command.
 