const router = require("express").Router();
const productController = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.get("/", productController.getProducts);
router.post("/", protect, admin, productController.createProduct);

router.get("/top", productController.topProducts);

router.post("/:id/reviews", protect, productController.reviewProduct);
router.get("/:id", productController.getProductById);
router.delete("/:id", protect, admin, productController.deleteProductById);
router.put("/:id", protect, admin, productController.updateProduct);

module.exports = router;
