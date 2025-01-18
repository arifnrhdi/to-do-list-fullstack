import express from "express";
import cors from "cors";
import UserRouter from "./route/UserRouter.js";
import db from "./config/Database.js";

const app = express();

(async () => {
  await db.sync();
})();

app.use(cors());
app.use(express.json());
app.use(UserRouter);

app.listen("2257", () => console.log("Server running at port 2257"));
    