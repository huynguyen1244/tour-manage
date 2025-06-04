const customerService = require("../services/customer.service");

const getAllCustomers = async (req, res, next) => {
  try {
    const filter = req.query;
    const customers = await customerService.getAllCustomers(filter);
    res.json(customers);
  } catch (error) {
    next(error);
  }
};

const blockCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const is_active = req.body.is_active;
    const blockedCustomer = await customerService.blockCustomer(id, is_active);
    res.json(blockedCustomer);
  } catch (error) {
    next(error);
  }
};

const deleteCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    await customerService.deleteCustomer(id);
    res.status(204).send({
      message: "Xóa tài khoản khách hàng thành công",
    });
  } catch (error) {
    next(error);
  }
};

const getCustomerById = async (req, res, next) => {
  try {
    const id = req.user.id;
    const customer = await customerService.getCustomerById(id);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

const updateCustomer = async (req, res, next) => {
  try {
    const id = req.user.id;
    const updateData = req.body;
    const updatedCustomer = await customerService.updateCustomer(
      id,
      updateData
    );
    res.json(updatedCustomer);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCustomers,
  blockCustomer,
  deleteCustomer,
  getCustomerById,
  updateCustomer,
};
