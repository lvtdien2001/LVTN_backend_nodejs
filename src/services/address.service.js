import addressModel from '../models/address.model';

class AddressService {
    async create(data, userId) {
        try {
            const numberOfAddress = await addressModel.countDocuments({ userId });

            const newAddress = new addressModel({
                fullName: data.fullName,
                phoneNumber: data.phoneNumber,
                province: data.province,
                district: data.district,
                ward: data.ward,
                description: data.description,
                userId,
                isDefault: numberOfAddress === 0 ? true : false
            });
            await newAddress.save();

            return {
                statusCode: 200,
                success: true,
                msg: 'Chúc mừng bạn đã thêm địa chỉ mới thành công',
                newAddress: newAddress
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

    async findById(addressId) {
        try {
            const address = await addressModel.findById(addressId)
            return {
                statusCode: 200,
                success: true,
                address
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

    async findByUser(userId) {
        try {
            const addresses = await addressModel.find({ userId })
            return {
                statusCode: 200,
                success: true,
                addresses
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

    async changeDefaultAddress(addressId, userId) {
        try {
            // set isDefault = false
            const oldDefaultAddress = await addressModel.findOneAndUpdate(
                { userId, isDefault: true },
                { isDefault: false }
            )
            // set isDefault = true
            const newDefaultAddress = await addressModel.findOneAndUpdate(
                { _id: addressId, userId },
                { isDefault: true },
                { new: true }
            );

            if (!newDefaultAddress) {
                await addressModel.findByIdAndUpdate(
                    oldDefaultAddress._id,
                    { isDefault: true }
                )
                return {
                    statusCode: 401,
                    success: false,
                    msg: 'Address not found or user not authorised'
                }
            }

            return {
                statusCode: 200,
                success: true,
                msg: 'Cập nhật địa chỉ mặc định thành công',
                newDefaultAddress
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

    async update(addressId, userId, data) {
        try {
            if (!data) {
                return {
                    statusCode: 404,
                    success: false,
                    msg: 'Data not found'
                }
            }

            const conditionUpdate = { _id: addressId, userId };
            const updateAddress = await addressModel.findOneAndUpdate(
                conditionUpdate,
                data,
                { new: true }
            )

            if (!updateAddress) {
                return {
                    statusCode: 401,
                    success: false,
                    msg: 'Address not found or user not authorised'
                }
            }

            return {
                statusCode: 200,
                success: true,
                msg: 'Cập nhật thông tin địa chỉ thành công',
                updateAddress
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

    async delete(addressId, userId) {
        try {
            const deleteCondition = { _id: addressId, userId, isDefault: false };
            const deleteAddress = await addressModel.findOneAndDelete(deleteCondition);

            if (!deleteAddress) {
                return {
                    statusCode: 401,
                    success: false,
                    msg: 'Address not found or user not authorised'
                }
            }

            return {
                statusCode: 200,
                success: true,
                msg: 'Xóa địa chỉ thành công',
                deleteAddress
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

export default AddressService