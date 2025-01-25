import express, { Express } from "express"
import { config } from "dotenv"
import  cors  from "cors"

const app: Express = express()



config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/auth/login", (req, res) => {
  console.log("this is the login route")
})

app.post("/auth/signup", (req, res) => {
  console.log("this is the signup rout")
})





app.listen(4001, () => {
  console.log("app running on port 4001")
})