import { pool } from "../db/connectDb.mjs";

export const deleteTudu = async(req, res) => {
    // res.send('recieved in backend')
    const id = req.params.id
    console.log(id)
    //do the params here
    try {
        const getValues = await pool.query(
        `SELECT * FROM personaltask WHERE id =$1 `,[id] ) 
            if(getValues.rowCount===0){
                res.status(200).send({message: "no tudu task"})
            }
            else
           {
            pool.query(
                `DELETE FROM personaltask where id = $1`,[id] ) 
                res.status(200).send({message: "tudu task deleted"})
           }
    } catch (error) {
        console.error(error)
        res.status(500).send({error:"internal server error"})
    } 
}