/**
 * @file Implements DAO managing data storage of Bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */

import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import BookmarkDaoI from "../interfaces/BookmarkDaoI";
import Bookmark from "../models/bookmarks/Bookmark";

/**
 * @class BookmarkDao implements Data Access Object managing data storage of
 * Bookmarks
 * @property {BookmarkDao} bookmarkDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    /**
     * Singleton factory for BookmarkDao
     * @returns {BookmarkDao} instance of BookmarkDao
     */
    public static getInstance(): BookmarkDao {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    /**
     * Create a bookmark
     * @param {string} uid id of user creating bookmark
     * @param {string} tid id of tuit being bookmarked
     * @returns promise notified when new bookmark object is created
     */
    bookmark = async (uid: string, tid: string): Promise<Bookmark> =>
        BookmarkModel.create({ bookmarkedBy: uid, tuit: tid });

    /**
     * User unbookmarks a tuit
     * @param {string} uid of user removing bookmark
     * @param {string} tid of tuit user is unbookmarking
     * @returns promise notified when bookmark object is deleted
     */
    unbookmark = async (uid: string, tid: string): Promise<any> =>
        BookmarkModel.deleteOne({ bookmarkedBy: uid, tuit: tid });

    /**
     * find all bookmarks belonging to user
     * @param {string} uid of users bookmarks searched
     * @returns Promise notified when all bookmarks belonging to user are found, with tuit information populated
     */
    findUsersBookmarks = async (uid: string): Promise<Bookmark[]> =>
        BookmarkModel.find({ bookmarkedBy: uid }).populate("tuit").exec();

    /**
     * get all bookmark objects with bookmarked by and tuit object populated
     * @returns promise notified when all bookmarks are retrieved from db
     */
    getAllBookmarks = async (): Promise<Bookmark[]> =>
        BookmarkModel.find({})
            .populate("bookmarkedBy", ["username, _id"])
            .populate("tuit")
            .exec();

    /**
     * delete all bookmarks in collection
     * @returns promise notified when all bookmarks are deleted from db
     */
    deleteAllBookmarks = async (): Promise<any> => BookmarkModel.deleteMany({});

    private constructor() {}
}
