import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductsearch } from "../../service/getcategory/getCategory";
import { Col, Layout, Pagination, Row } from "antd";
import "./search.scss";
const { Header, Content, Footer, Sider } = Layout;

function Searchdetail () {
const params = useParams();
const [data, setData] = useState([]);
  // Số lượng phần tử trên mỗi trang
  const [id, setId] = useState(1); // lấy data của sản phẩm
  const itemsPerPage = 10;
  // Trạng thái cho việc hiển thị trang hiện tại

  // Phân trang dữ liệu
  const handleChange = (e) => {
    setId(e);
  };
  let pageIndex = 0;
  // Lấy dữ liệu cho trang hiện tại
  useEffect(() => {
    // Khởi tạo trang đầu tiên (id = 1) khi trang được tải lại
    setId(1);
  }, []); // [] nghĩa là useEffect chỉ chạy một lần khi component được render lần đầu

useEffect(() => {
 const fetchApi = async (e) => {
    const result = await getProductsearch(e);
    if (result) {
        setData(result);
    console.log(result);
    }
    else {
      //
    }
 }
 fetchApi(params.name);
},[params.name])

const paginatedData = [
    {
      price: "",
    },
  ];
while (pageIndex < data.length) {
    paginatedData.push(data.slice(pageIndex, pageIndex + itemsPerPage));
    pageIndex += itemsPerPage;
  }

  // tạo tổng số phân trang để phân
  const total = Math.ceil((((data.length / 12).toFixed(1) * 10) / 10) * 10);
    return (
        <>
            {
                data.length > 0 ? (
                    <div className="search">
                    <div className="search--header">
                        <h2>CÓ {data.length} KẾT QUẢ TÌM KIẾM PHÙ HỢP</h2>
                    </div>
                    <Layout>
                    
                    <Content>
                    <div className="search--content" >
            <Row gutter={[10, 10]}>
           
                {paginatedData[id].map((item) => (
                  
                  <Col className="search--col">
                  <Link to={"/product/" + item.id} >
                    <div className="search--item">
                      <div className="search--item__top">
                        <img src={item.thumbnail} />
                      </div>
                      <div className="search--item__under">
                        <h3>
                          <Link to="/" key={item.title}>
                            {item.title}
                          </Link>
                        </h3>
                        {item.discountPercentage !== 0 ? (
                          <p className="search--item__p1">
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
                        <div className="search--item__price">
                          <p
                            className={`search--item__p2 ${
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
                  </Col>
                ))}
               

                
            </Row>
            </div>
          </Content>
                    
                    </Layout>
                    <Pagination defaultCurrent={1} current={id} total={total} onChange={handleChange} />
                    </div>
                )
                : (
                    <div class="no-results">
                    <img src="https://img.icons8.com/color/48/cancel--v1.png" alt="cancel--v1"/>
    <p>Không tìm thấy kết quả phù hợp.</p>
    <p>Vui lòng thử lại với từ khóa tìm kiếm khác.</p>
</div>

                )
            }
        </>
    )
}
export default Searchdetail;