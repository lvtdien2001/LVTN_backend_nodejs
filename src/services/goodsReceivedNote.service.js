import goodsReceivedNoteModel from '../models/goodsReceivedNote.model';

class GoodsReceivedNoteService {
    async findById(id) {
        try {
            const goodsReceivedNote = await goodsReceivedNoteModel
                .findById(id)
                .populate('createdBy', ['_id', 'email', 'fullName', 'phoneNumber'])
                .populate('updatedBy', ['_id', 'email', 'fullName', 'phoneNumber'])
                .populate({
                    path: 'products',
                    populate: { path: 'product', select: ['_id', 'name'] },
                    populate: { path: 'supplier' }
                })
            return {
                statusCode: 200,
                success: true,
                goodsReceivedNote
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                success: false,
                msg: 'Internal server error'
            }
        }
    }

    async findAll(productId) {
        try {
            let condition = productId && { 'products.product': productId };
            const goodsReceivedNotes = await goodsReceivedNoteModel
                .find(condition)
                .populate('createdBy', ['_id', 'email', 'fullName', 'phoneNumber'])
                .populate('updatedBy', ['_id', 'email', 'fullName', 'phoneNumber'])
                .populate({
                    path: 'products',
                    populate: { path: 'supplier' }
                })
                .populate({
                    path: 'products',
                    populate: { path: 'product', select: ['_id', 'name'] }
                })
                .sort({ createdAt: -1 })
            return {
                statusCode: 200,
                success: true,
                goodsReceivedNotes
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                success: false,
                msg: 'Internal server error'
            }
        }
    }

    async create(payload) {
        try {
            const totalAmount = payload.products.reduce((prevTotalAmount, product) => prevTotalAmount + Number(product.amount), 0);
            const newGoodsReceivedNote = new goodsReceivedNoteModel({
                createdBy: payload.userId,
                products: payload.products,
                totalAmount
            })
            await newGoodsReceivedNote.save();
            return {
                statusCode: 200,
                success: true,
                newGoodsReceivedNote,
                msg: 'Tạo phiếu nhập kho thành công'
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                success: false,
                msg: 'Internal server error'
            }
        }
    }

    // async update(payload) {
    //     try {
    //         const totalAmount = payload.products.reduce((prevTotalAmount, product) => prevTotalAmount + Number(product.amount), 0);
    //         const updateData = {
    //             updatedBy: payload.userId,
    //             products: payload.products,
    //             totalAmount
    //         }

    //         const updatedGoodsReceivedNote = await goodsReceivedNoteModel
    //             .findByIdAndUpdate(payload.id, updateData, { new: true })
    //         if (!updatedGoodsReceivedNote) {
    //             return {
    //                 statusCode: 404,
    //                 success: false,
    //                 msg: 'Goods received note not found'
    //             }
    //         }

    //         return {
    //             statusCode: 200,
    //             success: true,
    //             updatedGoodsReceivedNote,
    //             msg: 'Cập nhật thông tin phiếu nhập kho thành công'
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return {
    //             statusCode: 500,
    //             success: false,
    //             msg: 'Internal server error'
    //         }
    //     }
    // }

    // async delete(id) {
    //     try {
    //         const deletedGoodsReceivedNote = await goodsReceivedNoteModel
    //             .findByIdAndDelete(id)
    //         if (!deletedGoodsReceivedNote) {
    //             return {
    //                 statusCode: 404,
    //                 success: false,
    //                 msg: 'Goods received note not found'
    //             }
    //         }

    //         return {
    //             statusCode: 200,
    //             success: true,
    //             deletedGoodsReceivedNote,
    //             msg: 'Xóa phiếu nhập kho thành công'
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         return {
    //             statusCode: 500,
    //             success: false,
    //             msg: 'Internal server error'
    //         }
    //     }
    // }
}

export default GoodsReceivedNoteService
