const Product = require('../models/Product');

const response422 = (res, msg) => {
  const err = { code: 'invalid_data' };
  err.message = msg;

  return res.status(422).json({ err });
};

const checkNameExists = async (id, name) => {
  try {
    const result = await Product.findByName(name);

    if (!result) return true;

    const { _id } = result;
    if (id && id !== _id) return true;

    return false;
  } catch (error) {
    return null;
  }
};

const nameSize = (name) => !name || name.length < 5;

const isValidName = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  if (nameSize(name)) return response422(res, '"name" length must be at least 5 characters long');

  if (!await checkNameExists(id, name)) return response422(res, 'Product already exists');

  return next();
};

const quantityValue = (arrQuantity) => arrQuantity.map(({ quantity }) => quantity > 0);

const checkQuantityNumber = (arrQuantity) => arrQuantity.map(({ quantity }) => typeof quantity === 'number');

const testQuantitys = (isSales) => {
  let message = '';

  message = isSales ? 'Wrong product ID or invalid quantity' : '"quantity" must be a number';
  if (!checkQuantityNumber(quantityArr).every((item) => item)) return response422(res, message);

  message = isSales ? 'Wrong product ID or invalid quantity' : '"quantity" must be larger than or equal to 1';
  if (!quantityValue(quantityArr).every((item) => item)) return response422(res, message);

  return true;
};

const isValidQuantity = (req, res, next) => {
  let quantityArr = [];
  let isSales;

  if (req.baseUrl === '/sales') {
    isSales = true;
    quantityArr = req.body.map(({ quantity }) => ({ quantity }));
  } else {
    isSales = false;
    quantityArr.push({ quantity: req.body.quantity });
  }

  if(testQuantitys(isSales)) next();
};

module.exports = {
  isValidName,
  isValidQuantity,
};
