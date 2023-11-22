import React, { useState, useRef, useEffect } from "react";
import { Table, Input } from "antd";
import { getOrder, getUserstk } from "../../../service/getcategory/getCategory";
import { getCookie } from "../../../components/takeCookies/takeCookies";
const Yourorder = () => {
  const cookies = getCookie("token");
  const [data, setData] = useState([]);  

  const fetchPur = async (e) => {
    const result = await getOrder(e);
  if (result && result[0] && result[0].thanhtoan && result[0].orderStep === 3){
    setData(result)
  }
   else {
    setData([])
   }
  };

  const fetchUsers = async (e) => {
    const result = await getUserstk(e);
   fetchPur(result[0].id)
  }

  useEffect(() => {
  fetchUsers(cookies)
  }, []);
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "img",
      key: "img",
      render: (text) => (
        <img src={text} alt="Order" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "Thông tin đơn hàng",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ngày đặt",
      key: "orderDate",
      render: () => (<>
        {data[0].date}
      </>)
    },
    {
      title: "Đơn giá sản phẩm",
      dataIndex: "dongia",
      key: "dongia",
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
      title: "Tổng thanh toán",
      dataIndex: "thanhtien",
      key: "thanhtien",
      render: (text) => (
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(`${text}`)}
        </span>
      ),
    },
  ];

  const pagination = {
    pageSize: 5, // Số hàng mỗi trang
  };
  return (
    <>
      
      <Table columns={columns} dataSource={data[0].thanhtoan} pagination={pagination} />
    </>
  );
};

export default Yourorder;
