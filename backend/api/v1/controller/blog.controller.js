
const Blog = require("../models/blog.model");
// [get] /blogs/getBlogs
module.exports.getBlogs = async (req, res) => {
   const blogs = await Blog.find({});
   if(blogs){
    res.json({
      code: 200,
      blogs: blogs
    })
   }
   else {
    res.json({
      code: 400
    })
   }
}

// [post] /blogs/postBlogs
module.exports.postBlogs = async (req, res) => {
  const data = req.body;
  const blogs = new Blog(data);
  await blogs.save(); 

  let blog = [];
 await blog.push(blogs);
  res.json({
    code: 200,
    message: "Đã Thêm Blogs Mới Thành Công",
    blogs: blog
  })
}

// [get] /blogs/getBlogId/:id
module.exports.getBlogId = async (req, res) => {
 const id = req.params.id;
 const blog = await Blog.findOne({
    _id: id
 })
 if(blog){
  res.json({
    code: 200,
    blog: blog
  })
 }
 else {
  res.json({
    code: 400
  })
 }
  
}

// [patch] /blogs/patchBlogId/:id
module.exports.patchBlogId = async (req, res) => {
  const id = req.params.id;
  const blog = req.body;
  if(blog){
    const blogId = await Blog.updateOne({
    _id: id
  }, blog)

  res.json({
    code: 200,
    message: "Đã cập nhật thành công"
  })
  }
  else {
    res.json({
      code: 400
    })
  }
  
  
}

// [delete]  /blogs/delBlogId/:id
module.exports.delBlogId = async (req, res) => {
  const id = req.params.id;
  const result = await Blog.deleteOne({
    _id: id
  })
  res.json({
    code: 200, 
    message: "Xóa Thành Công"
  });
}
// [post] /getBlogs/category
module.exports.getBlogCate = async (req, res) => {
  const cate = req.body
  const result = await Blog.find({
    category: {
      $in: cate
    },
    deleted: false,
  })

  if(result){
    function truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    }

  for (let i = 0 ; i <  result.length ; i++){
    result[i].content = truncateText(result[i].content, 100);
  }

      res.json({
    code: 200,
    blog: result
  })
  }

}
