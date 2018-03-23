const app = require('./services/app');

const config = require('./config');

const port = process.env.PORT || config.get('server:port');

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listen on port: ${port}`);
  }
});
