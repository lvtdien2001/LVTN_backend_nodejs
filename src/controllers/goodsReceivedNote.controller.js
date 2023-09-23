import GoodsReceivedNoteService from '../services/goodsReceivedNote.service';
import ProductService from '../services/product.service';

// @route GET /goods-received-note/:id
exports.findById = async (req, res) => {
    try {
        const goodsReceivedNoteService = new GoodsReceivedNoteService();
        const rsp = await goodsReceivedNoteService.findById(req.params.id);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            goodsReceivedNote: rsp.goodsReceivedNote
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error',
            success: false
        })
    }
}

// @route GET /goods-received-note?productId
exports.findAll = async (req, res) => {
    try {
        const goodsReceivedNoteService = new GoodsReceivedNoteService();
        const rsp = await goodsReceivedNoteService.findAll(req.query.productId);
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            goodsReceivedNotes: rsp.goodsReceivedNotes
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error',
            success: false
        })
    }
}

// @route POST /goods-received-note
exports.create = async (req, res) => {
    try {
        const payload = {
            userId: req.user?.id,
            products: req.body.products
        }
        const goodsReceivedNoteService = new GoodsReceivedNoteService();
        const productService = new ProductService();
        const rsp = await goodsReceivedNoteService.create(payload);
        if (rsp.success) {
            req.body.products?.forEach(async product => {
                await productService.increaseInventory(product.product, req.user?.id, product.quantity)
            })
        }
        res.status(rsp.statusCode).json({
            success: rsp.success,
            msg: rsp.msg,
            newGoodsReceivedNote: rsp.newGoodsReceivedNote
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal server error',
            success: false
        })
    }
}

// @route PUT /goods-received-note/:id
// exports.update = async (req, res) => {
//     try {
//         const payload = {
//             id: req.params.id,
//             userId: req.user?.id,
//             products: req.body.products
//         }
//         const goodsReceivedNoteService = new GoodsReceivedNoteService();
//         const rsp = await goodsReceivedNoteService.update(payload);
//         res.status(rsp.statusCode).json({
//             success: rsp.success,
//             msg: rsp.msg,
//             updatedGoodsReceivedNote: rsp.updatedGoodsReceivedNote
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             msg: 'Internal server error',
//             success: false
//         })
//     }
// }

// @route DELETE /goods-received-note/:id
// exports.delete = async (req, res) => {
//     try {
//         const goodsReceivedNoteService = new GoodsReceivedNoteService();
//         const rsp = await goodsReceivedNoteService.delete(req.params.id);
//         res.status(rsp.statusCode).json({
//             success: rsp.success,
//             msg: rsp.msg,
//             deletedGoodsReceivedNote: rsp.deletedGoodsReceivedNote
//         })
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             msg: 'Internal server error',
//             success: false
//         })
//     }
// }