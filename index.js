const express = require('express');
const productRouter = require('./routers/productRouter');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
    response.send();
});

app.use('/products', productRouter);

app.listen(3000, () => console.log('RUN SERVE 127.0.0.1:3000'));
