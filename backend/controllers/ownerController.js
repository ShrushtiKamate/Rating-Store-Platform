const db = require("../config/db");

const getOwnerDashboard = (req,res)=>{

    const owner_id = req.user.id;

    const sql = `
    SELECT
        s.name AS storeName,
        AVG(r.rating) AS averageRating,
        u.name AS userName,
        r.rating
    FROM stores s
    LEFT JOIN ratings r
        ON s.id = r.store_id
    LEFT JOIN users u
        ON r.user_id = u.id
    WHERE s.owner_id = ?
    GROUP BY
        s.name,
        u.name,
        r.rating
    `;

    db.query(
        sql,
        [owner_id],
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
    getOwnerDashboard
};