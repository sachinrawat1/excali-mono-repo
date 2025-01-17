import express, { Request, Response } from "express";

import userRoutes from "./routes/userRoutes";
import roomRoutes from "./routes/roomRoutes";

const app = express();

app.use(express.json());

app.get("/", async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ status: true, message: "Api's running" });
  return;
});
app.use("/apis/v1/users", userRoutes);
app.use("/apis/v1/rooms", roomRoutes);

app.listen(5000, () => {
  console.log("http server running");
});
