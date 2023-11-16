import React, { useState, useRef } from 'react';
import { Table, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const Yourorder = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef();

  const getColumnSearchProps = (dataIndex, placeholder) => {
    let columnProps = {
      render: dataIndex === 'image' ? (text) => <img src={text} alt="Order" style={{ width: 50, height: 50 }} /> : undefined,
      title: dataIndex === 'image' ? 'Hình ảnh' : dataIndex === 'orderDate' ? 'Ngày đặt' : dataIndex === 'orderInfo' ? 'Thông tin đơn hàng' : dataIndex === 'productPrice' ? 'Đơn giá sản phẩm' : dataIndex === 'totalPayment' ? 'Tổng thanh toán' : undefined,
      dataIndex,
      key: dataIndex,
    };

    if (dataIndex !== 'productPrice' && dataIndex !== 'totalPayment') {
      columnProps = {
        ...columnProps,
        ...{
          filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
          onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
              setTimeout(() => searchInput.current?.select(), 100);
            }
          },
          render: (text) =>
            searchedColumn === dataIndex ? (
              <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[searchText]}
                autoEscape
                textToHighlight={text ? text.toString() : ''}
              />
            ) : (
              text
            ),
        },
      };
    }

    if (dataIndex === 'productPrice' || dataIndex === 'totalPayment') {
      columnProps = {
        ...columnProps,
        ...{
          sorter: (a, b) => a[dataIndex] - b[dataIndex],
        },
      };
    }

    return columnProps;
  };

 

  const columns = [
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} alt="Order" style={{ width: 50, height: 50 }} />,
    },
    {
        title: 'Thông tin đơn hàng',
        dataIndex: 'orderInfo',
        key: 'orderInfo',
        ...getColumnSearchProps('orderInfo', 'order info'),
      },
    {
        title: 'Ngày đặt',
        dataIndex: 'orderDate',
        key: 'orderDate',
        ...getColumnSearchProps('orderDate', 'order date'),
      },
    {
      title: 'Đơn giá sản phẩm',
      dataIndex: 'productPrice',
      key: 'productPrice',
      ...getColumnSearchProps('productPrice', 'product price'),
    },
    {
      title: 'Tổng thanh toán',
      dataIndex: 'totalPayment',
      key: 'totalPayment',
      ...getColumnSearchProps('totalPayment', 'total payment'),
    },
  ];

  const data = [
    {
      key: '1',
      image: 'https://cloud.githubusercontent.com/assets/29597/11913937/0d2dcd78-a629-11e5-83e7-6a17b6d765a5.png',
      orderDate: '2023-11-05',
      orderInfo: 'Thông tin đơn hàng 1',
      productPrice: 50,
      totalPayment: 200,
    },
    {
      key: '2',
      image: 'https://down-vn.img.susercontent.com/file/b48ff059f76b6992f82c488ab424c3eb_tn',
      orderDate: '2023-11-10',
      orderInfo: 'Thông tin đơn hàng 2',
      productPrice: 30,
      totalPayment: 120,
    },
    {
      key: '3',
      image: 'https://down-vn.img.susercontent.com/file/b48ff059f76b6992f82c488ab424c3eb_tn',
      orderDate: '2023-11-10',
      orderInfo: 'Thông tin đơn hàng 3',
      productPrice: 30,
      totalPayment: 120,
    },
    {
      key: '4',
      image: 'https://down-vn.img.susercontent.com/file/b48ff059f76b6992f82c488ab424c3eb_tn',
      orderDate: '2023-11-10',
      orderInfo: 'Thông tin đơn hàng 3',
      productPrice: 30,
      totalPayment: 120,
    },
    // Thêm thông tin đơn hàng khác tại đây...
  ];
  const pagination = {
    pageSize: 5, // Số hàng mỗi trang
    // Các tùy chọn khác của pagination như current, total, ...
  };
  return (
    <Table columns={columns} dataSource={data} pagination={pagination}>
      <Input ref={searchInput} />
    </Table>
  );
};

export default Yourorder;
