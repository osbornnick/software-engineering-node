import BookmarkModel from "../mongoose/bookmarks/BookmarkModel";
import BookmarkDaoI from "../interfaces/BookmarkDaoI";

export default class BookmarkDao implements BookmarkDaoI {
    private static bookmarkDao: BookmarkDao | null = null;

    public static getInstance(): BookmarkDao {
        if (BookmarkDao.bookmarkDao === null) {
            BookmarkDao.bookmarkDao = new BookmarkDao();
        }
        return BookmarkDao.bookmarkDao;
    }

    bookmark = async (uid: string, tid: string) =>
        BookmarkModel.create({ bookmarkedBy: uid, tuit: tid });

    unbookmark = async (uid: string, tid: string) =>
        BookmarkModel.deleteOne({ bookmarkedBy: uid, tuit: tid });

    findUsersBookmarks = async (uid: string) =>
        BookmarkModel.find({ bookmarkedBy: uid }).populate("tuit").exec();

    getAllBookmarks = async () =>
        BookmarkModel.find({})
            .populate("bookmarkedBy", ["username, _id"])
            .populate("tuit")
            .exec();

    deleteAllBookmarks = async () => BookmarkModel.deleteMany({});

    private constructor() {}
}
