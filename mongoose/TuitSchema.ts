import mongoose from "mongoose";
import User from "./UserSchema";
const TuitSchema = new mongoose.Schema(
    {
        tuit: { type: String, required: true },
        postedOn: Date,
        postedBy: { type: User, required: true },
    },
    { collection: "tuits" }
);

export default TuitSchema;
