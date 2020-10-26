const conn = require('./connection');
const { ObjectId } = require('mongodb');

const add = async (itensSold) => {
  try {
    return await await conn().collection('sales').insertOne({ itensSold }).ops[0];
  } catch (error) {
    return null;
  }
};

const getAll = async () => {
  try {
    return await conn().collection('sales').find({}).toArray();
  } catch (error) {
    return null;
  }
};

const show = async (id) => {
  try {
    return await conn().collection('sales').findOne(ObjectId(id));
  } catch (error) {
    return null;
  }
};

const edit = async (id, itensSold) => {
  try {
    return await conn().collection('sales').updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } },
    );
  } catch (error) {
    return null;
  }
};

const remove = async (id) => {
  try {
    return await conn().collection('sales').deleteOne({ _id: ObjectId(id) });
  } catch (error) {
    return null;
  }
};

module.exports = {
  add,
  getAll,
  show,
  edit,
  remove,
};
