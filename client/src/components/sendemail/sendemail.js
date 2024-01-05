import emailjs from '@emailjs/browser';

export const sendEmail = (invoiceData, email) => {
    console.log(invoiceData);
    // Lấy số tiền từ dữ liệu
    const amountPaid = invoiceData.amountPaid;

    // Tạo đối tượng dữ liệu để gửi
    const data = {
        user_name: invoiceData.userName, // Thay thế bằng tên khách hàng
        user_email: email, // Thay thế bằng email khách hàng
        amountPaid: amountPaid,
        message: `Chúc mừng bạn đã thực hiện thanh toán thành công trên hệ thống thanh toán của chúng tôi
        Chúng tôi xác nhận rằng bạn đã thanh toán thành công một khoản tiền là  ${amountPaid}$ thông qua dịch vụ thanh toán Paypal.
        Để xem được thông tin hàng hóa vui lòng truy cập đường link : https://developer.paypal.com/dashboard/notifications để
        biết thêm nhiều thông tin chi tiết.`,
    };

    // Gửi email sử dụng emailjs
    emailjs.send('service_k5w984i', 'template_4aj8m5r', data, '5uWFV7-nhrSrADXQW')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
};

