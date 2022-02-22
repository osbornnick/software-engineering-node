/**
 * @file Controller RESTful Web service API for messages resource
 */

import { Express, Request, Response } from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *      <li></li>
 *      <li></li>
 *      <li></li>
 *      <li></li>
 *      <li></li>
 *      <li></li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing message CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return {MessageController}
     */
    public static getInstance(app: Express) {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.post(
                "/api/users/:uid/messages/:oid",
                MessageController.messageController.send
            );
            app.get(
                "/api/users/:uid/messages/sent",
                MessageController.messageController.findSentMessages
            );
            app.get(
                "/api/users/:uid/messages/received",
                MessageController.messageController.findReceivedMessages
            );
            app.delete(
                "/api/messages/:mid",
                MessageController.messageController.deleteMessage
            );
            app.put(
                "/api/messages/:mid",
                MessageController.messageController.editMessage
            );
            app.post(
                "/api/users/:uid/messages",
                MessageController.messageController.broadcast
            );
        }
    }

    /**
     * Send a message
     * @param {Request} req Represents request from client, including
     * the from and to user ids in the request parameters, and message details in the
     * request body
     * @param {Response} res Represents response to client, including
     * the new message object in the body formatted as a JSON object
     */
    send = (req: Request, res: Response) =>
        MessageController.messageDao
            .send(req.params.uid, req.params.oid, req.body)
            .then((msg) => res.json(msg));

    /**
     * find messages sent by user
     * @param {Request} req Represents request from client, including
     * the users id in the request parameters
     * @param {Response} res Represents response to client, including
     * an array of messages formatted as a JSON array in the response body
     */
    findSentMessages = (req: Request, res: Response) =>
        MessageController.messageDao
            .findSentMessages(req.params.uid)
            .then((msgs) => res.json(msgs));

    /**
     * find all messages sent to given user
     * @param {Request} req Represents request from client, including
     * the receiving users id in request parameters
     * @param {Response} res Represents response to client, including
     * the found messages formatted as a JSON array in the response body.
     */
    findReceivedMessages = (req: Request, res: Response) =>
        MessageController.messageDao
            .findReceivedMessages(req.params.uid)
            .then((msgs) => res.json(msgs));

    /**
     * delete a message
     * @param {Request} req Represents request from client, including
     * the message id in the request parameters
     * @param {Response} res Represents response to client, including
     * the status of the delete operation formatted as a JSON object
     * in the response body
     */
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao
            .deleteMessage(req.params.mid)
            .then((status) => res.json(status));

    /**
     * edit a message
     * @param {Request} req Represents request from client, including
     * the id of the message in the request parameters and the message changes
     * in the request body formatted as a JSON object
     * @param {Response} res Represents response to client, including
     * the updated messages formatted as a JSON object in the response body
     */
    editMessage = (req: Request, res: Response) =>
        MessageController.messageDao
            .editMessage(req.params.mid, req.body)
            .then((msg) => res.json(msg));

    /**
     * Broadcast a message to all users except the sending user
     * @param {Request} req Represents request from client, including
     * the sending users id as a request parameter and the message in the body
     * @param {Response} res Represents response to client, including the created
     * messages formatted as a JSON array in the respnse body
     */
    broadcast = (req: Request, res: Response) =>
        MessageController.messageDao
            .broadcast(req.params.uid, req.body)
            .then((msgs) => res.json(msgs));
}
