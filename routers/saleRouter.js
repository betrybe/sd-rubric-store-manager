const express = require('express');
const middlewares = require('../middlewares/validation');
const saleController = require('../controllers/saleController');

const router = express.Router();

router.post('/',
  middlewares.isValidQuantity,
  saleController.addSale,
);

router.get('/', saleController.getAllSale);

router.get('/:id', saleController.showSale);

router.put('/:id',
  middlewares.isValidQuantity,
  saleController.editSale,
);

router.delete('/:id', saleController.removeSale);

module.exports = router;
