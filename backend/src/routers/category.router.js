const express = require("express");
const categoryController = require("../controllers/category.controller");
const {
  verifyToken,
  isManager,
} = require("../middlewares/authenticate.middleware");
const {
  authorization,
  RoleManager,
} = require("../middlewares/manager.middleware");
const { upload } = require("../utility/media");

const router = express.Router();

router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);

router.use(isManager);
router.use(verifyToken);
router.use(
  authorization([RoleManager.admin, RoleManager.manager, RoleManager.staff])
);

router.post("/", upload.any(), categoryController.addCategory);
router.put("/:id", upload.any(), categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
