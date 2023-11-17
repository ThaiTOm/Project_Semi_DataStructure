import React, { useState } from 'react';
import { Steps, Button, message, Table } from 'antd';
import CurrentTime from '../../components/takeTime/takeTime';


const { Step } = Steps;

const columns = [
  {
    title: 'Hình ảnh',
    dataIndex: 'image',
    key: 'image',
    render: (text, record) => <img src={text} alt={record.name} style={{ width: '50px', height: '50px' }} />,
  },
  {
    title: 'Thông tin đơn hàng',
    dataIndex: 'orderInfo',
    key: 'orderInfo',
  },
  {
    title: 'Ngày đặt hàng',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Giá gốc',
    dataIndex: 'originalPrice',
    key: 'originalPrice',
  },
  {
    title: 'Giá sau khuyến mãi',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Số lượng',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Tổng tiền',
    dataIndex: 'total',
    key: 'total',
  },

];



const steps = [
  {
    title: 'Xuất kho',
    content: ' Đơn hàng đã được xuất kho',
  },
  {
    title: 'Đang giao',
    content: ' Đơn hàng đang được giao',
  },
  {
    title: 'Giao thành công',
    content:  'Đơn hàng đã giao thành công',
  },
];

const Order = () => {
  const paidProducts = [
    {
      id: 1,
      image: 'link_to_image_1.jpg',
      orderInfo: 'Sản phẩm A',
      originalPrice: 120,
      price: 100,
      quantity: 2,
      total: 200,
      date: '2023-11-10', // Thêm thông tin ngày đặt hàng
    },
    {
      id: 2,
      image: 'link_to_image_2.jpg',
      orderInfo: 'Sản phẩm B',
      originalPrice: 150,
      price: 120,
      quantity: 1,
      total: 120,
      date: '2023-11-12', // Thêm thông tin ngày đặt hàng
    },
    // Thêm các sản phẩm khác nếu cần
  ];
  
  

  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = () => {
    message.success('Đơn hàng đã giao thành công!');
  };
console.log(currentStep)
  return (
    <>
    <div className='order'>
      <div className='order--top'>
   <h1>
    QUÁ TRÌNH GIAO HÀNG
    <CurrentTime />
   </h1>
      </div>

       <div className='order--bottom'>
      <Steps current={currentStep} size="small" style={{ marginBottom: '16px' }}
        progressDot
      
      >
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">
        <h2>{steps[currentStep].title}</h2>
        <p>{steps[currentStep].content}</p>
        
        {/* Hiển thị thông tin sản phẩm đã thanh toán tại mỗi bước */}
        {currentStep < steps.length - 1 && (
          <Table
      columns={columns}
      dataSource={paidProducts}
      pagination={false} // Tắt phân trang nếu không cần
    />
        )}
      </div>
    </div>
    </div>
     
    </>
    
  );
};

export default Order;
