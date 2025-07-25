import express from "express";
import { postsRoutes } from "./routes/posts.js ";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
app.use(cors());
app.use(bodyParser.json());
postsRoutes(app);

export { app };


