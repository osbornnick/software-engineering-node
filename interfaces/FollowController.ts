import { Request, Response } from "express";

export default interface FollowControllerI {
    userFollowsUser(req: Request, res: Response): void;
    userUnfollowsUser(req: Request, res: Response): void;
    usersFollowed(req: Request, res: Response): void;
    usersFollowing(req: Request, res: Response): void;
    unfollowAll(req: Request, res: Response): void;
    followsBack(req: Request, res: Response): void;
}
