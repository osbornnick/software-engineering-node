import { Request, Response } from "express";

export default interface BookmarkControllerI {
    bookmark(req: Request, res: Response): void;
    unbookmark(req: Request, res: Response): void;
    findUsersBookmarks(req: Request, res: Response): void;
    getAllBookmarks(req: Request, res: Response): void;
    deleteAllBookmarks(req: Request, res: Response): void;
}
