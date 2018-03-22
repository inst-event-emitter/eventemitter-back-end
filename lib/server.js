import app from './services/app';

const PORT = 3000;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listen on port: ${PORT}`);
  }
});
