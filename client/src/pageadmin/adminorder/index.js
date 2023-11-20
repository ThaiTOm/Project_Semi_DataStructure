import React from 'react';
import { Table, Space, Image } from 'antd';

const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
        title: 'Product Image',
        dataIndex: 'products',
        key: 'products',
        render: products => (
          <Image src={products[0]?.img} alt={products[0]?.title} width={50} />
        ),
      },
      {
        title: 'Product Title',
        dataIndex: 'products',
        key: 'productTitle',
        render: products => products.map(item => item?.title).join(', '), // Lấy hết dữ liệu và nối thành một chuỗi
      },
      {
        title: 'Product Price',
        dataIndex: 'products',
        key: 'productPrice',
        render: products => products.map(item => item?.dongia).join(', '), // Lấy hết dữ liệu và nối thành một chuỗi
      },
      {
        title: 'Quantity',
        dataIndex: 'products',
        key: 'quantity',
        render: products => products.map(item => item?.soluong).join(', '), // Lấy hết dữ liệu và nối thành một chuỗi
      },
      
  ];
  
  const ordersData = [
    {
      id: 1,
      date: '2023-11-17 16:06:30',
      userId: 1,
      products: [
        {
        "id": 8,
        "img": 'https://i.pinimg.com/236x/9b/a4/06/9ba4062b81fabae428597348b63dc7e3.jpg',
        "title": "Mango Tango Juice",
        "dongia": 36000,
        "soluong": 1,
        "thanhtien": 36000
        },
        {
        "id": 7,
        "img": "https://i.pinimg.com/236x/ab/4d/bf/ab4dbf38511651da712fb3f85d4d11f5.jpg",
        "title": "Watermelon Juice",
        "dongia": 27000,
        "soluong": 1,
        "thanhtien": 27000
        },
        {
        "id": 35,
        "img": "https://i.pinimg.com/236x/b0/1d/d9/b01dd9eb8447ce651a4185d5104eb915.jpg",
        "title": "Taro Milk Tea",
        "dongia": 25000,
        "soluong": 1,
        "thanhtien": 25000
        },
        {
        "id": 20,
        "img": "https://i.pinimg.com/236x/4d/7a/6f/4d7a6fa6fabd931a57161c7b1bb8f725.jpg",
        "title": "Caramel Macchiato",
        "dongia": 46750,
        "soluong": 1,
        "thanhtien": 46750
        }
        ],
    },
    // ... more orders
  ];

const Adminorder = () => {
    return (
        <div style={{ padding: '20px' }}>
      <h1>Order Details</h1>
      <Table
        dataSource={ordersData}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
    </div>
      );
};

export default Adminorder;
