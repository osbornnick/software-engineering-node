import FollowDaoI from "../interfaces/FollowDaoI";
import FollowModel from "../mongoose/follows/FollowModel";
import Follow from "../models/follows/Follow";
export default class FollowDao implements FollowDaoI {
    private static followDao: FollowDao | null = null;
    public static getInstance = (): FollowDao => {
        if (FollowDao.followDao === null) {
            FollowDao.followDao = new FollowDao();
        }
        return FollowDao.followDao;
    };
    private constructor() {}

    userFollowsUser = async (uid: string, oid: string): Promise<Follow> => {
        return FollowModel.create({ userFollowing: uid, userFollowed: oid });
    };
    userUnfollowsUser = async (uid: string, oid: string): Promise<any> =>
        FollowModel.deleteOne({ userFollowing: uid, userFollowed: oid });
    // return users followed by uid
    usersFollowed = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({ userFollowing: uid })
            .populate("userFollowed", ["_id", "username", "email"])
            .exec();
    // return users following uid
    usersFollowing = async (uid: string): Promise<Follow[]> =>
        FollowModel.find({ userFollowed: uid })
            .populate("userFollowing", ["_id", "username", "email"])
            .exec();
    unfollowAll = async (uid: string): Promise<any> =>
        FollowModel.deleteMany({ userFollowing: uid });

    followsBack = async (uid: string, oid: string): Promise<any> =>
        FollowModel.find({ userFollowing: oid, userFollowed: uid });
}
