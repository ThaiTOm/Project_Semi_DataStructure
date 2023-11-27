import { useEffect, useRef, useState } from "react";
import { getProductcate } from "../../service/getcategory/getCategory";
import { useDispatch, useSelector } from "react-redux";
import { add, up } from "../../actions/actCart";
import { getCookie } from "../../components/takeCookies/takeCookies";
import { useNavigate, useParams } from "react-router-dom";
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

import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./category.scss";
import { filterByArrange, handleClick, taocate, taohsx } from "../../components/filter";
const { Header, Content, Footer, Sider } = Layout;

function Categorydetail() {
  const params = useParams();
  const [max, setMax] = useState(0);  
  const [data, setData] = useState([]); // lấy sản phẩm theo cate
  const [id, setId] = useState(1); // lấy data của sản phẩm theo phân trang
  const [data_3, setData_3] = useState({ // xét tổng hợp giá trị cần lọc
    hsx: "",
    distance: [1000, 1300000],
    phanloai: "",
  });
  const [expanded, setExpanded] = useState(false);  // xét thu gọn và xem thêm
  const [data_4, setData_4] = useState([]); // một data của sản phẩm theo cate phụ và có thể thay đổi để phục vụ logic
  const cookies = getCookie("token");   // lấy cookies người dùng
  const mang = []; // tạo một mảng chứa các hãng sản xuất
  const cate = []; // tạo category
  const paginatedData = [
    {
      price: "",
    },
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkId = useSelector((state) => state.cartStore);
  const itemsPerPage = 12; // Số lượng phần tử trên mỗi trang
  let pageIndex = 0;

  useEffect(() => {// Khởi tạo trang đầu tiên (id = 1) khi trang được tải lại
    setId(1);
  }, []); // [] nghĩa là useEffect chỉ chạy một lần khi component được render lần đầu

  useEffect(() => { // lấy data gốc
    const fetchApi = async (e) => {
      const result = await getProductcate(e);
      if (!result) {
        //
      } else {
        if (result && result.length > 0) {
          const maxValue = result.reduce(
            (max, obj) => (obj.price > max ? obj.price : max),
            result[0].price
          );
          setMax(maxValue); // hàm lấy dữ liệu giá cao nhât
          setData_3({
            ...data_3,
            distance: [1000, maxValue],
          });
          setData([...result]);
          setData_4(result);
        }
      }
    };

    fetchApi(params.cate);
  }, []);

  
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

  // taohsx();

  // const taocate = () => {
  //   data.map((item) => {
  //     const check_1 = cate.some((x) => {
  //       return item.category == x;
  //     });
  //     if (check_1 == false) {
  //       cate.push(item.category);
  //     }
  //   });
  // };

  // taocate();

  // phân trang

  // tạo một dãy hãng sản xuất
  taohsx(data, mang);// tạo một dãy hãng sản xuất

  
  taocate(data, cate);// tạo loại sản phẩm
  

  const itemsToShow = expanded ? mang.length : 5;// check xem thêm và rút gọn
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleChange = (e) => { // thay đổi khi phân trang
    setId(e);
  };

 
  const handleChange_hsx = (e) => { // đưa dữ liệu thay đổi hãng sản xuất vào data_3 ( data lọc )
    setData_3({
      ...data_3,
      hsx: e,
    });
    setId(1);
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



  // check khoảng giá và đưa dữ liệu thao tác vào data_3
  
  
  const handleChange_final = (e) => { // lọc khoảng giá
    setData_3({
      ...data_3,
      distance: e,
    });
    setId(1);
  };

  // const filterByArrange = (ploai) => {
  //   // tên A -> Z
  //   if (data_3.phanloai === "tentang") {
  //     return ploai.sort((a, b) => a.title.localeCompare(b.title));
  //   }
  //   // tên từ Z -> A
  //   else if (data_3.phanloai === "tengiam") {
  //     return ploai.sort((a, b) => b.title.localeCompare(a.title));
  //   }
  //   // giá tăng dần
  //   else if (data_3.phanloai === "giatang") {
  //     return ploai.sort(
  //       (a, b) =>
  //         a.price * ((100 - Math.floor(a.discountPercentage)) / 100) -
  //         b.price * ((100 - Math.floor(b.discountPercentage)) / 100)
  //     );
  //   }
  //   // giá giảm dần
  //   else if (data_3.phanloai === "giagiam") {
  //     return ploai.sort(
  //       (a, b) =>
  //         b.price * ((100 - Math.floor(b.discountPercentage)) / 100) -
  //         a.price * ((100 - Math.floor(a.discountPercentage)) / 100)
  //     );
  //   }
  //   // trở về trạng thái ban đầu
  //   else if (data_3.phanloai === "original") {
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

      return filterByBrand && filterByPrice;
    });

    return filteredData;
  };

  // gán giá trị lọc cuối cùng
  const giatriloc = filterData();

  // tạo phân trang đẩy vào mảng theo từng mảng
  while (pageIndex < giatriloc.length) {
    paginatedData.push(giatriloc.slice(pageIndex, pageIndex + itemsPerPage));
    pageIndex += itemsPerPage;
  }

  // tạo tổng số phân trang để phân
  const total = Math.ceil(
    (((giatriloc.length / 12).toFixed(1) * 10) / 10) * 10
  );

  const handleSelect = (e) => {  // lọc sắp xếp
    setData_3({
      ...data_3,
      phanloai: e,
    });
    setId(1);
  };

  return (
    <>
      <div className="category">
        <div className="category--bread">
          {data && data[1] && data[1].category && (
            <Breadcrumb
              items={[
                {
                  title: <Link to="/">Trang chủ</Link>,
                },

                {
                  title: data[1].category,
                },
              ]}
            />
          )}
        </div>
        <div className="category--all">
          {data && data[1] && data[1].category && <h1>{data[1].category}</h1>}
          <div className="category--arrange">
            <p className="category--arrange__sx">
              <b>Sắp xếp:</b>
            </p>
            <div className="category--arrange__pl">
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
        <Layout className="category--layout">
          <Sider theme="light" className="category--sider">
            <div className="category--sider__hsx">
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

            <div className="category--sider__price">
              <h2>Giá</h2>
              <div className="category--sider__distance">
                <span className="category--sider__sp">
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
                <span className="category--sider__sp">
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
          </Sider>
          <Content>
            <Row gutter={[10, 10]}>
              {paginatedData.length > 0 && Array.isArray(paginatedData[id]) ? (
                paginatedData[id].map((item) => (
                  <Col className="category--col">
                    <Link to={"/product/" + item.id}>
                      <div className="category--item">
                        <div className="category--item__top">
                          <img src={item.thumbnail} />
                        </div>
                        <div className="category--item__under">
                          <h3>
                            <Link to="/" key={item.title}>
                              {item.title}
                            </Link>
                          </h3>
                          {item.discountPercentage !== 0 ? (
                            <p className="category--item__p1">
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
                          <div className="category--item__price">
                            <p
                              className={`category--item__p2 ${
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
                    <div className="category--item__add">
                      <Button
                        shape="circle"
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => handleClick(item.id, item, checkId, cookies, dispatch, navigate)}
                      ></Button>
                    </div>
                  </Col>
                ))
              ) : (
                <div class="discount--message">
                  <h2>Sản phẩm không được tìm thấy!</h2>
                  <p>Xin lỗi, không có sản phẩm phù hợp với yêu cầu của bạn.</p>
                </div>
              )}
            </Row>
          </Content>
        </Layout>
        <Pagination
          defaultCurrent={1}
          current={id}
          total={total}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
export default Categorydetail;
