const db = require("../config/db");
const jwt = require("jsonwebtoken");

const login = (req, res) => {

    const { email, password } = req.body;

    const sql =
    "SELECT * FROM users WHERE email=?";

    db.query(sql,[email], async(err,result)=>{

        if(err){
            return res.status(500).json({
                message:"Server Error"
            });
        }

        if(result.length===0){
            return res.status(404).json({
                message:"User Not Found"
            });
        }

        const user = result[0];

        const isMatch =
        await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){

            return res.status(401).json({
                message:"Invalid Password"
            });

        }

        const token =
        jwt.sign(
            {
                id:user.id,
                role:user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1d"
            }
        );

        res.json({
            message:"Login Successful",
            token,
            role:user.role
        });

    });

};

const bcrypt = require("bcrypt");
const register = async (req, res) => {

    try {

        const {
            name,
            email,
            password,
            address
        } = req.body;

        if(name.length < 20 || name.length > 60){

            return res.status(400).json({
                message:
                "Name must be between 20 and 60 characters"
            });

        }

        if(address.length > 400){

            return res.status(400).json({
                message:
                "Address cannot exceed 400 characters"
            });

        }

        const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!emailRegex.test(email)){

            return res.status(400).json({
                message:"Invalid Email"
            });

        }

        const passwordRegex =
        /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/;

        if(!passwordRegex.test(password)){

            return res.status(400).json({
                message:
                "Password must be 8-16 characters with one uppercase letter and one special character"
            });

        }
        db.query(
            "SELECT * FROM users WHERE email=?",
            [email],
            async (err, result) => {

                if (err) {

                    return res.status(500).json({
                        message: "Server Error"
                    });

                }

                if (result.length > 0) {

                    return res.status(400).json({
                        message: "Email already exists"
                    });

                }

                const hashedPassword =
                    await bcrypt.hash(password, 10);

                const sql = `
                INSERT INTO users
                (name,email,password,address,role)
                VALUES (?,?,?,?,?)
                `;

                db.query(
                    sql,
                    [
                        name,
                        email,
                        hashedPassword,
                        address,
                        "USER"
                    ],
                    (err, result) => {

                        if (err) {

                            return res.status(500).json({
                                message: "Registration Failed"
                            });

                        }

                        res.status(201).json({
                            message: "User Registered"
                        });

                    }
                );

            }
        );

    }
    catch (error) {

        res.status(500).json({
            message: "Server Error"
        });

    }

};

const changePassword = async (req,res) => {

    try{

        const userId = req.user.id;

        const {
            oldPassword,
            newPassword
        } = req.body;

        db.query(
            "SELECT * FROM users WHERE id=?",
            [userId],
            async (err,result)=>{

                if(err){

                    return res.status(500).json({
                        message:"Server Error"
                    });

                }

                const user = result[0];

                const isMatch =
                await bcrypt.compare(
                    oldPassword,
                    user.password
                );

                if(!isMatch){

                    return res.status(400).json({
                        message:"Old Password Incorrect"
                    });

                }

                const hashedPassword =
                await bcrypt.hash(
                    newPassword,
                    10
                );

                db.query(
                    "UPDATE users SET password=? WHERE id=?",
                    [
                        hashedPassword,
                        userId
                    ],
                    (err,result)=>{

                        if(err){

                            return res.status(500).json({
                                message:"Update Failed"
                            });

                        }

                        res.json({
                            message:"Password Updated"
                        });

                    }
                );

            }
        );

    }
    catch(error){

        res.status(500).json({
            message:"Server Error"
        });

    }

};

module.exports = {
    login,
    register,
    changePassword
};