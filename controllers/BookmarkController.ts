/**
 * @file Controller RESTful Web service API for bookmarks resource
 */

import { Express, Request, Response } from "express";
import BookmarkControllerI from "../interfaces/BookmarkControllerI";
import BookmarkDao from "../daos/BookmarkDao";

/**
 * @class BookmarkController Implements RESTful Web service API for bookmarks resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *      <li>POST /api/users/:uid/bookmarks/:tid to create a new bookmark instance relating tuit and user</li>
 *      <li>DELETE /api/users/:uid/bookmarks/:tid to delete the bookmark instance relating user and tuit</li>
 *      <li>GET /api/users/:uid/bookmarks to get all users bookmarks</li>
 *      <li>GET /api/bookmarks to get all bookmarks </li>
 *      <li>DELETE /api/bookmarks to delete all bookmarks </li>
 * </ul>
 *
 * @property {BookmarkDao} bookmarkDao Singleton DAO implementing bookmark CRUD operations
 * @property {BookmarkController} bookmarkController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarkControllerI {
    private static bookmarkController: BookmarkController | null = null;
    private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return {BookmarkController}
     */
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

    /**
     * Create a new bookmark and return it
       @param {Request} req Represents request from client, including
       the user and tuit ids as parameters
     * @param {Response} res Represents response to client, including the body 
       formatted as a JSON object containing the new bookmark
     */
    bookmark = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao
            .bookmark(req.params.uid, req.params.tid)
            .then((bookmark) => res.json(bookmark));
    };

    /**
     * Remove a bookmark and return it
     * @param {Request} req Represents request from client, including
     * the user and tuit ids as parameters
     * @param {Response} res Represents response to client, including
     * the new bookmark formatted as a JSON object
     */
    unbookmark = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao
            .unbookmark(req.params.uid, req.params.tid)
            .then((status) => res.json(status));
    };

    /**
     * Find all bookmarks related to given user
     * @param {Request} req Represents request from client,
     * containing user id in request parameters
     * @param {Response} res Represents response to client,
     * including the bookmarks found formatted as a JSON array
     */
    findUsersBookmarks = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao
            .findUsersBookmarks(req.params.uid)
            .then((bookmarks) => res.json(bookmarks));
    };

    /**
     * get all bookmarks in the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including
     * all bookmarks in the db formatted as a JSON array
     */
    getAllBookmarks = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao
            .getAllBookmarks()
            .then((bookmarks) => res.json(bookmarks));
    };

    /**
     * Delete all bookmarks in the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client,
     * returning the number of bookmarks deleted as a JSON object
     */
    deleteAllBookmarks = (req: Request, res: Response) => {
        BookmarkController.bookmarkDao
            .deleteAllBookmarks()
            .then((status) => res.json(status));
    };
}
