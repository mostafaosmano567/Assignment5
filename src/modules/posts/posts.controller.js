import { Router } from "express";
import * as PS from "./post.service.js";

const postRouter = Router();

postRouter.post("/", PS.addPost);
postRouter.delete("/:postId", PS.deletePost);
postRouter.get("/details", PS.Retrieveallposts);
postRouter.get("/comment-count", PS.getPostsCommentCount);

export default postRouter;