import { pool } from "../db/connectDb.mjs";

export const editTudu = async(req, res) => {
    //do the params here
    const id = req.params.id
    console.log(id,"id-edit")
    try {
        const {
            ptaskname,
            description,
            category,
            duedate,
            entrydate,
            url,
            place
          } = req.body
        const getValues = await pool.query(
            `SELECT * FROM personaltask 
            WHERE id =$1 `,[id]) 
            if(getValues.rowCount===0){
                res.status(200).send({message: "no tudu task"})
            }
            else{ 
                pool.query(
                    `UPDATE personaltask SET   
                    ptaskname = $1, description = $2, category = $3, duedate  = $4, entrydate = $5,  url = $6, place = $7
                    WHERE id = $8`,[ ptaskname,description,category,duedate,entrydate,url,place,id] ) 
                res.status(200).send({message: "updated tudu task as DONE"})
            }
    } catch (error) {
        console.error(error)
        res.status(500).send({error:"internal server error"})
    } 
}