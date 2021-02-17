const express = require('express');
const productRouter = require('./products.routes');

const router = express.Router();

router.use('/products', productRouter);

// não remova esse endpoint, e para o avaliador funcionar
router.get('/', (_request, response) => {
  response.send();
});


module.exports = router;
