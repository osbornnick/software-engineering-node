import mongoose from "mongoose";
import User from "../models/User";
const TuitSchema = new mongoose.Schema(
    {
        tuit: { type: String, required: true },
        postedOn: Date,
        postedBy: { type: User, required: true },
    },
    { collections: "tuits" }
);

export default TuitSchema;
