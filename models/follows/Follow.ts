/**
 * @file Declares Follow data type representing user to user relationship, i.e. user follows another user
 */

import User from "../users/User";

/**
 * @typedef Follow represents a user-user relationship, i.e. user follows another user
 * @property {User} userFollowed user being followed
 * @property {User} userFollowing user doing the following
 */
export default interface Follow {
    userFollowed: User;
    userFollowing: User;
}
