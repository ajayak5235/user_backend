import type { Request, Response } from "express"
import User from "../models/userModel.js"

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password")
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" })
  }
}


export const createUser = async (req: Request, res: Response) => {
    try {
      const { username,  age, hobbies } = req.body
      console.log(username,age,hobbies)
      const newUser = new User({ username, age, hobbies })
      await newUser.save()
      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        age: newUser.age,
        hobbies: newUser.hobbies,
      })
    } catch (error) {
      res.status(400).json({ message: "Error creating user" })
    }
  }

  export const updateUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params
      const { username,  age, hobbies } = req.body
      const updatedUser = await User.findOneAndUpdate(
        { id: userId },
        { username, age, hobbies },
        { new: true },
      ).select("-password")
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" })
      }
      res.status(200).json({updatedUser, message:"User Update Successfully"})
    } catch (error) {
      res.status(400).json({ message: "Error updating user" })
    }
  }
  
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params
      const deletedUser = await User.findOneAndDelete({ id: userId })
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" })
      }
      return res.status(200).json({message:"User deleted successfully"})
    } catch (error) {
      res.status(400).json({ message: "Error deleting user" })
    }
  }