import CommentService from '../services/comment.service';

// @route GET /comment/:id
exports.findById = async (req, res) => {
    try {
        const commentService = new CommentService();
        const rsp = await commentService.findById(req.params.id);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            comment: rsp.comment
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route GET /comment/by-user?productId
exports.findByUser = async (req, res) => {
    try {
        const { productId, userId } = req.query;
        const commentService = new CommentService();
        const rsp = await commentService.findByUser(productId, userId);

        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            comment: rsp.comment
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route GET /comment?productId
exports.findByProduct = async (req, res) => {
    try {
        const commentService = new CommentService();
        const rsp = await commentService.findByProduct(req.query.productId);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            comments: rsp.comments
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route POST /comment
exports.create = async (req, res) => {
    try {
        const payload = {
            userId: req.user?.id,
            productId: req.body.productId,
            content: req.body.content,
            star: req.body.star
        }
        const commentService = new CommentService();
        const rsp = await commentService.create(payload);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            newComment: rsp.newComment
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route PUT /comment/:id
exports.update = async (req, res) => {
    try {
        const payload = {
            userId: req.user?.id,
            id: req.params.id,
            content: req.body.content,
            star: req.body.star
        }
        const commentService = new CommentService();
        const rsp = await commentService.update(payload);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            updatedComment: rsp.updatedComment
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route DELETE /comment/:id
exports.delete = async (req, res) => {
    try {
        const payload = {
            userId: req.user?.id,
            id: req.params.id
        }
        const commentService = new CommentService();
        const rsp = await commentService.delete(payload);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            deletedComment: rsp.deletedComment
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}