/**
 * @file Declares User data type representing a user of our application.
 */

import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

/**
 * @typedef User represents a user of our application
 * Most of these properties are self-explanatory
 * @property {string} username
 * @property {string} password
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} profilePhoto
 * @property {string} headerImage
 * @property {string} biography
 * @property {Date} dateOfBirth
 * @property {AccountType} accountType type of this account
 * @property {MaritalStatus} maritalStatus marital status of this user
 * @property {Location} location self-identified location of this user
 * @property {number} salary
 */
export default interface User {
    _id?: mongoose.Schema.Types.ObjectId;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    email: string;
    profilePhoto?: string;
    headerImage?: string;
    biography?: string;
    dateOfBirth?: Date;
    accountType?: AccountType;
    maritalStatus?: MaritalStatus;
    location?: Location;
    salary?: number;
}
