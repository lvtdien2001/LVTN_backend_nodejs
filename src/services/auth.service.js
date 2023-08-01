import userModel from '../models/user.model';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

class AuthService {
    async create(data) {
        try {
            // check user exist
            const user = await userModel.findOne({ email: data.email });
            if (user) {
                return {
                    statusCode: 400,
                    success: false,
                    msg: 'Email này đã có tài khoản!'
                }
            }

            // check email/password not empty
            if (!data.email || !data.password) {
                return {
                    statusCode: 400,
                    success: false,
                    msg: 'Email và mật khẩu không thể bỏ trống!'
                }
            }

            // all nice
            const hashedPassword = await argon2.hash(data.password);
            const newUser = new userModel({
                ...data,
                password: hashedPassword
            })
            await newUser.save();

            // secrect token
            const secretToken = process.env.ACCESS_SECRET_TOKEN;
            const accessToken = jwt.sign({
                userId: newUser._id,
                isAdmin: newUser.isAdmin
            }, secretToken);

            return {
                statusCode: 200,
                success: true,
                msg: 'Chúc mừng bạn đã đăng ký tài khoản thành công',
                accessToken
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                msg: 'Internal server error'
            }
        }
    }

    async login(email, password) {
        try {
            // check email/password not empty
            if (!email || !password) {
                return {
                    statusCode: 400,
                    success: false,
                    msg: 'Email và mật khẩu không thể bỏ trống!'
                }
            }

            const user = await userModel.findOne({ email });
            // email not exist
            if (!user) {
                return {
                    statusCode: 400,
                    success: false,
                    msg: 'Email hoặc mật khẩu không chính xác!'
                }
            }

            const passwordValid = await argon2.verify(user.password, password);
            // invalid password
            if (!passwordValid) {
                return {
                    statusCode: 400,
                    success: false,
                    msg: 'Email hoặc mật khẩu không chính xác!'
                }
            }

            const secretToken = process.env.ACCESS_SECRET_TOKEN;
            const accessToken = jwt.sign({
                userId: user._id,
                isAdmin: user.isAdmin
            }, secretToken)

            return {
                statusCode: 200,
                success: true,
                msg: 'Đăng nhập thành công',
                accessToken
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                msg: 'Internal server error'
            }
        }
    }
}

export default AuthService
