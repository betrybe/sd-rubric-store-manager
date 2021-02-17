const express = require('express');
const routes = require('./routes/routes.js');

const port = 3000;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(port, () => console.log('Server is running ...'));