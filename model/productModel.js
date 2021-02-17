const connection = require('./connections');
const { ObjectId } = require('mongodb');

const list = async () => {
  return await connection().then((db) => db.collection('products').find().toArray());
};

const findById = async (id) => {
  const product = await connection().then((db) =>
    db.collection('products').findOne(ObjectId(id))
  );

  return product;
};

const findByProductName = async (name) => {
  const product = await connection().then((db) =>
    db.collection('products').findOne({ name }));

  return product;
};

const add = async (name, quantity) => {

  const { insertedId } = await connection().then((db) =>
    db.collection('products')
      .insertOne({ name, quantity }));

  return { _id: insertedId, name, quantity };
};

const remove = async (id) => {
  const product = await findById(id);

  await connection().then((db) =>
    db.collection('products')
      .deleteOne({ _id: ObjectId(id) }));

  return product;
};

module.exports = {
  list,
  add,
  findById,
  findByProductName,
  remove

};