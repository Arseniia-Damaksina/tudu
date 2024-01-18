import cookieParser from "cookie-parser";
import cors from 'cors';
import Express from "express";
import bodyParser from "body-parser";
import { dbConnect } from "./src/db/connectTodb.mjs";
import register from "./src/db/register.mjs";
import login from "./src/db/login.mjs";
import addTudu from "./src/db/addTudu.mjs";
import jwtAuthentification from "./src/middleware/jwtAuth.mjs";
import { getTudu } from "./src/db/getTudu.mjs";
import { filterTudu } from "./src/db/filterTudu.mjs";
import { isDone } from "./src/db/isDone.mjs";
// import { activeTudu } from "./src/db/activeTudu.mjs";
import { filterActive } from "./src/db/filterActive.mjs";
import { editTudu } from "./src/db/editTudu.mjs";
import { deleteTudu } from "./src/db/deleteTudu.mjs";
import dotenv from 'dotenv'

dotenv.config();
const app = Express();
dbConnect()
// connecting to db

// CORS configuration options

// Use the CORS middleware
app.use(cors({origin:['https://tudu-bcode.netlify.app','http://localhost:3000']}));

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );


//connecting to express
app.use(Express.json());
// app.use(cookieParser(process.env.JWT_SECRET))
app.use(cookieParser())


app.get("/", (req, res) => {
        res.status(200).send("Engine Started, Ready to take off!");
})
app.post('/',(req, res) => {
  res.status(200).send("Engine Started, Ready to take off!");
})
//register
app.post("/register",register)

//login
app.post("/user/login",login)

//Add a personal Task
app.post('/personal/addTudu',addTudu)

//Get a Tudu task
app.get("/user/getTudu/:id",getTudu)

//filter a tudu
app.get('/user/getTudu/:id/:category',filterTudu)

//filter a active
app.get('/user/:id/:filteractive',filterActive)

//update a tudu isdone
app.patch('/user/updateTudu/:id',isDone)

//update or edit a tudu task
app.patch('/user/editTudu/:id',editTudu)

//delete a tudu
app.delete('/user/deleteTudu/:id',deleteTudu)
const PORT = process.env.PORT
app.listen(PORT || 4001, () => {
    console.log(`Here we go, Engines started at ${PORT}.`);
})

