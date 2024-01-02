import { useNavigate } from "react-router-dom";
import {
  getProductdc,
} from "../../service/getcategory/getCategory";
import { useEffect, useState } from "react";
import "./discount.scss";
import {
  AddtoCart,
  taocate,
  taohsx,
} from "../../components/filter";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../components/takeCookies/takeCookies";
import {
  Layout,
  Pagination,
} from "antd";
import filterData from "../../components/handleLogic/handlelogic";
import Contenttop from "../../components/contentTop";
import Siderlane from "../../components/sider";
import Items from "../../components/Items";

const Discount = () => {
  const [max, setMax] = useState(0);
  const [data, setData] = useState([]); // dữ liệu data sp gốc
  const cate = [];
  const [id, setId] = useState(1); // mã số phân trang
  const [data_4, setData_4] = useState([]); // tạo data sản phẩm có thể thay đổi
  const [data_3, setData_3] = useState({
    // tạo data lọc
    phanloai: "",
    distance: [1000, 999999999],
    cate: "",
    hsx: "",
  });
  const mang = []; // tạo một mảng chứa các hãng sản xuất
  const paginatedData = [
    // data theo phân trang
    {
      price: "",
    },
  ];
  const cookies = getCookie("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkId = useSelector((state) => state.cartStore);
  let pageIndex = 0; // số sản phẩm có thể nhỏ hơn số lượng mặc định
  const itemsPerPage = 12; // số lượng phần tử trên mỗi trang
  const [expanded, setExpanded] = useState(false); // check xem thêm và rút gọn

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
  };

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

  const giatriloc = filterData(data_3, data_4, data); // giá trị lọc cuối cùng

  while (pageIndex < giatriloc.length) {
    // xử lí phân trang
    paginatedData.push(giatriloc.slice(pageIndex, pageIndex + itemsPerPage));
    pageIndex += itemsPerPage;
  }

  // tạo tổng số phân trang để phân
  const total = Math.ceil(
    (((giatriloc.length / 12).toFixed(1) * 10) / 10) * 10
  );

  return (
    <>
      <div className="discount animate__animated animate__zoomIn animate__faster">
   <Contenttop handleSelect={handleSelect} title={"Sản phẩm khuyến mãi"}  />
        <Layout className="discount--layout">
       <Siderlane mang={mang} itemsToShow={itemsToShow} data={data} toggleExpanded={toggleExpanded} expanded={expanded} data_3={data_3} max={max} handleChange_final={handleChange_final} handleChange_cate={handleChange_cate} handleChange_hsx={handleChange_hsx} cate={cate} showcate={true} />
       <Items paginatedData={paginatedData} checkId={checkId} cookies={cookies} dispatch={dispatch} navigate={navigate} id={id} AddtoCart={AddtoCart} />
        </Layout>
        <Pagination
        className="discount--pagination"
          defaultCurrent={1}
          current={id}
          total={total}
          onChange={handleChange}
        />
      </div>
    </>
  );
};
export default Discount;
