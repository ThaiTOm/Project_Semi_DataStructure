import {
  Table,
  Input,
  Button,
  Radio,
  Modal,
  Collapse,
  Card,
  Image,

} from "antd";
import React, { useEffect, useRef, useState } from "react";
import "./thanhtoan.scss";
import { getCookie } from "../../components/takeCookies/takeCookies";
import { getMyUser, getOrder, getProductdt, getShip, getUserstk } from "../../service/getcategory/getCategory";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postOrder } from "../../service/post/post";
import { format, parse } from 'date-fns';
import { load } from "../../actions/actCart";
import  { Error, Errorempty } from "../../components/error/error";
import { patchProduct } from "../../service/patch/patch";
const { TextArea } = Input;
const { Panel } = Collapse;
const columns = [
  {
    title: "Hình ảnh",
    dataIndex: "image",
    key: "image",
    render: (text) => <Image src={text} width={60} height={60} />,
  },
  {
    title: "Thông tin sản phẩm",
    dataIndex: "productInfo",
    key: "productInfo",
  },
  {
    title: "Đơn giá",
    dataIndex: "unitPrice",
    key: "unitPrice",
    render: (text) => (
      <span>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(`${text}`)}
      </span>
    ),
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Thành tiền",
    dataIndex: "totalPrice",
    key: "totalPrice",
    render: (text) => (
      <span>
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(`${text}`)}
      </span>
    ),
  },
  {
    title: "Ghi chú",
    dataIndex: "note",
    key: "note",
    render: () => <TextArea rows={2} placeholder="Nhập ghi chú..." />,
  },
];



