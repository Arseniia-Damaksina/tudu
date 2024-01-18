import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv'
dotenv.config();
export const pool = (() => {
    if (process.env.NODE_ENV === 'production') {
        console.log(process.env.NODE_ENV)
        return new Pool({
            connectionString: process.env.URI,
            ssl: {
                rejectUnauthorized: false
            }
        })
    } else {
        return new Pool({
            user: "root",
            password: "root",
            host: "localhost",
            port: 5432,
            database: "tudu"
        })
    }
})
    //call  the function
    ();