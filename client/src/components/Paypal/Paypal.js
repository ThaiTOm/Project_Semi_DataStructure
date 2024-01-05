import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import Swal, { swal } from "sweetalert2/dist/sweetalert2.js";
import { sendEmail } from "../sendemail/sendemail";
import { getCookie } from "../takeCookies/takeCookies";
import { postOrder } from "../../service/post/post";
import { getMyUser, getShip } from "../../service/getcategory/getCategory";


// giá trị để vẻ UI 
const style = {
  "layout": "vertical",
};

// custom PaypalBtn
const ButtonWrapper = ({ currency, showSpinner, amount, setSuccess, infoproduct }) => {
  const navigate = useNavigate();
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();


  useEffect(() => {
      dispatch({
          type: 'resetOptions',
          value: {
              ...options, currency: currency,
          }
      })
  }, [currency, showSpinner])


  //set up thông tin để truyền lên file sau khi pay thành công
  const infoPayment = useSelector(state => state.ttStore)
  const cookie = getCookie("token");
  const [datatk, setDatatk] = useState([]);
  let setFormattedTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

  const postorder = async (e) => {
      try {
          const result = await postOrder(e);
      }
      catch (e) {
          console.log("error : ", 123);
      }
  }

  
  const fetchApi = async (e) => {
    try {
        const result = await getMyUser(e);
        setDatatk(result);
    } catch (e) {
        console.error(e)
    }
}

  //lấy thông tin tài khoản người dùng đang sài
  useEffect(() => {
      fetchApi(cookie);
  }, [cookie])
  // lấy thông tin ship để gửi về invoice của paypal từ tài khoản người dùng đang đăng nhập

  const fetchAddress = async (e) => {
      try {
          const result = await getShip(e)
          const address = result.find((item) => {
              return item.delivery[0].defaultAddress === true;
          })
         return address;
      } catch (error) {
          console.error("error : ", error)
      }
  }

  // hàm để gửi thông tin về email
  const handleSend = async () => {
 const result =  await fetchAddress(datatk.id);
      const invoiceData = {
          amountPaid: amount,
          userName: result.delivery[0].fullName
      }
      if (datatk.email){
        sendEmail(invoiceData, datatk.email)
        sessionStorage.removeItem('thanhtoan');
      }
      else {
        sendEmail(invoiceData, 'email@example.com')
      }
  }
  return (
      <>
          {(showSpinner && isPending) && <div className="spinner" />}

          <PayPalButtons
              style={style}
              disabled={false}
              forceReRender={[style, currency, amount]}
              fundingSource={undefined}
              createOrder={(data, actions) => actions.order.create({
                  purchase_units: [
                      {

                        //   description: infoproduct.product.map((iteam) => { return iteam.title }).join(' + '),
                          amount: {
                              currency_code: currency,
                              value: amount,

                          },

                      }
                  ]
              }).then(orderID => orderID)
              }
              //capture là thành công và sau khi capture sẽ có 1 nút submit và trả về respon
              onApprove={(data, actions) => actions.order.capture().then(async (res) => {
         
                  if (res.status === "COMPLETED") {
                      postorder({
                          "paymentMethod": "Ngân hàng",
                          "orderStep": 0,
                          "date": setFormattedTime,
                          "user": datatk.id,
                          "thanhtoan": infoPayment
                      });
                      setSuccess(true)
                      Swal.fire({
                          icon: "success",
                          title: "Chuyển khoản thành công",
                          text: "Chúc quý khách 1 ngày tốt lành!!!",
                      }).then((result) => {
                          if (result.isConfirmed) {
                              handleSend();
                              navigate("/order")
                          } else {
                              navigate("/order")
                          }
                      })
                  }
              }
              )
              }
          />
      </>
  );
}

export default function PaypalBtn({ amount, setSuccess, infoproduct }) {


  return (

      <div style={{ maxWidth: "750px", minHeight: "200px", margin: "auto" }}>
          <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
              <ButtonWrapper currency={'USD'} amount={amount} showSpinner={false} setSuccess={setSuccess} infoproduct={infoproduct} />
          </PayPalScriptProvider>
      </div>
  );
}