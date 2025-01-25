import mongoose, { Schema } from "mongoose"
import { v4 as uuidv4 } from "uuid"
import type { IUser } from "../types/types.js"

const authSchema = new Schema<IUser>({
  id: { type: String, default: uuidv4, unique: true },
  username: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

export default mongoose.model<IUser>("Auth", authSchema)

