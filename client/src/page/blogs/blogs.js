import Sider from "antd/es/layout/Sider";
import Layout, { Content } from "antd/es/layout/layout";
import { getBlogCate, getCategory } from "../../service/getcategory/getCategory";
import { useEffect, useState } from "react";
import { Checkbox, Col, Pagination, Row } from "antd";
import { getCookie } from "../../components/takeCookies/takeCookies";
import { postBlogCate } from "../../service/post/post";
import { Link } from "react-router-dom";
import "./blogs.scss"
function Blog() {
 const [allCate, setAllCate] = useState([]);
 const [id, setId] = useState(1); // xét phân trang
 const [paginatedData, setPaginatedData] = useState(0);
 const itemsPerPage = 8; // Số lượng phần tử trên mỗi trang
 let pageIndex = 0; // xác định mỗi phân trang có thể ít hơn 12 trang mặc định
const cookies = getCookie("token")

  const getAllCate = async () => {
    let cate = [];
    const result =  await getCategory();
    for (const item of result){
      cate.push(item.cate);
    }
    setAllCate(cate);
    takeBLogsCate(cookies, cate);
  }

  const takeBLogsCate = async (token, cate) => {
  let pageId = [""];
    const result = await postBlogCate(token, cate);
    while(pageIndex <= result.blog.length){
      pageId.push(result.blog.slice(pageIndex, pageIndex + itemsPerPage));
      pageIndex += itemsPerPage;
    }
    setPaginatedData(pageId);    
  }
  
 useEffect(() => {
  getAllCate();
  setId(1);
 }, [])



// Sử dụng
 const handleChange_cate = (values) => {
  if(values.length === 0){
    getAllCate();
  }
  else {
    takeBLogsCate(cookies, values);
  }
  
  setId(1);
 }

 const handleChange = (e) => {
  // thay đổi phân trang thì set id theo đúng chỗ
  setId(e);
};

 const total = Math.ceil(
  (((paginatedData.length / 8).toFixed(1) * 10) / 10) * 10
);


return<>
<Layout>
<Sider theme="light" className="siderLane--sider">
<div className="siderLane--sider__cate">
            <h2>LOẠI BLOGS</h2>

            <Checkbox.Group
              onChange={handleChange_cate}
              style={{ width: "100%" }}
            >
              <Row gutter={[0, 10]}>
                {Array.isArray(allCate) && allCate.map((x) => (
                  <Col span={24} key={x}>
                    <Checkbox value={x}>{x}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </div>
         

        </Sider>
  <Content>
  <Row gutter={[0, 10]}>
        {paginatedData.length > 0 && Array.isArray(paginatedData[id]) ? (
          paginatedData[id].map((item) => (
            <Col className="blogItems--col ">
              <Link to={"/blogoutlet/" + item._id}>
                <div className="blogItems--item">
                  <div className="blogItems--item__top">
                    <img src={item.image} />
                  </div>
                  <div className="blogItems--item__under">
                    <h3>{item.title}</h3>
                   <div>
                    {item.content}
                   </div>
                 
                  </div>
                </div>
              </Link>
            </Col>
          ))
        ) : (
          <div class="blogItems--message">
            <h2>blogs không được tìm thấy!</h2>
            <p>Xin lỗi, không có sản phẩm phù hợp với yêu cầu của bạn.</p>
          </div>
        )}
      </Row>
  </Content>
 
</Layout>
<Pagination
        className="blogItems--pagination"
        defaultCurrent={1}
        current={id}
        total={total}
        onChange={handleChange}
      />
</>

} 
export default Blog;