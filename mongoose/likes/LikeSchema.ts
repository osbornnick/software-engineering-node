/**
 * @file Implements mongoose schema representing Like data type
 */

import mongoose, { Schema } from "mongoose";
import Like from "../../models/likes/Like";

const LikeSchema = new mongoose.Schema<Like>(
    {
        tuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
        likedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
    },
    { collection: "likes" }
);
export default LikeSchema;
