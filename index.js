const express = require('express');
const routerApi = require('./routes');

const app = express();
const PORT = 3000;

app.use(express.json());

routerApi(app);

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
