const db = require("../config/db");

const submitRating = (req,res)=>{

    const user_id = req.user.id;

    const {
        store_id,
        rating
    } = req.body;

    if(rating < 1 || rating > 5){

        return res.status(400).json({
            message:"Rating must be between 1 and 5"
        });

    }

    const sql = `
    INSERT INTO ratings
    (user_id,store_id,rating)
    VALUES (?,?,?)
    `;

    db.query(
        sql,
        [
            user_id,
            store_id,
            rating
        ],
        (err,result)=>{

            if(err){

                return res.status(500).json({
                    message:"Failed To Submit Rating"
                });

            }

            res.status(201).json({
                message:"Rating Submitted"
            });

        }
    );

};

const updateRating = (req,res)=>{

    const user_id = req.user.id;

    const {
        store_id,
        rating
    } = req.body;

    const sql = `
    UPDATE ratings
    SET rating=?
    WHERE user_id=? AND store_id=?
    `;

    db.query(
        sql,
        [
            rating,
            user_id,
            store_id
        ],
        (err,result)=>{

            if(err){

                return res.status(500).json({
                    message:"Failed To Update Rating"
                });

            }

            res.json({
                message:"Rating Updated"
            });

        }
    );

};

module.exports = {
    submitRating,
    updateRating
};

