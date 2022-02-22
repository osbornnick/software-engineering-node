import { Request, Response } from "express";

export default interface MessageControllerI {
    send(req: Request, res: Response): void;
    findSentMessages(req: Request, res: Response): void;
    findReceivedMessages(req: Request, res: Response): void;
    deleteMessage(req: Request, res: Response): void;
    editMessage(req: Request, res: Response): void;
    broadcast(req: Request, res: Response): void;
}
