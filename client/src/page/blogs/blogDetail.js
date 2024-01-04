import { useNavigate, useParams } from "react-router-dom";
import parse from 'html-react-parser';
import { getBlogId } from "../../service/getcategory/getCategory";
import { getCookie } from "../../components/takeCookies/takeCookies";
import { Button } from "antd";
import { useEffect, useState } from "react";
import "./blogs.scss"
function Blogdetail() {
  const navigate = useNavigate();
  const params = useParams();
  const param = params.id;
  const cookies = getCookie("token");
  const [blog, setBlog] = useState([]);
  const [description, setDescription] = useState("");

  const takeBlogId = async (token, id) => {
      const result = await getBlogId(token, id);
      if(result.code === 200) {
        setBlog(result.blog);
        setDescription(result.blog.description);
      }
  }
 
  useEffect(() => {
    takeBlogId(cookies, param);
  }, [cookies, param])

  const handleBack = () => {
    navigate("/blog");
}




  return <>
    <div className="BlogDt">
    <Button onClick={handleBack} type="primary" className="adBlogDt--back">
              Quay về
            </Button>
               <h1 className="BlogDt--title" >
        {blog.title}
       </h1>
       <p className="BlogDt--content">{blog.content}</p>
       <div className="BlogDt--description">
       {parse(description)}
       </div>
    </div>
  </>
 } 
 export default Blogdetail;