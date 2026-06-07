const express = require("express");

const router = express.Router();

const verifyToken =
require("../middleware/authMiddleware");

const isAdmin =
require("../middleware/adminMiddleware");

const {
  getDashboard,
  addUser,
  addStore,
  getAllUsers,
  getAllStores
} = require("../controllers/adminController");


router.get(
    "/dashboard",
    verifyToken,
    isAdmin,
    getDashboard
);

router.post(
    "/add-user",
    verifyToken,
    isAdmin,
    addUser
);

router.post(
    "/add-store",
    verifyToken,
    isAdmin,
    addStore
);

router.get(
    "/users",
    verifyToken,
    isAdmin,
    getAllUsers
);

router.get(
    "/stores",
    verifyToken,
    isAdmin,
    getAllStores
);

module.exports = router;