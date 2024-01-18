import { pool } from "../db/connectDb.mjs";

export const isDone = async(req, res) => {
    // res.send('recieved in backend')
    const id = req.params.id
    console.log(id)
    //do the params here
    try {
        const getValues = await pool.query(
        `SELECT * FROM personaltask 
        WHERE id = $1`,[id] ) 
            if(getValues.rowCount===0){
                res.status(200).send({message: "no tudu task"})
            }
            else{ 
                pool.query(
                    `UPDATE personaltask 
                    SET isdone = true
                    WHERE id =$1`,[id] )
                res.status(200).send({message: "updated tudu task as DONE"})
            }
    } catch (error) {
        console.error(error)
        res.status(500).send({error:"internal server error"})
    } 
}