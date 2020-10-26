const Sale = require('../models/Sale');

const add = async (req, res) => {
  try {
    res.status(200).json(await Sale.add(req.body));
  } catch (error) {
    return res.status(500).json({ err: { message: 'Fatal Error' } });
  }
};

const getAll = async (req, res) => {
  try {
    res.status(200).json({ sales: await Sale.getAll() });
  } catch (error) {
    return res.status(500).json({ err: { message: 'Fatal Error' } });
  }
};

const show = async (req, res) => {
  try {
    const sale = await Sale.show(req.params.id);

    if (sale) return res.status(200).json(sale);

    res.status(404).json({ code: 'not_found', message: 'Sale not found' });
  } catch (error) {
    return res.status(500).json({ err: { message: 'Fatal Error' } });
  }
};

const edit = async (req, res) => {
  try {
    await Sale.edit(req.params, req.body);
    show(req, res);
  } catch (error) {
    return res.status(500).json({ err: { message: 'Fatal Error' } });
  }
};

const remove = async (req, res) => {
  try {
    const { id } = req.params;

    if (!await Sale.show(id)) return res.status(422).json({ code: 'invalid_data', message: 'Wrong sale ID format' });
    
    await show(req, res);
    await Sale.remove(id);
  } catch (error) {
    return res.status(500).json({ err: { message: 'Fatal Error' } });
  }
};

module.exports = {
  add,
  getAll,
  show,
  edit,
  remove,
};
