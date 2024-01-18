import  bcrypt  from "bcrypt"
import jwt from "jsonwebtoken";
import { pool } from "./connectDb.mjs";

const register = async(req,res) => {

    const { email, password, username,firstName,secondName} = req.body
        try {
            const  data  =  await pool.query(`SELECT * FROM login WHERE email = $1;`, [email]); 
            //Checking if user already exists
            const  arr  =  data.rows;
            if (arr.length  !=  0) {
                return  res.status(400).json({
                error: "Email already there, No need to register again.",
                });
            }
            else {
                bcrypt.hash(password, 10, (err, hash) => {
            if (err)
                res.status(err).json({
                    error: "Server error",
                });
            const queryValues = [
                email,
                hash,
                username,
                firstName,
                secondName,
                null,
                null,
                null
            ]
                
            
    
            let flag  =  1; 
            //Declaring a flag
    
            //Inserting data into the database
            const sqlQuery = `
            WITH ins AS
              (INSERT INTO login(email, password)
                  VALUES ($1, $2)
                  RETURNING id)
            INSERT INTO "user"(username, firstname, secondname, style, rewards, coins, login_id)
              SELECT $3, $4, $5, $6, $7, $8, ins.id
              FROM ins;
          `;
            pool
            .query(sqlQuery, queryValues,(error, results) => {
                if (err) {
                    flag  =  0; 
                    //If user is not inserted to database assigning flag as 0/false.
                    return  res.status(500).json({
                    error: "Database error"
                    })
                }
                else {
                    flag  =  1;
                    res.status(200).send({ message: 'User added to database, not verified' });
                }
            }) ;

                
            })

        
            //jwt token
            // if (flag) {
            //     const  token  = jwt.sign( //Signing a jwt token
            //         {
            //         user
            //         },
            //         `${process.env.SECRET_KEY}`
            //         );
            //     };
            };
        } catch (err) {
        res.status(500).json({
        error: "Database error while registring user!", //Database connection error
    });
    }
}

export default register


