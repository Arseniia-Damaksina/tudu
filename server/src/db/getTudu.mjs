import { pool } from "../db/connectDb.mjs";

export const getTudu = async(req, res) => {
    // res.send('recieved in backend')
    const id = req.params.id
    console.log(id)
    //do the params here
    try {
        const getValues = await pool.query(
        `SELECT * FROM personaltask 
        WHERE user_id  =(SELECT id FROM "user" WHERE login_id =$1 )`,[id] ) 
            if(getValues.rowCount===0){
                res.status(200).send({message: "no tudu task"})
            }
            else
            res.send(getValues.rows);
    } catch (error) {
        console.error(error)
        res.status(500).send({error:"internal server error"})
    } 
}