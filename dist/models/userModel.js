import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
const userSchema = new Schema({
    id: { type: String, default: uuidv4, unique: true },
    username: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    hobbies: { type: [String], default: [] },
});

export default mongoose.model("User", userSchema);
