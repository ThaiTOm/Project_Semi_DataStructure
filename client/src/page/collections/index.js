import { PlusOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import { getProductsp } from "../../service/getcategory/getCategory";
import {
  filterByArrange,
  handleClick,
  taocate,
  taohsx,
} from "../../components/filter";
import { useDispatch, useSelector } from "react-redux";
import { add, up } from "../../actions/actCart";
import { getCookie } from "../../components/takeCookies/takeCookies";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  Layout,
  Modal,
  Pagination,
  Row,
  Select,
  Slider,
} from "antd";

import "animate.css";
import { Link, useNavigate } from "react-router-dom";
import "./collections.scss";
import filterData from "../../components/handleLogic/handlelogic";
const { Header, Content, Footer, Sider } = Layout;

function Collections() {
  const [max, setMax] = useState(0);
  const [data, setData] = useState([]); // lấy data của sản phẩm
  const [id, setId] = useState(1); // xét phân trang 
  const [data_3, setData_3] = useState({  // lấy data để lọc
    hsx: "",
    distance: [1000, 9999999999],
    cate: "",
    phanloai: "",
  });
  const [expanded, setExpanded] = useState(false);  // xét phần thu gọn mở rộng
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data_4, setData_4] = useState([]); // để kết hợp các hàm lọc và thay đổi chỉ dữ liệu của data_4
  const mang = []; // tạo một mảng chứa các hãng sản xuất
  const cate = []; // tạo category
  const paginatedData = [  // tạo data sp cho từng trang 
    {
      price: "",
    },
  ];
  const checkId = useSelector((state) => state.cartStore); // lấy dữ liệu từ reducer
 
  const itemsPerPage = 12; // Số lượng phần tử trên mỗi trang
  let pageIndex = 0; // xác định mỗi phân trang có thể ít hơn 12 trang mặc định
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
        const maxValue = result.reduce(
          (max, obj) => (obj.price > max ? obj.price : max),
          result[0].price
        );
        setMax(maxValue); // hàm lấy dữ liệu giá cao nhât
        setData_3({
          ...data_3,
          distance: [1000, maxValue],
        });
        setData([...result]); // làm vậy để data ko thay đổi khi dữ liệu data_4 thay đổi
        setData_4(result);
      }
    };
    fetchApi();
  }, []);

  // tạo một dãy hãng sản xuất
  taohsx(data, mang);

  // tạo loại sản phẩm
  taocate(data, cate);

  // check xem thêm và rút gọn
  const itemsToShow = expanded ? mang.length : 5;
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

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
  // };

  const handleChange = (e) => {
    // thay đổi phân trang thì set id theo đúng chỗ
    setId(e);
  };

  // lọc theo hãng sản xuất
  const handleChange_hsx = (e) => {
    console.log(e);
    setData_3({
      ...data_3,
      hsx: e,
    });
    setId(1);
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

  // lọc sắp xếp
  const handleSelect = (e) => {
    setData_3({
      ...data_3,
      phanloai: e,
    });
    setId(1);
    console.log(e);
  };

  // const filterData = () => {
  //   const arrangedData = filterByArrange(data_3, data_4, data);
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

  const giatriloc = filterData(data_3, data_4, data);

  // tạo phân trang đẩy vào mảng theo từng mảng
  while (pageIndex < giatriloc.length) {
    paginatedData.push(giatriloc.slice(pageIndex, pageIndex + itemsPerPage));
    pageIndex += itemsPerPage;
  }

  // tạo tổng số phân trang để phân
  const total = Math.ceil(
    (((giatriloc.length / 12).toFixed(1) * 10) / 10) * 10
  );

  return (
    <>
      <div className="collections animate__animated animate__zoomIn animate__faster">
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
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  {
                    value: "tentang",
                    label: "Tên A -> Z",
                  },
                  {
                    value: "tengiam",
                    label: "Tên Z -> A",
                  },
                  {
                    value: "giatang",
                    label: "Giá tăng dần",
                  },
                  {
                    value: "giagiam",
                    label: "Giá giảm dần",
                  },
                  {
                    value: "original",
                    label: "Trở về ban đầu",
                  },
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

            {/* filter loại sản phẩm */}
            <div className="collections--sider__cate">
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
          </Sider>
          <Content>
            <Row gutter={[10, 10]}>
              {paginatedData.length > 0 && Array.isArray(paginatedData[id]) ? (
                paginatedData[id].map((item) => (
                  <Col className="collections--col ">
                    <Link to={"/product/" + item.id}>
                      <div className="collections--item">
                        <div className="collections--item__top">
                          <img src={item.thumbnail} className="img" />
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
                                item.discountPercentage !== 0
                                  ? "gachngang"
                                  : "tomau"
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
                    <div className="collections--item__add">
                      <Button
                        shape="circle"
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() =>
                          handleClick(
                            item.id,
                            item,
                            checkId,
                            cookies,
                            dispatch,
                            navigate
                          )
                        }
                      ></Button>
                    </div>
                  </Col>
                ))
              ) : (
                <div class="collections--message">
                  <h2>Sản phẩm không được tìm thấy!</h2>
                  <p>Xin lỗi, không có sản phẩm phù hợp với yêu cầu của bạn.</p>
                </div>
              )}
            </Row>
          </Content>
        </Layout>
        <Pagination
          className=""
          defaultCurrent={1}
          current={id}
          total={total}
          onChange={handleChange}
        />
      </div>
    </>
  );
}

export default Collections;
