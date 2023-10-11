import commentModel from '../models/comment.model';
import orderModel from '../models/order.model';

class CommentService {
    async findById(id) {
        try {
            const comment = await commentModel
                .findById(id)
                .populate('user', ['_id', 'email', 'fullName', 'avatar'])
                .populate('product', ['_id', 'name'])
            if (!comment) {
                return {
                    statusCode: 404,
                    success: false,
                    msg: 'Comment not found'
                }
            }
            return {
                statusCode: 200,
                success: true,
                comment
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                msg: 'Internal server error',
                success: false
            }
        }
    }

    async findByUser(productId, userId) {
        try {
            const comment = await commentModel
                .findOne({ user: userId, product: productId })
                .populate('user', ['_id', 'email', 'fullName', 'avatar'])
                .populate('product', ['_id', 'name'])

            if (!comment) {
                return {
                    statusCode: 404,
                    success: false,
                    msg: 'Comment not found'
                }
            }
            return {
                statusCode: 200,
                success: true,
                comment
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                msg: 'Internal server error',
                success: false
            }
        }
    }

    async findByProduct(productId) {
        try {
            const comments = await commentModel
                .find({ product: productId })
                .populate('user', ['_id', 'email', 'fullName', 'avatar'])
                .populate('product', ['_id', 'name'])
                .sort({ updatedAt: -1 })

            return {
                statusCode: 200,
                success: true,
                comments
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                msg: 'Internal server error',
                success: false
            }
        }
    }

    async create(payload) {
        try {
            // check order
            // const order = await orderModel.findOne({
            //     user: payload.userId,
            //     products: {
            //         $elemMatch: { product: { $gte: payload.productId } }
            //     }
            // })
            // if (!order) {
            //     return {
            //         statusCode: 400,
            //         success: false,
            //         msg: 'Invalid user'
            //     }
            // }
            // check comment
            const comment = await commentModel.findOne({
                user: payload.userId,
                product: payload.productId
            })
            if (comment) {
                return {
                    statusCode: 400,
                    success: false,
                    msg: 'Comment of this user is exist'
                }
            }
            // create new comment
            const newComment = new commentModel({
                user: payload.userId,
                product: payload.productId,
                content: payload.content,
                star: payload.star
            })
            await newComment.save();
            return {
                statusCode: 200,
                success: true,
                msg: 'Đánh giá sản phẩm thành công',
                newComment
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                msg: 'Internal server error',
                success: false
            }
        }
    }

    async update(payload) {
        try {
            if (Number(payload.star) < 1 || Number(payload.star) > 5) {
                return {
                    statusCode: 400,
                    success: false,
                    msg: 'Invalid rating'
                }
            }
            const updateCondition = { _id: payload.id, user: payload.userId };
            const updateData = { content: payload.content, star: payload.star };
            const updatedComment = await commentModel.findOneAndUpdate(updateCondition, updateData, { new: true });
            if (!updatedComment) {
                return {
                    statusCode: 404,
                    success: false,
                    msg: 'Comment not found or user not authorised'
                }
            }
            return {
                statusCode: 200,
                success: true,
                msg: 'Cập nhật đánh giá thành công',
                updatedComment
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                msg: 'Internal server error',
                success: false
            }
        }
    }

    async delete(payload) {
        try {
            const deleteCondition = { _id: payload.id, user: payload.userId };
            const deletedComment = await commentModel.findOneAndDelete(deleteCondition);
            if (!deletedComment) {
                return {
                    statusCode: 404,
                    success: false,
                    msg: 'Comment not found or user not authorised'
                }
            }
            return {
                statusCode: 200,
                success: true,
                msg: 'Xóa đánh giá thành công',
                deletedComment
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                msg: 'Internal server error',
                success: false
            }
        }
    }

    async deleteByProduct(productId) {
        try {
            await commentModel.deleteMany({ product: productId });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

export default CommentService