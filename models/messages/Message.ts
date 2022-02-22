/**
 * @file Declares Message data type representing data associated to two users, i.e. user messages another user
 */

import User from "../users/User";

/**
 * @typedef Message Represents message sent between users.
 * @property {string} message message sent between users
 * @property {User} to message sender
 * @property {User} from message receiver
 * @property {Date} sentOn message sent date
 */
export default interface Message {
    message: string;
    to: User;
    from: User;
    sentOn: Date;
}
