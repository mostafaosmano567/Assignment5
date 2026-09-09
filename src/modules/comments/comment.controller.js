import { Router } from "express";
import * as CS from "./comment.service.js";

const commentRouter = Router();

commentRouter.post("/", CS.addComments);
commentRouter.patch("/:commentId", CS.updateComment);
commentRouter.post("/find-or-create", CS.findOrCreateComment);
commentRouter.get("/search", CS.searchComments);
commentRouter.get("/newest/:postId", CS.getNewestComments);
commentRouter.get("/details/:id", CS.getCommentDetails);
export default commentRouter;