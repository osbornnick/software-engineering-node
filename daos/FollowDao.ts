/**
 * @file Implements DAO managing data storage of Follows. Uses mongoose FollowModel
 * to integrate with MongoDB
 */

import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";

/**
 * @class FollowDao implements Data Access Object managing data storage of Follows
 * @property {FollowDao} followDao private single instance of FollowDao
 */
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    /**
     * Singleton factory method
     * @returns {FollowDao} single instance of this object
     */
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    };
    private constructor() {}

    /**
     * Create a follow object
     * @param {string} uid id of following user
     * @param {string} oid id of followed user
     * @returns promise notified when follow is inserted into db
     */
    userFollowsUser = async (uid: string, oid: string): Promise<Follow> =>
        FollowModel.create({ userFollowing: uid, userFollowed: oid });

    /**
     * delete a follow object
     * @param {string} uid id of following user
     * @param {string} oid id of followed user
     * @returns Promise notified when follow record is deleted
     */
    userUnfollowsUser = async (uid: string, oid: string): Promise<any> =>
        FollowModel.deleteOne({ userFollowing: uid, userFollowed: oid });

    // return users followed by uid
    /**
     * return all users followed by uid param
     * @param {string} uid id of user who is following
     * @returns promise notified when follow records retrieve from db
     */
    usersFollowed = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({ userFollowing: uid })
            .populate("userFollowed", ["_id", "username", "email"])
            .exec();
    // return users following uid
    /**
     * return all users that follow uid
     * @param {string} uid of user being followed
     * @returns promise notified when follow records are retrieved from db
     */
    usersFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({ userFollowed: uid })
            .populate("userFollowing", ["_id", "username", "email"])
            .exec();

    /**
     * unfollow all users followed by uid user
     * @param {string} uid id of user unfollowing all their followed users
     * @returns promise notified when records are removed from db
     */
    unfollowAll = async (uid: string): Promise<any> =>
        FollowModel.deleteMany({ userFollowing: uid });

    /**
     * Find if user uid is followed by user oid
     * @param {string} uid id of user checking their following
     * @param {string} oid id of user checked for follows uid
     * @returns promise notified when record is retrieved from db
     */
    followsBack = async (uid: string, oid: string): Promise<any> =>
        FollowModel.find({ userFollowing: oid, userFollowed: uid })
            .populate("userFollowing", ["_id", "username", "email"])
            .populate("userFollowed", ["_id", "username", "email"]);
}
