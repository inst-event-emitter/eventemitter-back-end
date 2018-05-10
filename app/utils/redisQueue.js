const Queue = require('bee-queue');
const nconf = require('nconf');
const { defaultsDeep } = require('lodash');

const queues = {};

const createQueue = (name, params) => new Promise((resolve, reject) => {
  const queueParams = defaultsDeep(params, nconf.get('eventsQueue:defaultParams'));
  const { redis: { host, port } } = queueParams;
  const key = host + port + name;

  if (!queues[key]) {
    const queue = new Queue(name, queueParams);

    queue.checkStalledJobs(nconf.get('eventsQueue:checkStalledJobsInterval'));

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

module.exports = {
  createQueue,
};
