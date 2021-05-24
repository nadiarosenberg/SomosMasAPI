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

const isEmpty = (result) => {
  var bool;
  result.length === 0 ? (bool = null) : (bool = 1);
  return bool;
};

commentsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await handler.getAllByNewReportId(id);
    if (isEmpty(results)) {
      res.status(200).json(results);
    } else {
      res.status(404).send("No comments for that id");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = commentsRouter;
