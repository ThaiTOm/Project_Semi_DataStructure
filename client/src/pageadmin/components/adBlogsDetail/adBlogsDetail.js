import { useNavigate, useParams } from "react-router-dom";
import { getBlogId } from "../../../service/getcategory/getCategory";
import { useEffect, useState } from "react";
import { getCookie } from "../../../components/takeCookies/takeCookies";
import parse from 'html-react-parser';
import { Button, Layout } from "antd";
import Blogmodaldetail from "./adBlogsModalDetail";
import { patchBlogId } from "../../../service/patch/patch";
import "./adBlogsDetail.scss"
function Adblogdetail (){
  const navigate = useNavigate();
  const params = useParams();
  const param = params.id;
  const cookies = getCookie("token");
  const [blog, setBlog] = useState([]);
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);
  const [reload, setReload] = useState(true);

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
    navigate("/admin/blogs/news");
}
const handleClick = () => {
  setShow(true);
  setReload(!reload);
}

const handlePatch = async (values) => {
await patchBlogId(values, cookies, param);
  takeBlogId(cookies, param);
}

  return <>
    <div className="adBlogDt">
    <Button onClick={handleBack} type="primary" className="adBlogDt--back">
              Quay về
            </Button>
            <Button onClick={handleClick} type="primary" className="adBlogDt--chinhsua">
              Chỉnh sửa
            </Button>
         
               <h1 className="adBlogDt--title" >
        {blog.title}
       </h1>
       <p className="adBlogDt--content">{blog.content}</p>
       <div className="adBlogDt--description">
       {parse(description)}
       </div>
       <Blogmodaldetail className="adBlogDt--modal" reload={reload} show={show} setShow={setShow} onPatchBlog={handlePatch} blog={blog} />
         
      
    </div>
  </>
  }
  export default Adblogdetail;