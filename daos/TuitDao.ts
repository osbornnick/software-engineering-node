import TuitDaoI from "../interfaces/TuitDao";
import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";

export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) TuitDao.tuitDao = new TuitDao();
        return TuitDao.tuitDao;
    };

    private constructor() {}
    async findAllTuits(): Promise<Tuit[]> {
        return await TuitModel.find();
    }

    findTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({ postedBy: uid });

    findTuitById = async (tid: string): Promise<Tuit> =>
        TuitModel.findById(tid);

    async createTuit(tuit: Tuit): Promise<Tuit> {
        return await TuitModel.create(tuit);
    }
    async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return await TuitModel.updateOne({ _id: tid }, { $set: tuit });
    }
    async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({ _id: tid });
    }
}
