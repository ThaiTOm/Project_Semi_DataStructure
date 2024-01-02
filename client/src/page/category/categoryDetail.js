import { useEffect, useState } from "react";
import { getProductcate } from "../../service/getcategory/getCategory";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../components/takeCookies/takeCookies";
import { useNavigate, useParams } from "react-router-dom";
import {
  Layout,
  Pagination,
} from "antd";
import "./category.scss";
import { AddtoCart, filterByArrange, taocate, taohsx } from "../../components/filter";
import Contenttop from "../../components/contentTop";
import Siderlane from "../../components/sider";
import Items from "../../components/Items";
const { Header } = Layout;

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

  // check khoảng giá và đưa dữ liệu thao tác vào data_3
  
  
  const handleChange_final = (e) => { // lọc khoảng giá
    setData_3({
      ...data_3,
      distance: e,
    });
    setId(1);
  };


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
      <Contenttop handleSelect={handleSelect} title={ data && data[1] && data[1].category ? `${data[1].category}` : ""} />
        <Layout className="category--layout">

        <Siderlane mang={mang} itemsToShow={itemsToShow} data={data} toggleExpanded={toggleExpanded} expanded={expanded} data_3={data_3} max={max} handleChange_final={handleChange_final} handleChange_hsx={handleChange_hsx} cate={cate} showcate={false} />
      

        <Items paginatedData={paginatedData} checkId={checkId} cookies={cookies} dispatch={dispatch} navigate={navigate} id={id} AddtoCart={AddtoCart} />
        
        </Layout>
        <Pagination
        className="category--pagination"
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
