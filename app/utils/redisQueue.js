const Queue = require('bee-queue');
const nconf = require('nconf');

const queues = {};

const buildQueue = (name, params) => new Promise((resolve, reject) => {
  const { redis: { host, port } } = params;
  const key = host + port + name;

  if (!queues[key]) {
    const queue = new Queue(name, params);

    queue.checkStalledJobs(nconf.get('redis:checkStalledJobsInterval'));

    const queueInitTimeout = setTimeout(() => {
      reject(new Error(`Redis client initialization timeout: ${key}`));
    }, 5000);

    queue.on('ready', () => {
      clearTimeout(queueInitTimeout);
      queues[key] = queue;
      resolve(queue);
    });
  } else {
    resolve(queues[key]);
  }
});

const createWorkerQueue = (queueName, host = '127.0.0.1', port = 6379) => {
  const workerParams = {
    redis: {
      host,
      port,
      db: 0,
      options: {}
    },
    getEvents: true,
    isWorker: true,
    sendEvents: true,
    removeOnSuccess: true,
    catchExceptions: false,
    storeJobs: false
  };

  return buildQueue(queueName, workerParams);
};

const createExportQueue = (queueName, host = '127.0.0.1', port = 6379) => {
  const workerParams = {
    redis: {
      host,
      port,
      db: 0,
      options: {}
    },
    getEvents: true,
    sendEvents: true,
    isWorker: false,
    removeOnSuccess: false,
    catchExceptions: false,
    storeJobs: false
  };

  return buildQueue(queueName, workerParams);
};

module.exports = {
  buildQueue,
  createWorkerQueue,
  createExportQueue,
};
