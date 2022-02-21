import Follow from "../models/follows/Follow";

/**
 * @file Declares API for Follows related data access object methods
 */
export default interface FollowDaoI {
    userFollowsUser(uid: string, oid: string): Promise<Follow>;
    userUnfollowsUser(uid: string, oid: string): Promise<any>;
    usersFollowed(uid: string): Promise<Follow[]>;
    usersFollowing(uid: string): Promise<Follow[]>;
    unfollowAll(uid: string): Promise<any>;
    followsBack(uid: string, oid: string): Promise<any>;
}
