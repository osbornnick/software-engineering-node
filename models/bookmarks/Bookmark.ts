/**
 * @file Declares Bookmark data type for representing relationship between user and tuit, i.e. user bookmarks a tuit
 */

import User from "../users/User";
import Tuit from "../tuits/Tuit";

/**
 * @typedef Bookmark represent Bookmarks relationship between user and tuit
 * @property {User} bookmarkedBy user doing bookmarking
 * @property {Tuit} tuit Tuit being bookmarked
 */
export default interface Bookmark {
    bookmarkedBy: User;
    tuit: Tuit;
}
