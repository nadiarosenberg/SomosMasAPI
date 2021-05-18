const router = require('express').Router();
const handler = require('../handlers/comment');

router.get('/', async (req, res, next) => {
    try {
        const result = await handler.getAllComments();
        res.status(200).json({
            ok: true,
            result: result
          });
    } catch (e) {
        console.log(e);
    }

});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await handler.getOneComment(id);
        if ( result === null ) {
            return res.status(404).json({
                ok: false,
                message: `Cannot find Comment with id = ${id}`
            })
        }
        res.status(200).json({
            ok: true,
            result: result
          });
    } catch (e) {
        console.log(e);
    }

});

router.post('/', async (req, res, next) => {

    const comment = {
        userId: req.body.userId,
        body: req.body.body,
        newReportId: req.body.newReportId,
        timestamps: Date.now(),
      };
      console.log(comment)
      
        try {
        const result = await handler.postComment(comment);
        res.status(200).json({
            ok: true,
            result: result
          });
    } catch (e) {
        console.log(e)

    }

});

router.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    const comment = {
        roleId: req.body.roleId,
        body: req.body.body,
        newReportId: req.body.newReportId,
      };
      
        try {
        const result = await handler.putComment(comment, id);
        if (  result == 1 ) {
            res.status(200).json({
                ok: true,
                message: 'Comment was updated successfully.',
                result: comment
              });
        } else {
            res.send({
              message: `Cannot update Comment with id = ${id}. Comment was not found or req.body is empty!`
            });
          }
    } catch (e) {
        res.status(500).send({
            message: "Error updating Comment with id = " + id
          });
    }

});

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const result = await handler.deleteComment(id);
        if ( result == 1 ) {
            res.json({
                ok: true,
                message: 'Comment was deleted successfully!'
              });
        } else {
            res.json({
                ok: false,
                message: `Cannot delete Comment with id = ${id}. Comment was not found!`
              });
        }
    } catch (e) {
        res.status(500).send({
            message: "Could not delete Comment with id = " + id
          });
    }

});

module.exports = router;