const commentsRouter = require("express").Router();
const handler = require("../handlers/comments");
const isAdminOrOwnsership = require("./middlewares/ownership");

commentsRouter.delete("/:id",isAdminOrOwnsership, async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await handler.getCommentById(id);
    if (!comment) {
      res.status(404).send("Comment not found!");
    }
    const result = await handler.deleteComments(id);
    res.status(200).send("Comment was deleted successfully!");
  } catch (e) {
    res.status(400).send(e.messege);
  }
});

module.exports = commentsRouter;
