const express = require("express");
const cartController = require("../controllers/cart.controller");
const { verifyToken } = require("../middlewares/authenticate.middleware");

const router = express.Router();

router.use(verifyToken);
// route của người dùng
router.get("/", cartController.getCarts);
router.post("/", cartController.createCart);
router.put("/:id", cartController.updateCart);
router.delete("/:id", cartController.deleteCart);

module.exports = router;
