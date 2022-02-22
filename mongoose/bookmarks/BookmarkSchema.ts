/**
 * @file Implements mongoose schema representing Bookmark data type
 */

import mongoose, { Schema } from "mongoose";
import Bookmark from "../../models/bookmarks/Bookmark";

const BookmarkSchema = new mongoose.Schema<Bookmark>(
    {
        bookmarkedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
        tuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
    },
    { collection: "bookmarks" }
);
export default BookmarkSchema;
