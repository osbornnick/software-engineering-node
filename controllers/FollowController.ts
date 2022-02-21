/**
 * @file Controller RESTful Web service API for follows resource
 */

import { Express, Request, Response } from "express";

import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowController";

export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    public static getInstance = (app: Express): FollowController => {
        if (FollowController.followController === null) {
            FollowController.followController = new FollowController();
            app.post(
                "/api/users/:uid/follow/:oid",
                FollowController.followController.userFollowsUser
            );
            app.delete(
                "/api/users/:uid/follow/:oid",
                FollowController.followController.userUnfollowsUser
            );
            app.get(
                "/api/users/:uid/followed",
                FollowController.followController.usersFollowed
            );
            app.get(
                "/api/users/:uid/following",
                FollowController.followController.usersFollowing
            );
            app.delete(
                "/api/users/:uid/followed",
                FollowController.followController.unfollowAll
            );
            app.get(
                "/api/users/:uid/follow/:oid",
                FollowController.followController.followsBack
            );
        }
        return FollowController.followController;
    };

    private constructor() {}

    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao
            .userFollowsUser(req.params.uid, req.params.oid)
            .then((follow) => res.json(follow));

    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao
            .userUnfollowsUser(req.params.uid, req.params.oid)
            .then((follow) => res.json(follow));

    usersFollowed = (req: Request, res: Response) =>
        FollowController.followDao
            .usersFollowed(req.params.uid)
            .then((follows) => res.json(follows));

    usersFollowing = (req: Request, res: Response) =>
        FollowController.followDao
            .usersFollowing(req.params.uid)
            .then((follows) => res.json(follows));

    unfollowAll = (req: Request, res: Response) =>
        FollowController.followDao
            .unfollowAll(req.params.uid)
            .then((follows) => res.json(follows));

    followsBack = (req: Request, res: Response) =>
        FollowController.followDao
            .followsBack(req.params.uid, req.params.oid)
            .then((follow) => res.json(follow));
}
