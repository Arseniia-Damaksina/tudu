import { pool } from "../db/connectDb.mjs";

export const filterTudu = async(req, res) => {
    // res.send('recieved in backend')
    const id = req.params.id
    const categoryF =req.params.category
    const categoryFilter = `'${req.params.category}'`
    let filteredTasks =[]
    console.log(categoryFilter)
    console.log(id)
    //do the params here
    try {
        const getValues = await pool.query(
        `SELECT * FROM personaltask 
        WHERE user_id  =(SELECT id FROM "user" WHERE login_id =$1 )`,[id] ) 
            if(getValues.rowCount===0){
                res.status(200).send({message: "no tudu task"})
            }else{
                
                    filteredTasks = getValues.rows.filter(
                    (tudu) => {
                    //    if(tudu.category === categoryF) console.log(true )
                        return  tudu.category === categoryF
                    }
                  );
                if (filteredTasks .length === 0) {
                    res.status(200).send({ message: "no matching tudu task" })
                } else {
                    res.status(200).send(filteredTasks)
                }
            }
    } catch (error) {
        console.error(error)
        res.status(500).send({error:"internal server error"})
    } 
}