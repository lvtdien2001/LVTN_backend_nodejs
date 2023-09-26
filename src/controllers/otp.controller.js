import otpService from '../services/otp.service';

// @route POST /otp/send
exports.sendMail = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                msg: 'Email is required'
            })
        }
        const otp = await otpService.create(email);
        res.status(otp ? 200 : 500).json({
            success: otp ? true : false,
            msg: otp ? 'OK' : 'Internal server error'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}

// @route POST /otp/check
exports.checkOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                msg: 'Email/OTP is required'
            })
        }
        const isValid = await otpService.checkOTP(email, otp);
        res.status(isValid ? 200 : 500).json({
            success: isValid ? true : false,
            msg: isValid ? 'OK' : 'OTP không chính xác hoặc hết hạn',
            otp
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }
}