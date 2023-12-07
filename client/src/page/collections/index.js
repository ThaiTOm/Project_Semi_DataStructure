

import { useEffect, useState } from "react";
import { getProductsp } from "../../service/getcategory/getCategory";
import {
  AddtoCart,
  filterByArrange,
  taocate,
  taohsx,
} from "../../components/filter";
import { useDispatch, useSelector } from "react-redux";
import { add, up } from "../../actions/actCart";
import { getCookie } from "../../components/takeCookies/takeCookies";
import {

  Layout,
  Modal,
  Pagination,

} from "antd";

import "animate.css";
import { Link, useNavigate } from "react-router-dom";
import "./collections.scss";
import filterData from "../../components/handleLogic/handlelogic";
import Contenttop from "../../components/contentTop";
import Siderlane from "../../components/sider";
import Items from "../../components/Items";
const { Header, Content, Footer, Sider } = Layout;

function Collections() {
  const [max, setMax] = useState(0);
  const [data, setData] = useState([]); // lấy data của sản phẩm
  const [id, setId] = useState(1); // xét phân trang
  const [data_3, setData_3] = useState({
    // lấy data để lọc
    hsx: "",
    distance: [1000, 9999999999],
    cate: "",
    phanloai: "",
  });
  const [expanded, setExpanded] = useState(false); // xét phần thu gọn mở rộng
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data_4, setData_4] = useState([]); // để kết hợp các hàm lọc và thay đổi chỉ dữ liệu của data_4
  const mang = []; // tạo một mảng chứa các hãng sản xuất
  const cate = []; // tạo category
  const paginatedData = [
    // tạo data sp cho từng trang
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


  console.log(giatriloc);
  return (
    <>
      <div className="collections animate__animated animate__zoomIn animate__faster">
        <Contenttop handleSelect={handleSelect} title={"Tất cả sản phẩm"} />
        <Layout className="collections--layout">
          <Siderlane
            mang={mang}
            itemsToShow={itemsToShow}
            data={data}
            toggleExpanded={toggleExpanded}
            expanded={expanded}
            data_3={data_3}
            max={max}
            handleChange_final={handleChange_final}
            handleChange_cate={handleChange_cate}
            handleChange_hsx={handleChange_hsx}
            cate={cate}
            showcate={true}
          />
          <Items
            paginatedData={paginatedData}
            checkId={checkId}
            cookies={cookies}
            dispatch={dispatch}
            navigate={navigate}
            id={id}
            AddtoCart={AddtoCart}
          />
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
