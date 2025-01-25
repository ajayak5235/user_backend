import mongoose, { Schema } from "mongoose";
import { v4 as uuidv4 } from "uuid";
const authSchema = new Schema({
    id: { type: String, default: uuidv4, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
export default mongoose.model("Auth", authSchema);
