const express = require('express');

const productController = require('../controllers/productController');
const verifyProduct = require('../middlewares/verifyProducts');
const verifyProductId = require('../middlewares/verifyProductId');

const product = express.Router();

product.get('/', productController.index);
product.get('/:id', verifyProductId, productController.find);

product.delete('/:id', verifyProductId, productController.remove);

product.post('/', verifyProduct, productController.register);

product.put('/:id', verifyProduct, verifyProductId, productController.update);


module.exports = product;