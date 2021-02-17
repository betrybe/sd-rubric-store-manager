const { findByProductName } = require('../model/productModel');

const INVALID = 422;
const MIN_NAME_SIZE = 5;
const MIN_QTD = 0;

const error = (message) => ({
  code: 'invalid_data',
  message,
});

// eslint-disable-next-line max-lines-per-function
const verifyProduct = async (req, res, next) => {
  const { name, quantity } = req.body;

  if (name && name.length < MIN_NAME_SIZE)
    return res.status(INVALID).json({
      err: error('"name" length must be at least 5 characters long'),
    });
  if (quantity <= MIN_QTD)
    return res.status(INVALID).json({
      err: error('"quantity" must be larger than or equal to 1'),
    });
  if (quantity && !Number.isInteger(quantity)) {
    return res.status(INVALID).json({ err: error('"quantity" must be a number') });
  }

  const checkProduct = await findByProductName(name);
  if (checkProduct) {
    return res.status(INVALID).json({ err: error('Product already exists') });
  }
  next();
};

module.exports = verifyProduct;