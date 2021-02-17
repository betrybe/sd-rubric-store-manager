const { ObjectId } = require('mongodb');
const { findById } = require('../model/productModel');

const STATUS = {
  INVALID: 422
};

// eslint-disable-next-line max-lines-per-function
const verifyProductId = async (req, res, next) => {

  const { id } = req.params;

  if (!ObjectId.isValid(id)) {

    return res.status(STATUS.INVALID).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  const verifyIdExists = await findById(id);

  if (!verifyIdExists) {
    return res.status(STATUS.INVALID).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  next();

};

module.exports = verifyProductId;