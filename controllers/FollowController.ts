/**
 * @file Controller RESTful Web service API for follows resource
 */

import { Express, Request, Response } from "express";

import FollowDao from "../daos/FollowDao";
import FollowControllerI from "../interfaces/FollowControllerI";

/**
 * @class FollowController Implements RESTful Web service API for follows resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *      <li>POST /api/users/:uid/follow/:oid to create a follow relationship between first user and second user</li>
 *      <li>DELETE /api/users/:uid/follow/:oid to unfollow a user</li>
 *      <li>GET /api/users/:uid/followed to get users followed by given user</li>
 *      <li>GET /api/users/:uid/following to get users following given user</li>
 *      <li>DELETE /api/users/:uid/followed to unfollow all users</li>
 *      <li>GET /api/users/:uid/follow/:oid to determine if second user follows first user</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing follow CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class FollowController implements FollowControllerI {
    private static followDao: FollowDao = FollowDao.getInstance();
    private static followController: FollowController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return {FollowController}
     */
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

    /**
     * Follow a user
     * @param {Request} req Represents request from client,
     * including following and followed users ids in request parameters
     * @param {Response} res Represents response to client, including
     * the new follow object formatted as a JSON object
     */
    userFollowsUser = (req: Request, res: Response) =>
        FollowController.followDao
            .userFollowsUser(req.params.uid, req.params.oid)
            .then((follow) => res.json(follow));

    /**
     * Unfollow a user
     * @param {Request} req Represents request from client, including
     * the ids of the folowing and followed user
     * @param {Response} res Represents response to client, with the
     * status of the record deletion formatted as a JSON object
     */
    userUnfollowsUser = (req: Request, res: Response) =>
        FollowController.followDao
            .userUnfollowsUser(req.params.uid, req.params.oid)
            .then((follow) => res.json(follow));

    /**
     * Get users followed by given user
     * @param {Request} req Represents request from client, including
     * id of user to find users followed by given user
     * @param {Response} res Represents response to client, including
     * the follow objects formatted as a JSON array
     */
    usersFollowed = (req: Request, res: Response) =>
        FollowController.followDao
            .usersFollowed(req.params.uid)
            .then((follows) => res.json(follows));

    /**
     * Get users following a given user
     * @param {Request} req Represents request from client, including
     * id of user to find followers of in request paramaters
     * @param {Response} res Represents response to client, with the list
     * of following users formatted as a JSON array
     */
    usersFollowing = (req: Request, res: Response) =>
        FollowController.followDao
            .usersFollowing(req.params.uid)
            .then((follows) => res.json(follows));

    /**
     * Unfollow all followed users
     * @param {Request} req Represents request from client, including
     * id of user to unfollow all followed users
     * @param {Response} res Represents response to client, including
     * status of delete operation as a JSON object
     */
    unfollowAll = (req: Request, res: Response) =>
        FollowController.followDao
            .unfollowAll(req.params.uid)
            .then((follows) => res.json(follows));

    /**
     * Check if one user follows another
     * @param {Request} req Represents request from client, including
     * checking and checked user ids as request parameters
     * @param {Response} res Represents response to client, including
     * the found (or not found) follow object as a JSON object or empty array
     */
    followsBack = (req: Request, res: Response) =>
        FollowController.followDao
            .followsBack(req.params.uid, req.params.oid)
            .then((follow) => res.json(follow));
}
