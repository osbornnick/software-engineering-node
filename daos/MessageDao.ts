import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";
import UserModel from "../mongoose/users/UserModel";

export default class MessageDao implements MessageDaoI {
    public static messageDao: MessageDao | null = null;
    public static getInstance() {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    send = async (from: string, to: string, message: Message) =>
        MessageModel.create({ ...message, from, to });
    findSentMessages = async (uid: string) =>
        MessageModel.find({ from: uid }).populate("to", "username").exec();
    findReceivedMessages = async (uid: string) =>
        MessageModel.find({ to: uid }).populate("from", "username").exec();

    deleteMessage = async (mid: string) => MessageModel.deleteOne({ _id: mid });

    editMessage = async (mid: string, message: Message) =>
        MessageModel.updateOne({ _id: mid }, { $set: { ...message } });

    broadcast = async (uid: string, message: Message) => {
        // will break if num users > 100000
        let users = await UserModel.find({ _id: { $ne: uid } });
        let documents = users.map((usr) => {
            return { from: uid, to: usr._id, message: message.message };
        });
        return MessageModel.insertMany(documents);
    };
}
