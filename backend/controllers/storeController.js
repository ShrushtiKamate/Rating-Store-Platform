const db = require("../config/db");

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
    getAllStores
};