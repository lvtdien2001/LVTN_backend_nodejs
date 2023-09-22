import supplierModel from '../models/supplier.model';
import goodsReceivedNoteModel from '../models/goodsReceivedNote.model';

class SupplierService {
    async findById(supplierId) {
        try {
            const supplier = await supplierModel
                .findById(supplierId)
                .populate('createdBy', ['_id', 'email', 'fullName', 'phoneNumber'])
                .populate('updatedBy', ['_id', 'email', 'fullName', 'phoneNumber'])
            return {
                statusCode: 200,
                success: true,
                supplier
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
            const suppliers = await supplierModel
                .find()
                .populate('createdBy', ['_id', 'email', 'fullName', 'phoneNumber'])
                .populate('updatedBy', ['_id', 'email', 'fullName', 'phoneNumber'])
            return {
                statusCode: 200,
                success: true,
                suppliers
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
            const docs = await supplierModel.findOne({}, {}, { sort: { 'createdAt': -1 } });
            let supplierCode = docs ? (Number(docs.code) + 1) : 1;
            if (supplierCode < 10) {
                supplierCode = '0' + supplierCode;
            }
            const newSupplier = new supplierModel({
                createdBy: payload.userId,
                updatedBy: payload.userId,
                name: payload.name,
                code: supplierCode,
                address: payload.address
            })
            await newSupplier.save();
            return {
                statusCode: 200,
                success: true,
                newSupplier,
                msg: 'Thêm nhà cung cấp mới thành công'
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
            const updateCondition = {
                _id: payload.supplierId
            }
            const updateData = {
                name: payload.name,
                address: payload.address,
                updatedBy: payload.userId
            }
            const updatedSupplier = await supplierModel.findOneAndUpdate(updateCondition, updateData, { new: true });
            if (!updatedSupplier) {
                return {
                    statusCode: 404,
                    success: false,
                    msg: 'Supplier not found'
                }
            }
            return {
                statusCode: 200,
                success: true,
                updatedSupplier,
                msg: 'Cập nhật thông tin nhà cung cấp thành công'
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

    async delete(supplierId) {
        try {
            const docs = await goodsReceivedNoteModel.countDocuments({ 'products.supplier': supplierId });
            if (docs > 0) {
                return {
                    statusCode: 400,
                    success: false,
                    msg: 'Không thể xóa nhà cung cấp này'
                }
            }

            const deletedSupplier = await supplierModel.findByIdAndDelete(supplierId);
            if (!deletedSupplier) {
                return {
                    statusCode: 404,
                    success: false,
                    msg: 'Supplier not found'
                }
            }
            return {
                statusCode: 200,
                success: true,
                msg: 'Xóa nhà cung cấp thành công',
                deletedSupplier
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

export default SupplierService