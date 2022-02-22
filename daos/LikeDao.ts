/**
 * @file Implements DAO managing data storage of Likes. Uses mongoose LikeModel
 * to integrate with MongoDB
 */

import LikeDaoI from "../interfaces/LikeDaoI";
import LikeModel from "../mongoose/likes/LikeModel";
import Like from "../models/likes/Like";

/**
 * @class LikeDao implements Data Access Object managing data storage of Likes
 * @property {LikeDao} likeDao private single instance of LikeDao
 */
export default class LikeDao implements LikeDaoI {
    private static likeDao: LikeDao | null = null;

    /**
     * Singleton factory
     * @returns {LikeDao} single instance of LikeDao
     */
    public static getInstance = (): LikeDao => {
        if (LikeDao.likeDao === null) {
            LikeDao.likeDao = new LikeDao();
        }
        return LikeDao.likeDao;
    };

    private constructor() {}

    /**
     * find all users that liked given tuit
     * @param {string} tid id of tuit finding users who have liked
     * @returns promise notified when like records are retrieved from db
     */
    findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
        LikeModel.find({ tuit: tid }).populate("likedBy").exec();

    /**
     * find all tuits liked by user
     * @param {string} uid id of user liking tuits
     * @returns promise notified when like records are retrieved from db
     */
    findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
        LikeModel.find({ likedBy: uid }).populate("tuit").exec();

    /**
     * Like a tuit
     * @param {string} uid id of user liking tuit
     * @param {string} tid id of tuit being liked
     * @returns promise notified when record is created
     */
    userLikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.create({ tuit: tid, likedBy: uid });

    /**
     * Unlike a tuit
     * @param {string} uid id of user unlikeing tuit
     * @param {string} tid id of tuit being unliked
     * @returns promise notified when record is removed
     */
    userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
        LikeModel.deleteOne({ tuit: tid, likedBy: uid });
}
