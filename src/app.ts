import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || "")
  .then(() => console.log("Database connected"))
  .catch((error) => console.error(error));

app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
