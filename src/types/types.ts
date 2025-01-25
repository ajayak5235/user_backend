import type { Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  age: number;
  hobbies: string[];
  
}
