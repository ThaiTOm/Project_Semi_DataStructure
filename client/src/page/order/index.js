import React, { useEffect, useState } from "react";
import { Steps, Button, message, Table, Empty, Result } from "antd";
import { getMyUser, getOrder, getUserstk } from "../../service/getcategory/getCategory";
import { getCookie } from "../../components/takeCookies/takeCookies";
import "./order.scss";
import { useNavigate } from "react-router-dom";
import { Error } from "../../components/error/error";

const { Step } = Steps;

const columns = [
  {
    title: "Hình ảnh",
    dataIndex: "image",
    key: "image",
    render: (text, record) => (
      <img
        src={text}
        alt={record.name}
        style={{ width: "50px", height: "50px" }}
      />
    ),
  },
  {
    title: "Thông tin đơn hàng",
    dataIndex: "orderInfo",
    key: "orderInfo",
  },
  {
    title: "Ngày đặt hàng",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Đơn giá",
    dataIndex: "price",
    key: "price",
    render: (text) => (
      <span>
      {new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(`${text}`)}
    </span>
    )
  },
  {
    title: "Số lượng",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Tổng tiền",
    dataIndex: "total",
    key: "total",
    render: (text) => (
      <span>
      {new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(`${text}`)}
    </span>
    )
  },
];

const steps = [
  {
    title: "Chờ xác nhận",
    content: "Đã nhận được thông tin đơn hàng. ",
  },
  {
    title: "Xuất kho",
    content: " Đơn hàng đã được xuất kho",
  },
  {
    title: "Đang giao",
    content: " Đơn hàng đang được giao",
  },
  {
    title: "Giao thành công",
    content: "Đơn hàng đã giao thành công. Cảm ơn quý khách!",
  },
];

const Order = () => {
  const cookies = getCookie("token");
  const [orderId, setorderId] = useState({
    orderStep: 0,
  });
  const navigate = useNavigate();

  const fetchApick = async (e) => {
    const result = await getMyUser(e); // lấy dữ liệu tài khoản của người đang đăng nhập
    if (result.code === 200  && result.id) {
      fetchorder(result.id);
    }
  };
  useEffect(() => {
    fetchApick(cookies);
  }, []);

  const fetchorder = async (e) => {
    const result = await getOrder(e);
    const compareFunction = (obj) => obj.date;

    // Hàm trả về giá trị lớn nhất dựa trên so sánh của thuộc tính cụ thể
    const findMaxValue = (result, compareFn) => {
      // compareFn = compareFunction
      if (!result.length) {
        return null; // Trả về giá trị mặc định nếu mảng trống
      }
      return result.reduce((maxObject, currentObject) => {
        // reduce là maxObject dữ liệu đầu tiên , currentObject là các dữ liệu của mảng cần ss
        const max = compareFn(maxObject);
        const current = compareFn(currentObject);

        return current > max ? currentObject : maxObject;
      });
    };

    const maxObject = findMaxValue(result, compareFunction); // gọi hàm và gán dữ liệu

    setorderId(maxObject);
  };

  const paidProducts =
    orderId &&
    orderId.thanhtoan &&
    orderId.thanhtoan.map((item, index) => {
      // data
      return {
        id: index,
        image: item.img,
        orderInfo: item.title,
        price: item.dongia,
        quantity: item.soluong,
        total: item.thanhtien,
        date: orderId.date,
      };
    });

  const handleAddsp = () => {
    navigate("/collections");
  };
  return (
    <>
    {cookies.length !== 0 ? (<> {orderId ? (
        <div className="order">
          <div className="order--top">
            <h1>QUÁ TRÌNH GIAO HÀNG</h1>
          </div>

          <div className="order--bottom">
            <Steps
              current={orderId.orderStep}
              size="small"
              style={{ marginBottom: "16px" }}
            >
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">
              {/* Hiển thị thông tin sản phẩm đã thanh toán tại mỗi bước */}
              {orderId.orderStep <= steps.length - 1 && (
                <div>
                  <h2>{steps[orderId.orderStep].title}</h2>
                  <p>{steps[orderId.orderStep].content}</p>
                  <Table
                    columns={columns}
                    dataSource={paidProducts}
                    pagination={false} // Tắt phân trang nếu không cần
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div class="order-status">
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 60,
            }}
            description={
              <>
                <p>Hiện Tại Đơn Hàng Đang Trống</p>
                <p>
                  Hãy khám phá sản phẩm thức uống của chúng tôi và đặt những món
                  hàng mà bạn yêu thích!!
                </p>
              </>
            }
          >
            <Button onClick={handleAddsp} type="primary">
              Thêm sản phẩm
            </Button>
          </Empty>
        </div>
      )} </>) : (Error("Theo Dõi Đơn Hàng"))}
     
    </>
  );
};

export default Order;
