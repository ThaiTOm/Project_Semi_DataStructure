import './bankpayment.scss'
import payment from '../../image/payment.png'
import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import PaypalBtn from '../../components/Paypal/Paypal';
import Congratulation from '../../components/congratulation/congratulation';
import { getCookie } from '../../components/takeCookies/takeCookies';
import { Error, Errorempty } from '../../components/error/error';
import { useNavigate } from 'react-router-dom';


function BankPayment() {

    const [success, setSuccess] = useState(false);
    const currentCart = JSON.parse(sessionStorage.getItem('thanhtoan'));
    const usdrate = 24260;
    const navigate = useNavigate();
    
    const totals = currentCart && currentCart.length > 0 && currentCart.reduce((total, item) => {
        return total + item.thanhtien;
    }, 0)

    const cookies = getCookie("token");
    const totalusd = ((totals + 15000) / usdrate).toFixed(2)
    return (
        <>
        {currentCart && currentCart.length > 0 ? (<>{ cookies && cookies.length !== 0 ? (<>  {success && <Congratulation />}
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
            </div></>) : (Error("Thanh Toán Ngân Hàng", navigate))}</>) : (Errorempty(navigate))}
        
          
        </>
    )
}

export default BankPayment;