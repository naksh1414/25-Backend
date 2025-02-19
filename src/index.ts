import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db";
import userRoutes from "./routes/userRoutes";
import eventRoutes from "./routes/eventRoutes"
import teamRoutes from "./routes/teamRoutes"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB()

app.use("/api/v1", userRoutes);
app.use("/api/v1", eventRoutes);
app.use("/api/v1", teamRoutes);


app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
