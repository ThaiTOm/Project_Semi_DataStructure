import React, { useState, useRef, useEffect } from "react";
import { Table, Input } from "antd";
import { getOrder, getUserstk } from "../../../service/getcategory/getCategory";
import { getCookie } from "../../../components/takeCookies/takeCookies";
const Yourorder = () => {
  const cookies = getCookie("token");
  const [data, setData] = useState([]);  
  const [dataOrder, setDataorder] = useState([]);
  const fetchPur = async (e) => {
    const result = await getOrder(e);
    setDataorder(result);
  const fillDatastep = result && result.filter(item => {
    return item.orderStep === 3
  })
  const fillDatatt = fillDatastep.reduce((bandau, item) => {
    const dulieu = item.thanhtoan.reduce ((origin, x) => {
      return origin.concat([{...x, orderDate: item.date}])
    },[])
   return bandau.concat(dulieu)
  },[])
 setData(fillDatatt);
 console.log(fillDatatt)
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
      dataIndex: "orderDate",
      key: "orderDate",
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
      
      <Table columns={columns} dataSource={data} pagination={pagination} />
    </>
  );
};

export default Yourorder;
