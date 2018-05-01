const createBulkActionDescription = (document, _index, _type) => ({
  _index,
  _type,
  _id: document.id,
});

const createDocuments = (documents = [], index, type) => {
  const body = documents.reduce((result, document) => [
    ...result,
    { create: createBulkActionDescription(document, index, type) },
    document,
  ], []);

  return global.elasticSearchClient.bulk({
    refresh: true,
    body,
  });
};

const removeDocuments = (documents = [], index, type) => {
  const body = documents.reduce((result, document) => [
    ...result,
    { delete: createBulkActionDescription(document, index, type) },
  ], []);

  return global.elasticSearchClient.bulk({
    refresh: true,
    body,
  });
};

module.exports = {
  createDocuments,
  removeDocuments
};
