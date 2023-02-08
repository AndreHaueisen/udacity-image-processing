import express from 'express';
import routes from './routes/index';
import logger from './utils/logger';

const app = express();
const port = 3000;

app.all('*', logger);
app.use('/', routes);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
