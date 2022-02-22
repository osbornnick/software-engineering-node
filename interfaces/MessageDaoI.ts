import Message from "../models/messages/Message";

export default interface MessageDaoI {
    send(from: string, to: string, message: Message): Promise<Message>;
    findSentMessages(uid: string): Promise<Message[]>;
    findReceivedMessages(uid: string): Promise<Message[]>;
    deleteMessage(mid: string): Promise<any>;
    editMessage(mid: string, message: Message): Promise<any>;
    broadcast(uid: string, message: Message): Promise<any>;
}
