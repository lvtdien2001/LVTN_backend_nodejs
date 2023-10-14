import moment from 'moment';
import OrderService from '../services/order.service';

const sortObject = obj => {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

// @route POST /payment/create-vnp-url
exports.createVnpUrl = (req, res) => {
    const { orderId, amount } = req.body;
    if (!orderId || !amount) {
        return res.status(400).json({
            success: false,
            msg: 'orderId/amount is required'
        })
    }

    process.env.TZ = 'Asia/Ho_Chi_Minh';
    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let ipAddr = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let vnpUrl = process.env.vnp_Url;

    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = process.env.vnp_TmnCode;
    vnp_Params['vnp_Locale'] = 'vn';
    vnp_Params['vnp_CurrCode'] = 'VND';
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = '200000';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = process.env.vnp_ReturnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", process.env.vnp_HashSecret);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    res.status(200).json({
        success: true,
        vnpUrl
    })
}

// @route GET /payment/vnp_ipn?<Params>
exports.checksum = async (req, res) => {
    let vnp_Params = req.query;

    const secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    const secretKey = process.env.vnp_HashSecret;
    const querystring = require('qs');
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const crypto = require("crypto");
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

    if (secureHash === signed) {
        const orderId = vnp_Params['vnp_TxnRef'];
        const userId = req.user.id;
        const rspCode = vnp_Params['vnp_ResponseCode'];
        const orderService = new OrderService();
        let msg = '';

        switch (rspCode) {
            case '00':
                await orderService.updatePaymentStatus(orderId);
                await orderService.updateStatus(orderId, '02');
                res.status(200).json({
                    success: true,
                    msg: 'Thanh toán thành công, cảm ơn quý khách đã ủng hộ!'
                })
                break;
            case '07':
                msg = 'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).';
                await orderService.cancelOrder(orderId, msg, userId);
                res.status(400).json({
                    success: false,
                    msg
                })
                break;
            case '09':
                msg = 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.';
                await orderService.cancelOrder(orderId, msg, userId);
                res.status(400).json({
                    success: false,
                    msg
                })
                break;
            case '10':
                msg = 'Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần';
                await orderService.cancelOrder(orderId, msg, userId);
                res.status(400).json({
                    success: false,
                    msg
                })
                break;
            case '11':
                msg = 'Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.';
                await orderService.cancelOrder(orderId, msg, userId);
                res.status(400).json({
                    success: false,
                    msg
                })
                break;
            case '12':
                msg = 'Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.';
                await orderService.cancelOrder(orderId, msg, userId);
                res.status(400).json({
                    success: false,
                    msg
                })
                break;
            case '13':
                msg = 'Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.';
                await orderService.cancelOrder(orderId, msg, userId);
                res.status(400).json({
                    success: false,
                    msg
                })
                break;
            case '24':
                msg = 'Giao dịch không thành công do: Khách hàng hủy giao dịch';
                await orderService.cancelOrder(orderId, msg, userId);
                res.status(400).json({
                    success: false,
                    msg
                })
                break;
            case '51':
                msg = 'Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.';
                await orderService.cancelOrder(orderId, msg, userId);
                res.status(400).json({
                    success: false,
                    msg
                })
                break;
            case '65':
                msg = 'Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.';
                await orderService.cancelOrder(orderId, msg, userId);
                res.status(400).json({
                    success: false,
                    msg
                })
                break;
            case '75':
                msg = 'Ngân hàng thanh toán đang bảo trì.';
                await orderService.cancelOrder(orderId, msg, userId);
                res.status(400).json({
                    success: false,
                    msg
                })
                break;
            case '79':
                msg = 'Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch';
                await orderService.cancelOrder(orderId, msg, userId);
                res.status(400).json({
                    success: false,
                    msg
                })
                break;
            default:
                msg = 'Xảy ra lỗi trong quá trình giao dịch, quý khách vui lòng liên hệ 1900 55 55 77 để được hỗ trợ';
                await orderService.cancelOrder(orderId, msg, userId);
                res.status(400).json({
                    success: false,
                    msg
                })
        }
    }
    else {
        res.status(400).json({
            success: false,
            msg: 'Fail checksum'
        })
    }
}