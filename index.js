const express = require('express');
const routerApi = require('./routes');

// Middlewares
const {
  logError,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const PORT = 3000;

app.use(express.json());

routerApi(app);

app.use(logError);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
