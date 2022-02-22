import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @file Declares API for Bookmarks related data access object methods
 */
export default interface BookmarkDaoI {
    bookmark(uid: string, tid: string): Promise<Bookmark>;
    unbookmark(uid: string, tid: string): Promise<any>;
    findUsersBookmarks(uid: string): Promise<Bookmark[]>;
    getAllBookmarks(): Promise<Bookmark>;
    deleteAllBookmarks(): Promise<any>;
}
