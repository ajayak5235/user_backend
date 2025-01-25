import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import { connectDB } from "./utils/db.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
connectDB();
app.use("/api/users", userRoutes);
app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error" });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
export default app;
