import express from "express";
import { connectDB, syncDB } from "./DB/connectionDB.js";
import userRouter from "./modules/users/user.controller.js";
import postRouter from "./modules/posts/posts.controller.js";
import commentRouter from "./modules/comments/comment.controller.js";

const app = express();
const PORT = 3000;

const bootstrap = async () => {
  app.use(express.json());

  app.get("/", (req, res) => res.status(200).json({ message: "Hello, World!" }));

  await connectDB();
  await syncDB();

  app.use("/users", userRouter);  
  app.use("/posts", postRouter);
  app.use("/comments", commentRouter);
  app.use("/*demo", (req, res) => res.status(404).json({ message: "Route not found" })); 

  app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
};

export default bootstrap;