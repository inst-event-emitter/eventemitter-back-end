const express = require('express');
const glob = require('glob');
const { get, isNil } = require('lodash');

module.exports = (folder) => {
  const initialRouter = express.Router();

  if (isNil(folder)) {
    return initialRouter;
  }

  const cwd = process.cwd();

  return glob.sync('*.js', { cwd: folder }).reduce((router, fileName) => {
    const routeName = get(fileName.split('.'), '0');

    if (routeName) {
      router.use(`/${routeName}`, require(`${cwd}/${folder}/${fileName}`));
    }

    return router;
  }, initialRouter);
};
