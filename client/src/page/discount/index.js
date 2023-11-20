import { Link, useNavigate } from "react-router-dom";
import { getProductdc, getProductsp } from "../../service/getcategory/getCategory";
import { useEffect, useState } from "react";
import "./discount.scss"
import { PlusOutlined  } from '@ant-design/icons';
import { filterByArrange, taocate, taohsx } from "../../components/filter";
import { useDispatch, useSelector } from "react-redux";
import { add, up } from "../../actions/actCart";
import { getCookie } from "../../components/takeCookies/takeCookies";
import { Breadcrumb, Button, Checkbox, Col, Layout, Pagination, Row, Select, Slider } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const Discount = () => {

  const [max, setMax] = useState(0)
  const [data, setData] = useState([]); //
  const cate = [];
  const [id, setId] = useState(1);
  const [data_4, setData_4] = useState([]);
  const [data_3, setData_3] = useState({
    phanloai: "",
    distance: [1000, 999999999],
    cate: "",
    hsx: "",
  });
  const mang = []; // tạo một mảng chứa các hãng sản xuất
  const paginatedData = [
    {
      price: "",
    },
  ];
  const cookies = getCookie("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Số lượng phần tử trên mỗi trang
  
  const itemsPerPage = 12;
  // Trạng thái cho việc hiển thị trang hiện tại

  // Phân trang dữ liệu
  const checkId = useSelector(state => state.cartStore);
  const handleClick = (id, infor) => {
    if(cookies) {
        const check = checkId.some(item => {
    return item.id === id;
});
if (check) {
  dispatch(up(id));
  }
  else {
  dispatch(add(id, infor));
  }
    }
    else {
      navigate("/register");
    }
  }

  let pageIndex = 0;
  // const taocate = () => {
  //   if (Array.isArray(data)) {
  //     data.map((item) => {
  //       const check_1 = cate.some((x) => {
  //         return item.category == x;
  //       });
  //       if (check_1 == false) {
  //         cate.push(item.category);
  //       }
  //     });
      
  //   } else {
  //     console.error("Data is not an array.");
  //   }

  // };
  
  taocate(data, cate);
  // const taohsx = () => {
  //   data.map((item) => {
  //     const check = mang.some((x) => {
  //       return item.brand == x;
  //     });
  //     if (check == false) {
  //       mang.push(item.brand);
  //     }
  //   });
  // };
  taohsx(data, mang);
  const [expanded, setExpanded] = useState(false);
  const itemsToShow = expanded ? mang.length : 5;

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleChange_cate = (e) => {
    setData_3({
      ...data_3,
      cate: e,
    });
    setId(1);
  };
  const handleChange_final = (e) => {
    setData_3({
      ...data_3,
      distance: e,
    });
    setId(1);
    console.log(e);
  };
  const handleChange = (e) => {
    setId(e);
    console.log(e);
  };

  const handleSelect = (e) => {
    setData_3({
      ...data_3,
      phanloai: e,
    });
    setId(1);
    console.log(e);
  }
  const handleChange_hsx = (e) => {
    console.log(e);
    setData_3({
      ...data_3,
      hsx: e,
    });
    setId(1);
  };

  // const filterByArrange = (ploai) => {
  //   // tên A -> Z
  //   if (data_3.phanloai === 'tentang') {
  //     return ploai.sort((a, b) => a.title.localeCompare(b.title));
  //   } 
  //   // tên từ Z -> A
  //   else if (data_3.phanloai === 'tengiam') {
  //     return ploai.sort((a, b) => b.title.localeCompare(a.title));
  //   } 
  //   // giá tăng dần
  //   else if (data_3.phanloai === 'giatang') {
  //     return ploai.sort((a, b) =>  a.price *
  //     ((100 - Math.floor(a.discountPercentage)) /
  //       100) -  b.price *
  //       ((100 - Math.floor(b.discountPercentage)) /
  //         100));
  //   } 
  //   // giá giảm dần
  //   else if
  //    (data_3.phanloai === 'giagiam') {
  //     return ploai.sort((a, b) =>  b.price *
  //     ((100 - Math.floor(b.discountPercentage)) /
  //       100) -  a.price *
  //       ((100 - Math.floor(a.discountPercentage)) /
  //         100));
  //   } 
  //   // trở về trạng thái ban đầu
  //   else if (data_3.phanloai === 'original'){
  //     return data;
  //   }
  //   // không có điều kiện nào thì trả về dữ liệu cũ
  //   return ploai;
  // };
  
  
  const filterData = () => {
    const arrangedData = filterByArrange(data_3,data_4, data);
    const filteredData = arrangedData.filter((item) => {
    
       
      // Lọc theo hãng sản xuất
      const filterByBrand =
        data_3.hsx.length === 0 || data_3.hsx.includes(item.brand);
      // Lọc theo khoảng giá
      const filterByPrice =
        item.price * ((100 - item.discountPercentage) / 100) >=
          data_3.distance[0] &&
        item.price * ((100 - item.discountPercentage) / 100) <=
          data_3.distance[1];
      // Lọc theo loại sản phẩm
      const filterByCategory =
        data_3.cate.length === 0 || data_3.cate.includes(item.category);

      return filterByBrand && filterByPrice && filterByCategory;


    });

 

    return filteredData;
  };
// gán giá trị 
  const giatriloc = filterData();
console.log(giatriloc);
 useEffect(() => {
  // lấy data gốc
  const fetchApi = async () => {
    const result = await getProductdc();
    if (!result) {
      console.log("coconcac");
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

console.log(cate);

while (pageIndex < giatriloc.length) {
  paginatedData.push(giatriloc.slice(pageIndex, pageIndex + itemsPerPage));
  pageIndex += itemsPerPage;
}

// tạo tổng số phân trang để phân
const total = Math.ceil((((giatriloc.length / 12).toFixed(1) * 10) / 10) * 10);
console.log(total)
console.log(paginatedData)

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
                  <Button shape="circle" type="primary" icon={<PlusOutlined />} onClick={() => handleClick(item.id, item)}>
                 
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
