require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

require("./config/db");

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("API Running");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

const verifyToken =
require("./middleware/authMiddleware");

app.get(
    "/protected",
    verifyToken,
    (req,res)=>{

        res.json({
            message:"Protected Route",
            user:req.user
        });

    }
);

const adminRoutes =
require("./routes/adminRoutes");

app.use("/admin",adminRoutes);

const storeRoutes =
require("./routes/storeRoutes");

app.use("/stores",storeRoutes);

const ratingRoutes =
require("./routes/ratingRoutes");

app.use("/ratings",ratingRoutes);

const ownerRoutes =
require("./routes/ownerRoutes");

app.use("/owner",ownerRoutes);