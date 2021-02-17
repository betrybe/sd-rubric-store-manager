const productServices = require('../services/productServices');
const { ERROR, INVALID } = require('../dictionary/status.errors');
const { OK, CREATED } = require('../dictionary/status.success');

const ERR_MESSAGE = 'Oops! Something went wrong.';

module.exports = {
  async index(req, res) {
    const allProducts = await productServices.listProducts();

    return res.status(OK).json({ products: allProducts });
  },

  async find(req, res) {
    try {
      const { id } = req.params;

      const findProduct = await productServices.findProduct(id);

      return res.status(OK).json(findProduct);
    } catch (error) {
      return res.status(ERROR).json({ message: ERR_MESSAGE });
    }
  },

  async register(req, res) {

    try {
      const { name, quantity } = req.body;

      const newProduct = await productServices.addProduct(name, quantity);

      return res.status(CREATED).json(newProduct);

    } catch (error) {
      if (error.code === 'invalid_data') {
        return res
          .status(INVALID).json({ err: { code: err.code, message: err.message } });
      }
    }

    return res.status(ERROR).json({ message: ERR_MESSAGE });
  },

  async update(req, res) {
    const { id } = req.params;
  },

  async remove(req, res) {
    const { id } = req.params;
    try {
      const deletedProduct = await productServices.deleteProduct(id);

      res.status(OK).json(deletedProduct);
    } catch (error) {
      console.log(error.message);
      res.send(error.message);
    }
  }
};