
import { useDispatch, useSelector } from "react-redux";
import "./cart.scss";
import { useEffect, useState } from "react";
import { addcart, down, up, xoa, xoahet } from "../../actions/actCart";
import { getCookie } from "../../components/takeCookies/takeCookies";
import { getCart, getOrder, getUserstk } from "../../service/getcategory/getCategory";
import { patchCart } from "../../service/patch/patch";
import { Button, Checkbox, Col, Empty, Image, InputNumber, Layout, Result, Row, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";
import { Modal } from 'antd';


const { Header, Content, Footer, Sider } = Layout;
function Cart() {
  // const storedData = JSON.parse(localStorage.getItem(getCookie("token")));

  const products = useSelector((state) => state.cartStore);
  const [data, setData] = useState([]);   // lấy dữ liệu người dùng đang đăng nhập
  const [data_2, setData_2] = useState(); // lấy dữ liệu và thay đổi một chút định dạng để cập nhật lên database
  const [data_3, setData_3] = useState(); // lấy dữ liệu từ người dùng chọn sản phẩm 
  const dispatch = useDispatch();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);  // lấy key mà người dùng pick trong table
  const [total, setTotal] = useState(0);  // tính tổng tiền
  const [checked, setChecked] = useState(false);  
 const navigate = useNavigate();

const fetchPur = async (id) => {
  const result = await getOrder(id);
  console.log(result)
return result;
}

  // cũ
  var tong = 0;
  for (let i = 0; i < products.length; i++) {
    tong +=
      products[i].quanlity *
      (
        products[i].infor.price *
        ((100 - Math.floor(products[i].infor.discountPercentage)) / 100)
      ).toFixed();
  }
  const cookies = getCookie("token");
  useEffect(() => {
    const fetchApi = async (e) => {
      try {
        const result = await getUserstk(e);
        // xử lý dữ liệu ở đây sau khi nhận được kết quả từ getUserstk
        setData(result);
      } catch (error) {
        console.error("Error in fetchhApi:", error);
        throw new Error("Failed to fetch data");
      }
    };
    fetchApi(cookies);
  }, []);
  useEffect(() => {
    if (data && data.length > 0) {
      setData_2({
        id: data[0].id,
        userId: data[0].id,
        product: [...products],
      });
    }
  }, [products, data]);
 
  useEffect(() => {
    if (data_2 && Object.keys(data_2).length > 0) {
      const patchApi = async (data) => {
        try {
          const result = await patchCart(data); // gọi hàm patchCart với tham số là data
          
        } catch (error) {
          console.error("Error while patching cart:", error);
          // xử lý lỗi nếu có, có thể log ra console hoặc thực hiện các hành động khác
        }
      
      };
      patchApi(data_2); // gọi hàm patchApi với tham số là data_2
      localStorage.setItem(cookies, JSON.stringify(data_2));
    }
  }, [data_2]);
  // cũ

  const [selectedProductsCount, setSelectedProductsCount] = useState(0);
  useEffect(() => {
    // sử dụng dữ liệu trong selectedRowKeys để tính toán tổng thanh toán
    // và số lượng sản phẩm được chọn
    
    const total = selectedRowKeys.reduce((total, item) => {
      if (data_3[item] != undefined) {
        return total + data_3[item].total;
      }
      else {
        return 0;
      }
    }, 0);
  
    setTotal(total); // cập nhật state tổng thanh toán
    setSelectedProductsCount(selectedRowKeys.length); // cập nhật state số lượng sản phẩm
    if (total == 0) {
      setSelectedProductsCount(0);
    }
  }, [selectedRowKeys, data_3]);

  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (text) => <Image src={text} width={60} height={60} />,
    },
    {
      title: "Thông tin đơn hàng",
      dataIndex: "orderInfo",
      key: "orderInfo",
    },
    {
      title: "Giá gốc",
      dataIndex: "originalPrice",
      key: "originalPrice",
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
      title: "Giá sau khuyến mãi",
      dataIndex: "price",
      key: "price",
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
      render: (text, record) => (
        <div>
         <Row className="cart--control" >
  <Col span={4} className="col-1">
    <Button  className="cart--control__b1" onClick={() => handleDown(text, record)}>-</Button>
  </Col>

  <Col span={14} className="cart--control__display">
    <InputNumber  min={1} className="input"  value={text} disabled />
  </Col>

  <Col span={4} className="col-2">
    <Button className="cart--control__b2" onClick={() => dispatch(up(record.id))}><img width="12" height="12" src="https://img.icons8.com/android/24/1A1A1A/plus.png" alt="plus"/></Button>
  </Col>
</Row>
        </div>
      ),
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
      ),
    },
    {
      title: "Xóa",
      dataIndex: "operation",
      key: "operation",
      render: (text, record) => (
        <Button onClick={() => handleXoa(record)        
        
        }>Xóa</Button>
      ),
    },
  ];

  function deleteAndAdjust(array, valueToDelete) {
    // tìm vị trí của phần tử cần xóa
    const indexToDelete = array.indexOf(valueToDelete)
  
    if (indexToDelete !== -1) {
      // xóa phần tử tại vị trí indexToDelete
      array.splice(indexToDelete, 1);
  
      // cập nhật giá trị của các phần tử có giá trị lớn hơn phần tử bị xóa
      for (let i = 0; i < array.length; i++) {
        if (array[i] > valueToDelete) {
          array[i] -= 1;
        }
      }
    }
  
    return array;
  }
  const handleXoa = (e) => {
    const key = selectedRowKeys.some(x => {
      return x === e.key
    }) 

    if (key === false) {
      for (let i = 0; i < selectedRowKeys.length; i++) {
        if (selectedRowKeys[i] > e.key) {
          selectedRowKeys[i] -= 1;
        }
      }
      onSelectChange(selectedRowKeys);
    }
    else {
        const newArray = deleteAndAdjust(selectedRowKeys, e.key);
   onSelectChange(newArray);
    }
   
  dispatch(xoa(e.id))
  }

  useEffect(() => {
    const dataSource = products.map((product, index) => ({
      id: product.id,
      key: index,
      image: product.infor.thumbnail,
      orderInfo: product.infor.title,
      originalPrice: product.infor.price,
      price:
        product.infor.price *
        (1 - Math.floor(product.infor.discountPercentage) / 100),
      quantity: product.quanlity,
      total:
        product.infor.price *
        (1 - Math.floor(product.infor.discountPercentage) / 100) *
        product.quanlity,
    }));
    setData_3(dataSource);
  
  }, [products]);

  const onSelectChange = (selectedKeys) => {
  
   const tong = selectedKeys.reduce((totals, item) => {
      return totals + (data_3[item].total)
   }, 0)
    setTotal(tong)
  if (selectedKeys.length == data_3.length) {
    setChecked(true);
  }
  else {
    setChecked(false);
  }

    setSelectedRowKeys([...selectedKeys]);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const pagination = {
    pageSize: 10, // số hàng mỗi trang
   
  };

const handleDown = (values, e) => {
 if (values > 1 ) {
  dispatch(down(e.id))
 }
 else {
   handleXoa(e);
 }
}





const handleSelectAll = (e) => {
 
  const allRowKeys = data_3.map((item) => item.key);
 
  if (e.target.checked) {
    setChecked(true);
    const tong = allRowKeys.reduce((totals, item) => {
      return totals + (data_3[item].total)
   }, 0)
    setTotal(tong)
    setSelectedRowKeys(allRowKeys);
  } else {
    setChecked(false);
    const tong = [].reduce((totals, item) => {
      return totals + (data_3[item].total)
   }, 0)
    setTotal(tong)
    setSelectedRowKeys([]);
  }
};


const dulieuselect = selectedRowKeys.map(x => {
  const result = data_3.find(item => {
    return x == item.key
  })
  return result
})

const handleClick = async (e) => {
  const orderData = await fetchPur(data[0].id)
  const newestOrder = orderData.reduce((maxDateItem, currentItem) => {
    if (!maxDateItem || currentItem.date > maxDateItem.date) {
      return currentItem;
    } else {
      return maxDateItem;
    }
  }, null);
  if (selectedRowKeys.length > 0){
    if (newestOrder && newestOrder.orderStep !== 3) {
      Modal.error({
        title: 'Không thể mua hàng',
        content: 'Đơn hàng của bạn vẫn chưa hoàn thành!'
      });
    }
    else {
       dispatch(addcart(e))
  navigate("/thanhtoan")
    }
    
  }
 else {
  Modal.error({
    title: 'Không thể mua hàng',
    content: 'Vui lòng lựa chọn sản phẩm!!'
  });
 }
}

const handleDelete = () => {
  const findId = selectedRowKeys.map(x => {
    const result = data_3.find(item => {
      return x == item.key
    })
    return result
  })

 const timkiem = findId.map (item => {
  if (item && item.id) {
     return dispatch(xoa(item.id));
  }
   
 })

 if (timkiem.length > 0){
  setSelectedRowKeys([]);
  setTotal(0);
 }
}

const handleAddsp = () => {
  navigate("/collections")
}

const handleXoahet = () => {

  dispatch(xoahet(-1))
}
  return (
    <>
    <Layout>
       <Content className="cart--content  animate__animated animate__zoomIn animate__faster">
        <div className="cart--top">
          <h2>DANH SÁCH GIỎ HÀNG</h2>
          <button className="cart--button" onClick={handleXoahet}>
            Xóa tất cả
          </button>
        </div>
        {data_2 && data_2.product && data_2.product.length > 0 ? (
        <div className="cart">
        <div className="cart--sum">
            Tổng tiền:{" "}
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(`${tong}`)}
            </span>{" "}
          </div>
          <div className="cart--table">
              <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}

            columns={columns}
            dataSource={data_3}
            pagination={pagination}
          />
          </div>
          
        </div>
        ) : (
<div className="cart--empty" >  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{
      height: 60,
    }}
    description={
      <>
         <p>
Hiện Tại Giỏ Hàng Trống
      </p>
      <p>
                Hãy khám phá sản phẩm thức uống của chúng tôi và thêm những món
                hàng mà bạn thích!!
              </p> 
      </>
    
    }
  >
    <Button onClick={handleAddsp} type="primary">Thêm sản phẩm</Button>
  </Empty></div>
        
            
          )}

      </Content>
     
      <Footer className="cart--footer">
  <Row className="cart--footer__row" >
    <Col span={4} >
      <Checkbox onChange={handleSelectAll} checked={checked}  className="cart--footer__checkbox" >Chọn tất cả</Checkbox>
    </Col>
    <Col span={4}>
      <Button className="cart--footer__delete" onClick={handleDelete}>Xóa</Button>
    </Col>
    <Col span={5}>
      Tổng thanh toán: 
      <span className="cart--footer__total">
        {new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(total)}
      </span>
    </Col>
    <Col span={5}>
      Số sản phẩm mua: {selectedProductsCount}
    </Col>
    <Col span={6}>
      <Button onClick={() => handleClick(dulieuselect)} className="cart--footer__buy" type="primary">
        Mua hàng
      </Button>
    </Col>
  </Row>
</Footer>


    </Layout>
     
    </>
  );
}
export default Cart;
