import userModel from '../models/user.model';
import cloudinary from '../utils/cloudinary';

class UserService {
    async findAll() {
        try {
            const users = await userModel.find().select('-password');
            return {
                statusCode: 200,
                success: true,
                users
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

    async findById(userId) {
        try {
            const user = await userModel.findById(userId).select('-password');
            return {
                statusCode: 200,
                success: true,
                user
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

    async update(userId, data) {
        // if (!data.fullName && !data.phoneNumber) {
        //     return {
        //         statusCode: 404,
        //         success: false,
        //         msg: 'Data not found'
        //     }
        // }

        try {
            const updateUser = await userModel
                .findByIdAndUpdate(
                    userId,
                    data,
                    { new: true }
                ).select('-password');

            if (!updateUser) {
                return {
                    statusCode: 401,
                    success: false,
                    msg: 'User not found or user not authorised'
                }
            }

            return {
                statusCode: 200,
                success: true,
                msg: 'Cập nhật thông tin thành công',
                updateUser
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

    async updateAvatar(userId, image) {
        try {
            // upload new avatar
            const updaloadImg = await cloudinary.uploader.upload(image, { folder: 'avatars' });

            // delete old avatar
            const user = (await this.findById(userId)).user;
            if (user.avatar.cloudId) {
                await cloudinary.uploader.destroy(user.avatar.cloudId);
            }

            const data = {
                avatar: {
                    url: updaloadImg.secure_url,
                    cloudId: updaloadImg.public_id
                }
            }

            return await this.update(userId, data);
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                success: false,
                msg: 'Internal server error'
            }
        }
    }

    async disable(userId) {
        try {
            const disabledUser = await userModel
                .findByIdAndUpdate(
                    userId,
                    [{ '$set': { 'isDisabled': { '$eq': [false, '$isDisabled'] } } }],
                    { new: true })
                .select('-password');

            if (!disabledUser) {
                return {
                    statusCode: 401,
                    success: false,
                    msg: 'User not found or user not authorised'
                }
            }

            return {
                statusCode: 200,
                success: true,
                msg: disabledUser.isDisabled ? 'Khóa tài khoản thành công' : 'Mở khóa tài khoản thành công',
                disabledUser
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

export default UserService
