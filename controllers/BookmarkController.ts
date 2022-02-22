import { Express, Request, Response } from "express";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";

export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkController: BookmarkController | null = null;
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
    public static getInstance = (app: Express) => {
        if (BookmarkController.bookmarkController === null) {
            BookmarkController.bookmarkController = new BookmarkController();
            app.post(
                "/api/users/:uid/bookmarks/:tid",
                BookmarkController.bookmarkController.bookmark
            );
            app.delete(
                "/api/users/:uid/bookmarks/:tid",
                BookmarkController.bookmarkController.unbookmark
            );
            app.get(
                "/api/users/:uid/bookmarks",
                BookmarkController.bookmarkController.findUsersBookmarks
            );
            app.get(
                "/api/bookmarks",
                BookmarkController.bookmarkController.getAllBookmarks
            );
            app.delete(
                "/api/bookmarks",
                BookmarkController.bookmarkController.deleteAllBookmarks
            );
        }
        return BookmarkController.bookmarkController;
    };
    private constructor() {}

    bookmark = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao
            .bookmark(req.params.uid, req.params.tid)
            .then((bookmark) => res.json(bookmark));
    };
    unbookmark = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao
            .unbookmark(req.params.uid, req.params.tid)
            .then((status) => res.json(status));
    };
    findUsersBookmarks = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao
            .findUsersBookmarks(req.params.uid)
            .then((bookmarks) => res.json(bookmarks));
    };
    getAllBookmarks = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao
            .getAllBookmarks()
            .then((bookmarks) => res.json(bookmarks));
    };
    deleteAllBookmarks = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao
            .deleteAllBookmarks()
            .then((status) => res.json(status));
    };
}
