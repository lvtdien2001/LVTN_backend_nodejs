import priceModel from '../models/price.model';
import productModel from '../models/product.model';

class PriceService {
    async findById(id) {
        try {
            const price = await priceModel
                .findById(id)
                .populate('product', ['_id', 'name'])
            if (!price) {
                return {
                    statusCode: 404,
                    success: false,
                    msg: 'Price not found'
                }
            }
            return {
                statusCode: 200,
                success: true,
                price
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
            const prices = await priceModel
                .find({ product: productId })
                .populate('product', ['_id', 'name'])
                .sort({ createdAt: -1 })
            return {
                statusCode: 200,
                success: true,
                prices
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
            const newPrice = new priceModel({
                product: payload.productId,
                value: payload.value
            });
            await newPrice.save();
            await productModel.updateOne({ _id: payload.productId }, { price: newPrice.value });
            return {
                statusCode: 200,
                success: true,
                msg: 'Cập nhật đơn giá sản phẩm thành công',
                newPrice
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
}

export default PriceService
