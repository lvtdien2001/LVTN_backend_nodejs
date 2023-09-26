import otpModel from '../models/otp.model';
import moment from 'moment';
import nodemailer from '../utils/nodemailer';

exports.create = async (email) => {
    try {
        let code = '';
        for (let i = 0; i < 6; i++) {
            const num = (Math.random() * 10);
            code += Math.floor(num);
        }

        // send email
        await nodemailer.sendMail({
            from: process.env.MAIL_USERNAME,
            to: email,
            subject: 'Watch Shop OTP',
            text: `Your OTP is ${code}`
        })

        // save into database
        const now = moment();
        const deadline = moment(now).add(2, 'minutes');
        const otp = new otpModel({
            code, email, deadline
        })
        await otp.save();

        return code;
    } catch (error) {
        console.log(error);
    }
}

exports.checkOTP = async (email, code) => {
    try {
        const otp = await otpModel
            .findOne({ email })
            .sort({ createdAt: -1 })

        const now = moment();
        return (now <= otp.deadline && Number(code) === otp.code) ? true : false;
    } catch (error) {
        console.log(error);
        return false;
    }
}