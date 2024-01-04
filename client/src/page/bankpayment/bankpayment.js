import './bankpayment.scss'
import payment from '../../image/payment.png'
import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import PaypalBtn from '../../components/Paypal/Paypal';
import Congratulation from '../../components/congratulation/congratulation';


function BankPayment() {

    const [success, setSuccess] = useState(false);
    const currentCart = useSelector(state => state.ttStore)
    const usdrate = 24.260;
    const totals = currentCart.reduce((total, item) => {
        return total + item.thanhtien;

    }, 0)


    const totalusd = ((new Intl.NumberFormat("vi-VN").format(totals)) / usdrate).toFixed(2)
    return (
        <>
            {success && <Congratulation />}
            <div className='payment'>
                <div className='payment--left'>
                    <img src={payment} alt='payment' />
                </div>
                <div className='payment--right'>
                    <h2>Kiểm tra đơn hàng</h2>
                    <div className='table-container'>
                        <table>
                            <thead>
                                <tr>
                                    <th>Hình ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Số lượng</th>
                                    <th>Thanh tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentCart.map((current, index) => (
                                    <tr key={index}>
                                        <td>
                                            <img
                                                style={{
                                                    maxWidth: '50px',
                                                    maxHeight: '50px',
                                                    borderRadius: '5px',
                                                }}
                                                src={current.img}
                                                alt={current.title}
                                            />
                                        </td>
                                        <td>{current.title}</td>
                                        <td>{current.soluong}</td>
                                        <td>{new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(`${current.thanhtien}`)
                                        }</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                        <div className='total' >
                            <span >Tổng tiền : </span>
                            <span >{new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            }).format(`${totals}`)}</span>
                        </div>
                    </div>
                    <div className='payment-info'><PaypalBtn infoproduct = {{product : currentCart}} setSuccess={setSuccess} amount={totalusd}  /></div>
                </div>
            </div>
        </>
    )
}

export default BankPayment;