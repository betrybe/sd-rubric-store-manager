/* eslint-disable no-magic-numbers */
const productModel = require('../model/productModel');

const listProducts = async () => {
  return await productModel.list();

};

const findProduct = async (id) => {

  return await productModel.findById(id);

};

const addProduct = async (name, quantity) => {

  return await productModel.add(name, quantity);

};

const deleteProduct = async (id) => {
  return await productModel.remove(id);
};

module.exports = {
  addProduct,
  listProducts,
  findProduct,
  deleteProduct
};