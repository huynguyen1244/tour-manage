const express = require("express");
const customerController = require("../controllers/customer.controller");
const {
  verifyToken,
  isManager,
} = require("../middlewares/authenticate.middleware");
const {
  authorization,
  RoleManager,
} = require("../middlewares/manager.middleware");

const router = express.Router();

// Api của khách hàng
router.get("/get-infor", verifyToken, customerController.getCustomerById);
router.put("/update-infor", verifyToken, customerController.updateCustomer);
// Api của nhân viên quản lý khách hàng

router.get(
  "/",
  isManager,
  verifyToken,
  authorization(RoleManager.admin, RoleManager.manager, RoleManager.staff),
  customerController.getAllCustomers
);
router.put(
  "/:id",
  isManager,
  verifyToken,
  authorization(RoleManager.admin, RoleManager.manager, RoleManager.staff),
  customerController.blockCustomer
);
router.delete(
  "/:id",
  isManager,
  verifyToken,
  authorization(RoleManager.admin, RoleManager.manager, RoleManager.staff),
  customerController.deleteCustomer
);

module.exports = router;
