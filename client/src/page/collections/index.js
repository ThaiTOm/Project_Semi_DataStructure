import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,

  Layout,

  Pagination,
  Row,
  Select,
  Slider,

} from "antd";


import { Link, useNavigate } from "react-router-dom";
import "./collections.scss";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";
import {
  
  getProductsp,
} from "../../service/getcategory/getCategory";
import { filterByArrange, taocate, taohsx } from "../../components/filter";
import { useDispatch, useSelector } from "react-redux";
import { add, up } from "../../actions/actCart";
import { getCookie } from "../../components/takeCookies/takeCookies";
function Collections() {
  const [data, setData] = useState([]); //
  const [id, setId] = useState(1); // lấy data của sản phẩm
  const [data_3, setData_3] = useState({
    hsx: "",
    distance: [1000, 1300000],
    cate: "",
    phanloai: ""
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
 const [data_4, setData_4] = useState([]);
  const mang = []; // tạo một mảng chứa các hãng sản xuất
  const cate = [];
  const paginatedData = [
    {
      price: "",
    },
  ];

  // Số lượng phần tử trên mỗi trang
  
  const itemsPerPage = 12;
  // Trạng thái cho việc hiển thị trang hiện tại

  // Phân trang dữ liệu

  let pageIndex = 0;

  // Lấy dữ liệu cho trang hiện tại
const cookies = getCookie("token");

  useEffect(() => {
    // Khởi tạo trang đầu tiên (id = 1) khi trang được tải lại
    setId(1);
  }, []); // [] nghĩa là useEffect chỉ chạy một lần khi component được render lần đầu



  useEffect(() => {
    // lấy data gốc
    const fetchApi = async () => {
      const result = await getProductsp();
      if (!result) {
        console.log("coconcac");
      } else {
        setData([...result]);
        setData_4(result);
      }
    };
    fetchApi();
    
  }, []);

  // tạo một dãy hãng sản xuất
  taohsx(data, mang);

  // tạo loại sản phẩm
  taocate(data, cate);


  // phân trang

  const handleChange = (e) => {
    setId(e);
  };

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


  // đưa dữ liệu thay đổi vào data_3
  const handleChange_hsx = (e) => {
    console.log(e);
    setData_3({
      ...data_3,
      hsx: e,
    });
    setId(1);
  };

  // check xem thêm và rút gọn
  const [expanded, setExpanded] = useState(false);
  const itemsToShow = expanded ? mang.length : 5;

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };


  // check khoảng giá và đưa dữ liệu thao tác vào data_3
  const handleChange_final = (e) => {
    setData_3({
      ...data_3,
      distance: e,
    });
    setId(1);
    console.log(e);
  };

  // lọc loại sản phẩm
  const handleChange_cate = (e) => {
    setData_3({
      ...data_3,
      cate: e,
    });
    setId(1);
  };

  // const filterByArrange = (e) => {
   
    
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
    const arrangedData = filterByArrange(data_3, data_4, data);
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

  // tạo phân trang đẩy vào mảng theo từng mảng
  while (pageIndex < giatriloc.length) {
    paginatedData.push(giatriloc.slice(pageIndex, pageIndex + itemsPerPage));
    pageIndex += itemsPerPage;
  }

  // tạo tổng số phân trang để phân
  const total = Math.ceil((((giatriloc.length / 12).toFixed(1) * 10) / 10) * 10);
 
  // xuất giá trị

const handleSelect = (e) => {
  setData_3({
    ...data_3,
    phanloai: e,
  });
  setId(1);
  console.log(e);
}
 


  return (
    <>
    
      <div className="collections">
        <div className="collections--bread">
          
          <Breadcrumb
            items={[
              {
                title: <Link to="/">Trang chủ</Link>,
              },

              {
                title: "Sản phẩm",
              },
            ]}
          />
        </div>
        <div className="collections--all">
          <h1>Tất cả sản phẩm</h1>
          <div className="collections--arrange">
            <p className="collections--arrange__sx">
              <b>Sắp xếp:</b>
            </p>
           <div className="collections--arrange__pl">
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
        <Layout className="collections--layout">
          <Sider theme="light" className="collections--sider">
            <div className="collections--sider__hsx">
              <Checkbox.Group
                onChange={handleChange_hsx}
                style={{ width: "100%" }}
              >
                <Row>
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

            <div className="collections--sider__price">
              <h2>Giá</h2>
              <div className="collections--sider__distance">
                <span className="collections--sider__sp">
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
                <span className="collections--sider__sp">
                  {data_3.distance[1] == undefined
                    ? new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(`${1300000}`)
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
                defaultValue={[1000, 1300000]}
                max={1300000}
                min={1000}
                step={1000}
                onAfterChange={handleChange_final}
              />
            </div>


            {/* filter loại sản phẩm */}
            <div className="collections--sider__cate">
              <h2>LOẠI SẢN PHẨM</h2>
              <Checkbox.Group
                onChange={handleChange_cate}
                style={{ width: "100%" }}
              >
                <Row>
                  {cate.map((x) => (
                    <Col span={24} key={x}>
                      <Checkbox value={x}>{x}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </div>
          </Sider>
          <Content>
            <Row gutter={[10, 10]}>
            {paginatedData.length > 0 &&  Array.isArray(paginatedData[id]) ? (
                paginatedData[id].map((item) => (
                  
                  <Col className="collections--col">
                  <Link to={"/product/" + item.id} >
                    <div className="collections--item">
                      <div className="collections--item__top">
                        <img src={item.thumbnail} />
                      </div>
                      <div className="collections--item__under">
                        <h3>
                          <Link to="/" key={item.title}>
                            {item.title}
                          </Link>
                        </h3>
                        {item.discountPercentage !== 0 ? (
                          <p className="collections--item__p1">
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
                        <div className="collections--item__price">
                          <p
                            className={`collections--item__p2 ${
                              item.discountPercentage !== 0 ? "gachngang" : ""
                            }`}
                          >
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(`${item.price}`)}
                          </p>
                          <div>
                            {item.discountPercentage !== 0
                              ? `${item.discountPercentage}%`
                              : ""}
                          </div>
                        </div>
                      </div>
                    </div>
                    </Link>
                    <div className="collections--item__add">
                  <button onClick={() => handleClick(item.id, item)}>
                    +
                  </button>
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
  );
}

export default Collections;


