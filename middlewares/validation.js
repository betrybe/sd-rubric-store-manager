const Product = require('../models/Product');

const checkNameExists = async (id, name) => {
  try {
    const result = await Product.findByName(name);

    if (!result) return true;

    if (id && id !== result._id) return true;

    return false;
  } catch (error) {
    return null;
  }
}

const nameSize = (name) => !name || name.length < 5

const isValidName = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const err = { code: 'invalid_data' };

  if (nameSize(name)) {
    err.message = '"name" length must be at least 5 characters long';
    return res.status(422).json({ err });
  }

  if (!await checkNameExists(id, name)) {
    err.message = 'Product already exists';
    return res.status(422).json({ err });
  }

  return next();
};

const quantityValue = (quantity) => quantity > 0;

const checkQuantityNumber = (quantity) => typeof quantity === 'number';

const isValidQuantity = (req, res, next) => {
  const { quantity } = req.body;
  const err = { code: 'invalid_data' };

  if (!checkQuantityNumber(quantity)) {
    err.message = '"quantity" must be a number';
    return res.status(422).json({ err });
  }

  if (!quantityValue(quantity)) {
    err.message = '"quantity" must be larger than or equal to 1';
    return res.status(422).json({ err });
  }

  return next();
};

module.exports = {
  isValidName,
  isValidQuantity,
};
