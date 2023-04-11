import express from "express";
const app = express();
import {Users} from "./Users.js";
import cors from "cors";

app.use(cors());
app.get("/", (req,res)=> {
    const {q} = req.query;
    const keys = ["first_name", "last_name", "email"];
    const search = (data) => {
      return data.filter((item) => (
        keys.some((key) => item[key].toLowerCase().includes(q))
      ));

    };

    const seyed = search(Users.slice(0, 10));
    console.log(seyed)

    q ? res.json(search(Users.slice(0, 10))) : res.json(Users.slice(0, 10));
});

app.listen(5000, () => console.log("API is Working"));