/**
 * @file Implements DAO managing data storage of Messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */

import MessageDaoI from "../interfaces/MessageDaoI";
import Message from "../models/messages/Message";
import MessageModel from "../mongoose/messages/MessageModel";
import UserModel from "../mongoose/users/UserModel";

/**
 * @class MessageDao implements Data Access Object managing data storage of messages
 * @property {MessageDao} messageDao private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    public static messageDao: MessageDao | null = null;

    /**
     *
     * @returns {MessageDao} single instance of MessageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    };

    private constructor() {}

    /**
     * send a message
     * @param {string} from id of sending user
     * @param {string} to id of receiving user
     * @param {Message} message object containing message text to send
     * @returns promise notified when message is added to db
     */
    send = async (from: string, to: string, message: Message) =>
        MessageModel.create({ ...message, from, to });
    /**
     * find messages sent by user
     * @param {string} uid id of user to find sent messages for
     * @returns promise notified when records are retrieved from db
     */
    findSentMessages = async (uid: string) =>
        MessageModel.find({ from: uid }).populate("to", ["username"]).exec();

    /**
     * find messages received by user
     * @param {string} uid id of user to find received messages for
     * @returns promise notified when records are retrieved from db
     */
    findReceivedMessages = async (uid: string) =>
        MessageModel.find({ to: uid }).populate("from", ["username"]).exec();

    /**
     * delete a message from the db
     * @param {string} mid id of message to delete
     * @returns promise notified when record is removed from db
     */
    deleteMessage = async (mid: string) => MessageModel.deleteOne({ _id: mid });

    /**
     * edit an existing message
     * @param {string} mid id of message being edited
     * @param {Message} message object containing new messages text to update message with
     * @returns promise notified when record is updated in db
     */
    editMessage = async (mid: string, message: Message) =>
        MessageModel.updateOne({ _id: mid }, { $set: { ...message } });

    /**
     * broadcast a message to all users, except sending user
     * @param {string} uid id of sending user
     * @param {Message} message to broadcast
     * @returns promise notified when records are added to db
     */
    broadcast = async (uid: string, message: Message) => {
        // will break if num users > 100000
        let users = await UserModel.find({ _id: { $ne: uid } });
        let documents = users.map((usr) => {
            return { from: uid, to: usr._id, message: message.message };
        });
        return MessageModel.insertMany(documents);
    };
}
