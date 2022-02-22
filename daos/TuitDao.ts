/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from "../mongoose/tuits/TuitModel";
import Tuit from "../models/tuits/Tuit";
import TuitDaoI from "../interfaces/TuitDaoI";

/**
 * @class UserDao Implements Data Access Object managing data storage
 * of Users
 * @property {UserDao} userDao Private single instance of UserDao
 */
export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null;

    /**
     * singleton factory for this object
     * @returns {TuitDao} single instance of TuitDao
     */
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    };
    private constructor() {}

    /**
     * Find all tuits
     * @returns promise notified when all tuit records are retrieved from database
     */
    findAllTuits = async (): Promise<Tuit[]> => TuitModel.find();

    /**
     * Find all tuits authored by a user
     * @param {string} uid id of user
     * @returns promise notified when all users tuits are retrieved from db
     */
    findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
        TuitModel.find({ postedBy: uid });

    /**
     * Find a specific tuit by id
     * @param {string} tid id of tuit to find
     * @returns promise notified when record is retrieved from db
     */
    findTuitById = async (tid: string): Promise<any> =>
        TuitModel.findById(tid).populate("postedBy").exec();

    /**
     * create a tuit
     * @param {string} uid id of user authoring tuit
     * @param {Tuit} tuit tuit details, most importantly tuit text
     * @returns promise notified when record inserted into db
     */
    createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
        TuitModel.create({ ...tuit, postedBy: uid });

    /**
     * Update a tuit
     * @param {string} uid id of tuit to update
     * @param {Tuit} tuit fields to update tuit with
     * @returns promise notified when record updated in db
     */
    updateTuit = async (tid: string, tuit: Tuit): Promise<any> =>
        TuitModel.updateOne({ _id: tid }, { $set: tuit });

    /**
     * Delete a tuit
     * @param {string} tid id of tuit to delete
     * @returns promise notified when record removed from db
     */
    deleteTuit = async (tid: string): Promise<any> =>
        TuitModel.deleteOne({ _id: tid });
}
