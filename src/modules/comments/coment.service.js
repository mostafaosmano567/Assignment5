import Comment from "../../DB/models/comment.model.js";
import User from "../../DB/models/users.model.js";
import Post from "../../DB/models/post.model.js";

export const addComments = async (req, res, next) => {
  try {
    const comments = await Comment.bulkCreate(req.body);

    res.status(201).json({
      message: "Comments created",
      comments
    });
  } catch (error) {
    next(error);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { userId, content } = req.body;

    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.userId !== userId) {
      return res.status(403).json({ message: "this comment not yours" });
    }

    comment.content = content;
    await comment.save();

    res.status(200).json({
      message: "Comment updated",
      comment
    });

  } catch (error) {
    next(error);
  }
};

export const findOrCreateComment = async (req, res, next) => {
  try {
    const { postId, userId, content } = req.body;

    const [comment, created] = await Comment.findOrCreate({
      where: { postId, userId, content },
      defaults: { postId, userId, content }
    });

    res.status(created ? 201 : 200).json({
      message: created ? "Comment created" : "Comment already exists",
      comment
    });

  } catch (error) {
    next(error);
  }
};

export const searchComments = async (req, res, next) => {
  try {
    const { word } = req.query;

    const { rows, count } = await Comment.findAndCountAll();

    const matched = rows.filter(comment => comment.content.includes(word));

    res.status(200).json({
      message: "Comments matched",
      count: matched.length,
      comments: matched
    });

  } catch (error) {
    next(error);
  }
};
export const getNewestComments = async (req, res, next) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.findAll({
      where: { postId },
      order: [["createdAt", "DESC"]],
      limit: 3
    });

    res.status(200).json({
      message: "Newest comments",
      comments
    });

  } catch (error) {
    next(error);
  }
};
export const getCommentDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id, {
      include: [
        { model: User },
        { model: Post }
      ]
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({
      message: "Comment details",
      comment
    });

  } catch (error) {
    next(error);
  }
};