import Post from "../../DB/models/post.model.js";
import User from "../../DB/models/users.model.js";
import Comment from "../../DB/models/comment.model.js";

export const addPost = async (req, res, next) => {
  try {
    const newPost = new Post(req.body);   
    await newPost.save();                  

    res.status(201).json({
      message: "Post created",
      Post: newPost
    });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByPk(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== req.body.userId) {
      return res.status(403).json({ message: "You are not the owner of this post" });
    }

    await post.destroy();

    res.status(200).json({
      message: "Post deleted",
      Post: post
    });
  } catch (error) {
    next(error);
  }
};

export const Retrieveallposts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      attributes: ["id", "title"],
      include: [
        {
          model: User,
          attributes: ["id", "name"]
        },
        {
          model: Comment,
          attributes: ["id", "content"]
        }
      ]
    });

    res.status(200).json({
      message: "Posts retrieved",
      posts
    });
  } catch (error) {
    next(error);
  }
};

export const getPostsCommentCount = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      attributes: ["id", "title"],
      include: [
        {
          model: Comment,
          attributes: ["id"]
        }
      ]
    });

    const result = posts.map(post => ({
      id: post.id,
      title: post.title,
      commentCount: post.Comments.length
    }));

    res.status(200).json({
      message: "Posts with comment count",
      posts: result
    });
  } catch (error) {
    next(error);
  }
};