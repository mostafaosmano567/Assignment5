import {Router} from "express";
import * as US from "./user.service.js";
const userRouter = Router();

userRouter.post("/signup", US.addUser);
userRouter.get("/by-email", US.getbyemail);
userRouter.put("/:id", US.updateUser);
userRouter.get("/:id", US.getUserBypk);
export default userRouter;