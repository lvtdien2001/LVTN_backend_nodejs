import cartModel from '../models/cart.model';
import productModel from '../models/product.model';

class CartService {
    async checkInventory(productId, quantity) {
        try {
            const product = await productModel.findById(productId);
            if (product) {
                return quantity <= product.inventory;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async findById(cartId) {
        try {
            const cart = await cartModel
                .findById(cartId)
                .populate('product', ['_id', 'name', 'image', 'price', 'inventory'])
            return {
                statusCode: 200,
                success: true,
                cart
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

    async find(userId) {
        try {
            let findCondition = {
                user: userId
            };
            const carts = await cartModel
                .find(findCondition)
                .populate('product', ['_id', 'name', 'image', 'price', 'inventory'])
            return {
                statusCode: 200,
                success: true,
                carts
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

    async create(userId, productId, quantity) {
        try {
            const checkQuantity = await this.checkInventory(productId, quantity);
            if (!checkQuantity || quantity <= 0) {
                return {
                    statusCode: 401,
                    success: true,
                    msg: 'Invalid quantity or product not found'
                }
            }

            const cart = await cartModel.findOne({ user: userId, product: productId });
            if (cart) {
                const updateCart = await cartModel.findByIdAndUpdate(cart._id, { $inc: { quantity } });
                return {
                    statusCode: 200,
                    success: true,
                    newCart: updateCart,
                    msg: 'Thêm sản phẩm vào giỏ hàng thành công'
                }
            }
            const newCart = new cartModel({
                user: userId,
                product: productId,
                quantity
            })
            await newCart.save();
            return {
                statusCode: 200,
                success: true,
                newCart,
                msg: 'Thêm sản phẩm vào giỏ hàng thành công'
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

    async update(userId, cartId, quantity, productId) {
        try {
            const checkQuantity = await this.checkInventory(productId, quantity);
            if (!checkQuantity || quantity <= 0) {
                return {
                    statusCode: 401,
                    success: false,
                    msg: 'Invalid quantity or product not found'
                }
            }
            const updateCondition = {
                user: userId,
                _id: cartId
            }
            const updateCart = await cartModel.findOneAndUpdate(updateCondition, { quantity }, { new: true });
            if (!updateCart) {
                return {
                    statusCode: 401,
                    success: false,
                    msg: 'Cart not found or user not authorised'
                }
            }
            return {
                statusCode: 200,
                success: true,
                updateCart,
                msg: 'Cập nhật giỏ hàng thành công'
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

    async delete(userId, cartId) {
        try {
            const deleteCondition = {
                user: userId,
                _id: cartId
            }
            const deleteCart = await cartModel.findOneAndDelete(deleteCondition);
            if (!deleteCart) {
                return {
                    statusCode: 401,
                    success: false,
                    msg: 'Cart not found or user not authorised'
                }
            }
            return {
                statusCode: 200,
                success: true,
                msg: 'Xóa sản phẩm khỏi giỏ hàng thành công',
                deleteCart
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
}

export default CartService