import express, { Request, Response } from "express";
import mongoose from "mongoose";
import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import cors from "cors";
mongoose.connect(
    "mongodb+srv://admin:tKSu4A4ScgtEuCpF@cluster0.hejjh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/hello", (req: Request, res: Response) => res.send("Hello World!"));

app.get("/add/:a/:b", (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b)
);

TuitController.getInstance(app);
UserController.getInstance(app);

const PORT = 4000;
app.listen(process.env.PORT || PORT);
