import { Link, useNavigate } from "react-router-dom";
import { getProductdc, getProductsp } from "../../service/getcategory/getCategory";
import { useEffect, useState } from "react";
import "./discount.scss"
import { PlusOutlined  } from '@ant-design/icons';
import { filterByArrange, handleClick, taocate, taohsx } from "../../components/filter";
import { useDispatch, useSelector } from "react-redux";
import { add, up } from "../../actions/actCart";
import { getCookie } from "../../components/takeCookies/takeCookies";
import { Breadcrumb, Button, Checkbox, Col, Layout, Modal, Pagination, Row, Select, Slider } from "antd";
import filterData from "../../components/handleLogic/handlelogic";
const { Header, Content, Footer, Sider } = Layout;

const Discount = () => {

  const [max, setMax] = useState(0) 
  const [data, setData] = useState([]); // dữ liệu data sp gốc
  const cate = [];  
  const [id, setId] = useState(1);  // mã số phân trang
  const [data_4, setData_4] = useState([]);  // tạo data sản phẩm có thể thay đổi 
  const [data_3, setData_3] = useState({ // tạo data lọc
    phanloai: "",
    distance: [1000, 999999999],
    cate: "",
    hsx: "",
  });
  const mang = []; // tạo một mảng chứa các hãng sản xuất
  const paginatedData = [  // data theo phân trang
    {
      price: "",
    },
  ];
  const cookies = getCookie("token"); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkId = useSelector(state => state.cartStore);
  let pageIndex = 0;  // số sản phẩm có thể nhỏ hơn số lượng mặc định
  const itemsPerPage = 12; // số lượng phần tử trên mỗi trang
  const [expanded, setExpanded] = useState(false);  // check xem thêm và rút gọn

  // const handleClick = (id, infor) => {
  //   if (cookies) {
  //     const check = checkId.some((item) => {
  //       return item.id === id;
  //     });

  //     if (check) {
  //       const productSlg = checkId.find((item) => {
  //         return item.id === id;
  //       });
      

  //       if (infor.Quantity > productSlg.quanlity) {
  //         dispatch(up(id));
  //       } else {
  //         Modal.error({
  //           title: "Không Thể Thêm Sản Phẩm",
  //           content:
  //             "Số lượng bạn chọn đã đạt mức tối đa số lượng của sản phẩm này ",
  //         });
  //       }
  //     } else {
  //       dispatch(add(id, infor));
  //     }
  //   } else {
  //     navigate("/login");
  //   }
  // };  // ẩn nó đi để lỡ lỗi thì có cái mở

  
  useEffect(() => {
    // lấy data gốc
    const fetchApi = async () => {
      const result = await getProductdc();
      if (!result) {
     //
      } else {
        const maxValue = result.reduce((max, obj) => (obj.price > max ? obj.price : max), result[0].price);  
        setMax(maxValue) // hàm lấy dữ liệu giá cao nhât
        setData_3({
          ...data_3,
          distance: [1000, maxValue]
         })
        setData([...result]);
        setData_4(result);
      }
    };
    fetchApi();
    
  }, []);
  // tao cate
  taocate(data, cate);
 
 // tạo logic thu gọn xem thêm
  taohsx(data, mang);
  const itemsToShow = expanded ? mang.length : 5;
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  // lọc theo category
  const handleChange_cate = (e) => {
    setData_3({
      ...data_3,
      cate: e,
    });
    setId(1);
  };

  // lọc theo khoảng giá
  const handleChange_final = (e) => {
    setData_3({
      ...data_3,
      distance: e,
    });
    setId(1);
  };

  // lọc theo phân trang
  const handleChange = (e) => {
    setId(e);
  };

  // lọc theo sắp xếp
  const handleSelect = (e) => {
    setData_3({
      ...data_3,
      phanloai: e,
    });
    setId(1);
  }

  // lọc theo hãng sx
  const handleChange_hsx = (e) => {
    setData_3({
      ...data_3,
      hsx: e,
    });
    setId(1);
  };

  
  
  // const filterData = () => {
  //   const arrangedData = filterByArrange(data_3,data_4, data);
  //   const filteredData = arrangedData.filter((item) => {
    
       
  //     // Lọc theo hãng sản xuất
  //     const filterByBrand =
  //       data_3.hsx.length === 0 || data_3.hsx.includes(item.brand);
  //     // Lọc theo khoảng giá
  //     const filterByPrice =
  //       item.price * ((100 - item.discountPercentage) / 100) >=
  //         data_3.distance[0] &&
  //       item.price * ((100 - item.discountPercentage) / 100) <=
  //         data_3.distance[1];
  //     // Lọc theo loại sản phẩm
  //     const filterByCategory =
  //       data_3.cate.length === 0 || data_3.cate.includes(item.category);

  //     return filterByBrand && filterByPrice && filterByCategory;


  //   });

 

  //   return filteredData;
  // };
// gán giá trị 
  
const giatriloc = filterData(data_3,data_4, data);  // giá trị lọc cuối cùng


while (pageIndex < giatriloc.length) {   // xử lí phân trang
  paginatedData.push(giatriloc.slice(pageIndex, pageIndex + itemsPerPage));
  pageIndex += itemsPerPage;
}

// tạo tổng số phân trang để phân
const total = Math.ceil((((giatriloc.length / 12).toFixed(1) * 10) / 10) * 10);


  return (
    <>
     <div className="discount animate__animated animate__zoomIn animate__faster" >
     <div className="discount--bread">
         
          <Breadcrumb 
            items={[
              {
                title: <Link to="/">Trang chủ</Link>,
              },

              {
                title: "Sản phẩm khuyến mãi",
              },
            ]}
          />
        </div>
        <div className="discount--all">
          <h1>Sản phẩm khuyến mãi</h1>
           <div className="discount--arrange">
            <p className="discount--arrange__sx">
              <b>Sắp xếp:</b>
            </p>
           <div className="discount--arrange__pl">
           <Select
      onSelect={handleSelect}
    style={{
      width: 200,
    }}
    placeholder="BẠN MUỐN LỌC GÌ"
    optionFilterProp="children"
    filterOption={(input, option) => (option?.label ?? '').includes(input)}
    filterSort={(optionA, optionB) =>
      (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
    }
    options={[
      {
        value: 'tentang',
        label: 'Tên A -> Z',
      },
      {
        value: 'tengiam',
        label: 'Tên Z -> A',
      },
      {
        value: 'giatang',
        label: 'Giá tăng dần',
      },
      {
        value: 'giagiam',
        label: 'Giá giảm dần',
      },
      {
        value: 'original',
        label: 'Trở về ban đầu',
      }
     
    ]}
  />
  </div>
           </div>
          </div>
          <Layout className="discount--layout" >
          <Sider theme="light" className="discount--sider">
          <div className="discount--sider__cate">
              <h2>LOẠI SẢN PHẨM</h2>
             
              <Checkbox.Group
                onChange={handleChange_cate}
                style={{ width: "100%" }}
              >
                <Row gutter={[0, 10]}>
                  {cate.map((x) => (
                    <Col span={24} key={x}>
                      <Checkbox value={x}>{x}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </div>
            <div className="discount--sider__price">
              <h2>Giá</h2>
              <div className="discount--sider__distance">
                <span className="discount--sider__sp">
                  {data_3.distance[0] == undefined
                    ? new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(`${0}`)
                    : new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(`${data_3.distance[0]}`)}
                </span>
                <span className="discount--sider__sp">
                  {data_3.distance[1] == undefined
                    ? new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(`${max}`)
                    : new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(`${data_3.distance[1]}`)}
                </span>
              </div>
              <Slider
  range={{
    draggableTrack: true,
  }}
  defaultValue={max ? [1000, max] : [1000, 999999999]} // Giá trị mặc định khi không có max hoặc max không đúng
  max={max} // Sử dụng giá trị mặc định nếu không có max hoặc max không đúng
  min={1000}
  step={1000}
  onAfterChange={handleChange_final}
  tooltip={{
      open: false,
    }}
/>
            </div>
            <div className="discount--sider__hsx">
              <Checkbox.Group
                onChange={handleChange_hsx}
                style={{ width: "100%" }}
              >
                <Row gutter={[0, 10]}>
                  <h2>Hãng sản xuất</h2>
                  {mang.slice(0, itemsToShow).map((x) => (
                    <Col span={24} key={x}>
                      <Checkbox value={x}>{x}</Checkbox>
                    </Col>
                  ))}
                  {data.length > 5 && (
                    <Col span={24}>
                      <Button onClick={toggleExpanded}>
                        {expanded ? "Thu gọn" : "Xem thêm"}
                      </Button>
                    </Col>
                  )}
                </Row>
              </Checkbox.Group>
            </div>
          </Sider>
          <Content>
          <Row gutter={[0, 10]}>
          {paginatedData.length > 0 &&  Array.isArray(paginatedData[id]) ? (
          
                paginatedData[id].map((item) => (
                  <Col className="discount--col">
                  <Link to={"/product/" + item.id} >
                    <div className="discount--item">
                      <div className="discount--item__top">
                        <img src={item.thumbnail} />
                      </div>
                      <div className="discount--item__under">
                        <h3>
                          <Link to="/" key={item.title}>
                            {item.title}
                          </Link>
                        </h3>
                        {item.discountPercentage !== 0 ? (
                          <p className="discount--item__p1">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(
                              `${
                                item.price *
                                ((100 - Math.floor(item.discountPercentage)) /
                                  100)
                              }`
                            )}
                          </p>
                        ) : (
                          ""
                        )}
                        <div className="discount--item__price">
                          <p
                            className={`discount--item__p2 ${
                              item.discountPercentage !== 0 ? "gachngang" : "tomau"
                            }`}
                          >
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(`${item.price}`)}
                          </p>
                          <div className="dc">
                            {item.discountPercentage !== 0
                              ? `${item.discountPercentage}%`
                              : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                    </Link>
                    <div className="discount--item__add">
                  <Button shape="circle" type="primary" icon={<PlusOutlined />} onClick={() => handleClick(item.id, item, checkId, cookies, dispatch, navigate)}>
                 
                  </Button>
                </div>
                  </Col>
                )))
                : (<div class="discount--message">
  <h2>Sản phẩm không được tìm thấy!</h2>
  <p>Xin lỗi, không có sản phẩm phù hợp với yêu cầu của bạn.</p>
</div>
)
                }

            </Row>
          </Content>
          </Layout>
          <Pagination defaultCurrent={1} current={id} total={total} onChange={handleChange} />
        

     </div>
    </>
  )
  }
export default Discount;
