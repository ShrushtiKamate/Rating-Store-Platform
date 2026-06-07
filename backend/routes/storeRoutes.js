const express = require("express");

const router = express.Router();

const verifyToken =
require("../middleware/authMiddleware");

const {
  getAllStores
} = require("../controllers/storeController");

router.get(
    "/",
    verifyToken,
    getAllStores
);

module.exports = router;