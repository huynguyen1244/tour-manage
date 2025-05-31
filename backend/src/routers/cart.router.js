const express = require("express");
const cartController = require("../controllers/cart.controller");

const router = express.Router();

router.get("/", cartController.getCarts);

router.post("/", cartController.createCart);
router.put("/:id", cartController.updateCart);
router.delete("/:id", cartController.deleteCart);

module.exports = router;
