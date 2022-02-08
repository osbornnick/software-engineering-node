import mongoose, { Schema } from "mongoose";
import User from "./UserSchema";
const TuitSchema = new mongoose.Schema(
    {
        tuit: { type: String, required: true },
        postedOn: Date,
        postedBy: { type: Schema.Types.ObjectId, required: true },
    },
    { collection: "tuits" }
);

export default TuitSchema;