const Thanhtoan = () => {
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [data, setData] = useState([]);
  const [data_1, setdata_1] = useState([]);
  const [data_2, setData_2] = useState([]);
  const cookies = getCookie("token");
  const thanhtoan = useSelector((state) => state.ttStore);
  sessionStorage.setItem("thanhtoan", JSON.stringify(thanhtoan));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [reload, setReload] = useState(true);
  const [check, setcheck] = useState([]);
 let setFormattedTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
 var thanhtoanData = JSON.parse(sessionStorage.getItem("thanhtoan"));
 // Kiểm tra xem dữ liệu có tồn tại không


 const fetchApick = async (e) => {
  try {
    const result = await getMyUser(e); // lấy dữ liệu tài khoản của người đang đăng nhập
    setData(result);
    fetchShip(result.id);
    getorder(result.id)
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

  const fetchShip = async (e) => {
    try {
      const result = await getShip(e);

      const addressmd = result.find((item) => {
        return item.delivery[0].defaultAddress === true;
      });
      setdata_1(addressmd);
    } catch (error) {
      console.error(".....", error);
    }
  };

const postorder = async (e) => {
  try {
   await postOrder(e);
  } catch (error) {
    console.log("...", error);
  }
}




const getorder = async (e) => {
  const result = await getOrder(e);
  const newestOrder = result.reduce((maxDateItem, currentItem) => {
    if (!maxDateItem || currentItem.date > maxDateItem.date) {
      return currentItem;
    } else {
      return maxDateItem;
    }
  }, null);
  if(newestOrder && newestOrder.orderStep){
     setcheck(newestOrder.orderStep)
  if (newestOrder.orderStep !== 3){
    Modal.error({
      title: "Lỗi",
     content: "Đơn Hàng Của Bạn Vẫn Chưa Hoàn Tất"
    })
    navigate("/");
  }
  }
 
}



const getQuantity = async (id) => {
  const result = await getProductdt(id);
  return result;
}

const updateQuantity = async (id, values) => {
  try {
    await patchProduct(id ,values);
  } catch (error){
    console.log("Lỗi", error)
  }
}

useEffect(() => {
  fetchApick(cookies); // lấy thông tin user từ cookie
}, [cookies]);

  const handlePayment = () => {
    if (selectedPaymentMethod === "cash") {
      setShowConfirmation(true);
    } else {
      setShowPaymentDetails(true);
    }
  };

  const showNotification = () => {
    Modal.warning({
      title: "Thông báo",
      content: "Bạn chưa có địa chỉ mặc định. Vui lòng thêm địa chỉ để thanh toán.",
      okText: "Thêm địa chỉ",
      onOk: () => {
        navigate("/infor/address")
        console.log("Redirecting to address page...");
      },
    });
  };

  const handleConfirm = async () => {
    // Thực hiện xác nhận thanh toán bằng tiền mặt ở đây
     if (data_1 === undefined){
      showNotification();
     }
     else {
      for(const items of thanhtoan){
        const productId = await getQuantity(items.id);
       await updateQuantity(productId[0].id, {
          Quantity: productId[0].Quantity - items.soluong
        });
      }

      dispatch(load(!reload));
        postorder({
      "paymentMethod": "Tiền mặt",
      "orderStep": 0,
      "date": setFormattedTime,
      "user": data.id,
      "thanhtoan": thanhtoan });
    Modal.success({
      onOk: handleChuyentrang, 
      title: "Thanh toán tiền mặt thành công",
      content: "Cảm ơn bạn đã thanh toán bằng tiền mặt!",
    });
     }
     setShowConfirmation(false);
  
  };

  const handleConfirmBank = () => {
    if (data_1 === undefined) {
      showNotification();
    }
    else {
      if(data.email === undefined){
        Modal.warning({
          title: "Thông báo",
          content: "Bạn chưa có thông tin cá nhân. Vui lòng thêm thông tin cá nhân để thanh toán bằng ngân hàng.",
          okText: "Thêm thông tin cá nhân",
          onOk: () => {
            navigate("/infor/thongtinkh")
          },
        });
      }
      else {
             navigate("/bank")
      }
 
    }
    setShowPaymentDetails(false);
  }


const handleChuyentrang = () => {
  sessionStorage.removeItem('thanhtoan');
  navigate("/order");
}

  useEffect(() => {
    const dataSource = thanhtoan.map((item, index) => ({
      key: index,
      id: item.id,
      image: item.img,
      productInfo: item.title,
      unitPrice: item.dongia,
      quantity: item.soluong,
      totalPrice: item.thanhtien,
    }));
    setData_2(dataSource);
  }, [thanhtoan]);

  const tong = thanhtoan.reduce((total, item) => {
    return total + item.thanhtien;
  }, 0);

  return (
    <>
    {cookies.length !== 0 && ( thanhtoanData.length !== 0 ) ?  (<>  <div className="thanhtoan">
        {" "}
        {data_1 && data_1.delivery && data_1.delivery[0] ? (
          <div className="thanhtoan--address">
            <h2>
              Địa chỉ nhận hàng{" "}
              <span>
                <Link to="/infor/address">Thay đổi</Link>
              </span>
            </h2>

            <div className="thanhtoan--name thanhtoan--address__chung">
              <p className="p1">Họ và tên: </p>
              <p>{data_1.delivery[0].fullName}</p>
            </div>
            <div className="thanhtoan--sdt thanhtoan--address__chung">
              <p className="p1">Số điện thoại: </p>
              <p>{data_1.delivery[0].phoneNumber}</p>
            </div>
            <div className="thanhtoan--diachi thanhtoan--address__chung">
              {" "}
              <p className="p1">Địa chỉ: </p>
              <p>{data_1.delivery[0].address}</p>
            </div>
          </div>
        ) : (
          <div className="thanhtoan--addressempty">
                <h2>Địa chỉ nhận hàng</h2>
                <div className="thanhtoan--addressempty__update">
                   <p>Vui lòng cập nhật địa chỉ :</p>
                <Link to="/infor/address">Tại đây</Link>
                </div>
               
              </div>
        )}
        <div className="thanhtoan--page">
          <Table columns={columns} dataSource={data_2} />
        </div>
        <div className="thanhtoan--tongtien">
          <div className="thanhtoan--tongtien__tienhang thanhtoan--tongtien__chung">
            <p className="p1">Tổng tiền hàng:</p>
            <p className="p2">
              {" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(`${tong}`)}
            </p>
          </div>
          <div className="thanhtoan--tongtien__vanchuyen thanhtoan--tongtien__chung">
            <p className="p1">Phí vận chuyển:</p>
            <p className="p2">
              {" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(`${15000}`)}
            </p>
          </div>
          <div className="thanhtoan--tongtien__tt thanhtoan--tongtien__chung">
            <p className="p1">Tổng thanh toán:</p>
            <p className="p2 ptt">
              {" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(`${tong+ 15000}`)}
            </p>
          </div>
        </div>
        <div className="thanhtoan--method">
          <h3>Chọn phương thức thanh toán:</h3>
          <Collapse bordered={false}>
            <Panel header="Chọn phương thức thanh toán" key="1">
              <Card title="Thanh toán bằng tiền mặt">
                <Radio
                  onChange={() => setSelectedPaymentMethod("cash")}
                  checked={selectedPaymentMethod === "cash"}
                >
                  Thanh toán bằng tiền mặt (Mặc định)
                </Radio>
              </Card>
              <Card title="Thanh toán bằng ngân hàng">
                <Radio
                  onChange={() => setSelectedPaymentMethod("bank")}
                  checked={selectedPaymentMethod === "bank"}
                >
                  Thanh toán bằng ngân hàng
                </Radio>
              </Card>
            </Panel>
          </Collapse>
          <Button type="primary" onClick={handlePayment}>
            Thanh toán
          </Button>
        </div>
       
        <Modal
            title="Thông tin thanh toán"
            open={showPaymentDetails}
            onOk={handleConfirmBank}
            onCancel={() => setShowPaymentDetails(false)}
            okText="Đặt hàng"
            cancelText="Hủy"
          >
            <p>Hãy kiểm tra kĩ đơn hàng trước khi bấm nút đặt hàng. Bạn không thể tiếp tục đặt hàng khi sản phảm chưa hoàn tất!</p>
          </Modal>

        <Modal
          title="Xác nhận thanh toán bằng tiền mặt?"
          open={showConfirmation}
          onOk={handleConfirm}
          onCancel={() => setShowConfirmation(false)}
          okText="Đặt hàng"  // Thay đổi văn bản của nút Xác nhận
  cancelText="Hủy"   // Thay đổi văn bản của nút Hủy
        >
          <p>Hãy kiểm tra kĩ đơn hàng trước khi bấm nút đặt hàng. Bạn không thể tiếp tục đặt hàng khi sản phảm chưa hoàn tất!</p>
        </Modal>
      </div></>) : (Errorempty(navigate))}
    
    </>
  );
};

export default Thanhtoan;
