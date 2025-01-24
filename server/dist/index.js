import cors from "cors";
import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.listen(4001, () => {
    console.log("app running on port 4001");
});
