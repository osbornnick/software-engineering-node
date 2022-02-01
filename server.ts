import express, { Request, Response } from "express";
import mongoose from "mongoose";
import TuitController from "./controllers/TuitController";
import UserController from "./controllers/UserController";
import TuitDao from "./daos/TuitDao";
import UserDao from "./daos/UserDao";

if (process.env.NODE_ENV === "test")
    mongoose.connect("mongodb://localhost:27017/tuiter");

const app = express();

app.use(express.json());

app.get("/hello", (req: Request, res: Response) => res.send("Hello World!"));

app.get("/add/:a/:b", (req: Request, res: Response) =>
    res.send(req.params.a + req.params.b)
);

if (process.env.NODE_ENV === "test") {
    const tuitController = new TuitController(
        app,
        new TuitDao(),
        new UserDao()
    );
    const userController = new UserController(app, new UserDao());
}

const PORT = 4000;
app.listen(process.env.PORT || PORT);
