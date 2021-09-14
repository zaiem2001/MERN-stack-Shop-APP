const router = require("express").Router();

const userController = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.post("/", userController.register);
router.get("/", protect, admin, userController.getAllUsers);

router.post("/login", userController.login);

router.get("/profile", protect, userController.profile);
router.put("/profile", protect, userController.updateProfile);

router.delete("/:id", protect, admin, userController.deleteUser);
router.get("/:id", protect, admin, userController.getUserById);
router.put("/:id", protect, admin, userController.updateUser);

module.exports = router;
