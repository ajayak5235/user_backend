import express from "express";
import { getAllUsers, createUser, updateUser, deleteUser } from "../controllers/userControllers.js";
import { registerUser, loginUser } from "../controllers/authControllers.js";
import { protect } from "../middleware/authmiddleware.js";
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.use(protect); // All routes below this line will require authentication
router.get("/", getAllUsers);
router.post("/", createUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);
export default router;
