import express, { Express } from "express"
import { config } from "dotenv"
import  cors  from "cors"

const app: Express = express()



config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());





app.listen(4001, () => {
  console.log("app running on port 4001")
})