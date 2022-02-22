import { Express, Request, Response } from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";

export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

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
    send = (req: Request, res: Response) =>
        MessageController.messageDao
            .send(req.params.uid, req.params.oid, req.body)
            .then((msg) => res.json(msg));
    findSentMessages = (req: Request, res: Response) =>
        MessageController.messageDao
            .findSentMessages(req.params.uid)
            .then((msgs) => res.json(msgs));
    findReceivedMessages = (req: Request, res: Response) =>
        MessageController.messageDao
            .findReceivedMessages(req.params.uid)
            .then((msgs) => res.json(msgs));
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao
            .deleteMessage(req.params.mid)
            .then((status) => res.json(status));
    editMessage = (req: Request, res: Response) =>
        MessageController.messageDao
            .editMessage(req.params.mid, req.body)
            .then((msg) => res.json(msg));
    broadcast = (req: Request, res: Response) =>
        MessageController.messageDao
            .broadcast(req.params.uid, req.body)
            .then((msgs) => res.json(msgs));
}
