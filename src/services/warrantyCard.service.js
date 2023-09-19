import warrantyCardModel from '../models/warrantyCard.model';

class WarrantyCardService {
    async findById(id) {
        try {
            const warrantyCard = await warrantyCardModel
                .findById(id)
                .populate('product', ['_id', 'name'])
            if (!warrantyCard) {
                return {
                    statusCode: 404,
                    success: false,
                    msg: 'Warranty card not found'
                }
            }
            return {
                statusCode: 200,
                success: true,
                warrantyCard
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

    async findAll() {
        try {
            const warrantyCards = await warrantyCardModel
                .find()
                .populate('product', ['_id', 'name'])
            return {
                statusCode: 200,
                success: true,
                warrantyCards
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

    async findByProduct(productId) {
        try {
            const warrantyCards = await warrantyCardModel
                .find({ product: productId })
                .populate('product', ['_id', 'name'])
            return {
                statusCode: 200,
                success: true,
                warrantyCards
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
            const newWarrantyCard = new warrantyCardModel({
                product: payload.productId,
                deadline: payload.deadline,
                customerInfo: payload.customerInfo
            })
            await newWarrantyCard.save();
            return {
                statusCode: 200,
                success: true,
                msg: 'Tạo phiếu bảo hành thành công',
                newWarrantyCard
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

    async update(payload) {
        try {
            const updateData = {
                product: payload.productId,
                deadline: payload.deadline,
                customerInfo: payload.customerInfo
            }
            const updatedWarrantyCard = await warrantyCardModel
                .findByIdAndUpdate(payload.id, updateData, { new: true })
                .populate('product', ['_id', 'name'])
            return {
                statusCode: !updatedWarrantyCard ? 404 : 200,
                success: !updatedWarrantyCard ? false : true,
                msg: !updatedWarrantyCard ? 'Warranty card not found' : 'Cập nhật thông tin phiếu bảo hành thành công',
                updatedWarrantyCard
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

    async delete(id) {
        try {
            const deletedWarrantyCard = await warrantyCardModel.findByIdAndDelete(id);
            return {
                statusCode: !deletedWarrantyCard ? 404 : 200,
                success: !deletedWarrantyCard ? false : true,
                msg: !deletedWarrantyCard ? 'Warranty card not found' : 'Xóa phiếu bảo hành thành công',
                deletedWarrantyCard
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

export default WarrantyCardService
