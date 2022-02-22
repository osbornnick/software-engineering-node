/**
 * @file Declares Tuit data type representing a tuit posted by a user
 */

import User from "../users/User";

/**
 * @typedef Tuit represents a public text authored by a certain user
 * @property {string} tuit text content of the Tuit
 * @property {User} postedBy author of this tuit
 * @property {Date} postedOn date tuit is authored
 */
export default interface Tuit {
    tuit: string;
    postedBy: User;
    postedOn?: Date;
}
