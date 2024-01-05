

import { useEffect, useState } from "react";
import { getProductsp } from "../../service/getcategory/getCategory";
import {
  AddtoCart,
  taocate,
  taohsx,
} from "../../components/filter";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../components/takeCookies/takeCookies";
import {

  Layout,
  Modal,
  Pagination,
  message,

} from "antd";

import "animate.css";
import { useNavigate } from "react-router-dom";
import "./collections.scss";
import filterData from "../../components/handleLogic/handlelogic";
import Contenttop from "../../components/contentTop";
import Siderlane from "../../components/sider";
import Items from "../../components/Items";

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
        Modal.error({
          title: "Lỗi",
          content: "Không có thông tin sản phẩm phù hợp."
        })
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


  const handleChange = (e) => {
    // thay đổi phân trang thì set id theo đúng chỗ
    setId(e);
  };

  // lọc theo hãng sản xuất
  const handleChange_hsx = (e) => {

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
  };


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
          className="collections--pagination"
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
