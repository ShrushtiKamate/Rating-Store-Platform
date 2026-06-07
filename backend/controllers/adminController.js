const db = require("../config/db");

const getDashboard = (req,res)=>{

    db.query(
        "SELECT COUNT(*) AS totalUsers FROM users",
        (err,userResult)=>{

            if(err){
                return res.status(500).json({
                    message:"Error"
                });
            }

            db.query(
                "SELECT COUNT(*) AS totalStores FROM stores",
                (err,storeResult)=>{

                    db.query(
                        "SELECT COUNT(*) AS totalRatings FROM ratings",
                        (err,ratingResult)=>{

                            res.json({

                                totalUsers:
                                userResult[0].totalUsers,

                                totalStores:
                                storeResult[0].totalStores,

                                totalRatings:
                                ratingResult[0].totalRatings

                            });

                        }
                    );

                }
            );

        }
    );

};

const bcrypt = require("bcrypt");

const addUser = async (req,res)=>{

    try{

        const {
            name,
            email,
            password,
            address,
            role
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
                "Password must be 8-16 characters and contain at least one uppercase letter and one special character"
            });

}
        db.query(
            "SELECT * FROM users WHERE email=?",
            [email],
            async(err,result)=>{

                if(err){

                    return res.status(500).json({
                        message:"Server Error"
                    });

                }

                if(result.length > 0){

                    return res.status(400).json({
                        message:"Email already exists"
                    });

                }

                const hashedPassword =
                await bcrypt.hash(password,10);

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
                        role
                    ],
                    (err,result)=>{

                        if(err){

                            return res.status(500).json({
                                message:"Failed to Add User"
                            });

                        }

                        res.status(201).json({
                            message:"User Added Successfully"
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

const addStore = (req,res)=>{

    const {
        name,
        email,
        address,
        owner_id
    } = req.body;

    const sql = `
    INSERT INTO stores
    (name,email,address,owner_id)
    VALUES (?,?,?,?)
    `;

    db.query(
        sql,
        [
            name,
            email,
            address,
            owner_id
        ],
        (err,result)=>{

            if(err){

                return res.status(500).json({
                    message:"Failed to Add Store"
                });

            }

            res.status(201).json({
                message:"Store Added Successfully"
            });

        }
    );

};

const getAllUsers = (req,res)=>{

    const { name, email } = req.query;

    let sql = `
    SELECT
        id,
        name,
        email,
        address,
        role
    FROM users
    WHERE 1=1
    `;

    const values = [];

    if(name){

        sql += " AND name LIKE ?";
        values.push(`%${name}%`);

    }

    if(email){

        sql += " AND email LIKE ?";
        values.push(`%${email}%`);

    }

    db.query(
        sql,
        values,
        (err,result)=>{

            if(err){

                return res.status(500).json({
                    message:"Server Error"
                });

            }

            res.json(result);

        }
    );

};

const getAllStores = (req,res)=>{

    const { name, address } = req.query;

    let sql = `
    SELECT
        id,
        name,
        email,
        address,
        owner_id
    FROM stores
    WHERE 1=1
    `;

    const values = [];

    if(name){

        sql += " AND name LIKE ?";
        values.push(`%${name}%`);

    }

    if(address){

        sql += " AND address LIKE ?";
        values.push(`%${address}%`);

    }

    db.query(
        sql,
        values,
        (err,result)=>{

            if(err){

                return res.status(500).json({
                    message:"Server Error"
                });

            }

            res.json(result);

        }
    );

};

module.exports = {
    getDashboard,
    addUser,
    addStore,
    getAllUsers,
    getAllStores
};