import { Request, Response, Express } from "express";
import TuitDao from "../daos/TuitDao";
import UserDao from "../daos/UserDao";
import TuitControllerI from "../interfaces/TuitController";

export default class TuitController implements TuitControllerI {
    app: Express;
    tuitDao: TuitDao;
    userDao: UserDao;
    constructor(app: Express, tuitDao: TuitDao, userDao: UserDao) {
        this.app = app;
        this.tuitDao = tuitDao;
        this.userDao = userDao;
        this.app.get("/tuits", this.findAllTuits);
        this.app.get("/tuits/:tid", this.findTuitById);
        this.app.get("users/:uid/tuits", this.findTuitsByUser);
        this.app.post("/tuits", this.createTuit);
        this.app.delete("/tuits/:tid", this.deleteTuit);
        this.app.put("/tuits/:tid", this.updateTuit);
    }

    findAllTuits = (req: Request, res: Response) =>
        this.tuitDao.findAllTuits().then((tuits) => res.json(tuits));

    findTuitById = (req: Request, res: Response) =>
        this.tuitDao
            .findTuitById(req.params.tid)
            .then((tuit) => res.json(tuit));

    findTuitsByUser = (req: Request, res: Response) =>
        this.tuitDao
            .findTuitsByUser(req.params.uid)
            .then((tuits) => res.json(tuits));

    createTuit = async (req: Request, res: Response) => {
        const { uid } = req.body.postedBy;
        const user = await this.userDao.findUserById(uid);
        const newTuit = { ...req.body, postedBy: user };
        this.tuitDao
            .createTuit(newTuit)
            .then((tuit) => res.json(tuit))
            .catch((status) => res.json(status));
    };

    updateTuit = (req: Request, res: Response) =>
        this.tuitDao
            .updateTuit(req.params.tid, req.body)
            .then((status) => res.json(status));

    deleteTuit = (req: Request, res: Response) =>
        this.tuitDao
            .deleteTuit(req.params.tid)
            .then((status) => res.json(status));
}
