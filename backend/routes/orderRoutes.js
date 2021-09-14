const router = require("express").Router();

const orderController = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.post("/", protect, orderController.addNewOrder);
router.get("/", protect, admin, orderController.getOrders);

router.get("/myorders", protect, orderController.getUserOrders);
router.get("/:id", protect, orderController.getOrderById);
router.put("/:id/pay", protect, orderController.updateOrderToPaid);
router.put(
  "/:id/deliver",
  protect,
  admin,
  orderController.updateOrderToDelivered
);

module.exports = router;
