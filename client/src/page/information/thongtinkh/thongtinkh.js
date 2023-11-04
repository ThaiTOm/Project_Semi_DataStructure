import { Alert, Button, Col, DatePicker, Form, Input, Radio, Row } from "antd";
import "./thongtinkh.scss";
import { useEffect, useState } from "react";
import { postInfor } from "../../../service/post/post";
import { getCookie } from "../../../components/takeCookies/takeCookies";
import { getInfor, getUserstk } from "../../../service/getcategory/getCategory";
import { patchInfor } from "../../../service/patch/patch";
import moment from 'moment';
import Swal from 'sweetalert2';
import { delInfor } from "../../../service/delete/delete";
function Thongtinkh() {
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(true);
 const [render , setRender] = useState(true);
 const [data, setData] = useState([]); // dữ liệu của người đang đăng nhập
 const [data_1, setData_1] = useState([]); // dữ liệu thông tin cá nhận của người đang đăng nhập
 const [data_2, setData_2] = useState([]);  // dữ liệu thông tin cá nhân của tất cả  mọi người đã đăg nhập và cung cấp thông tin
 const cookies = getCookie("token");  // lấy token từ cookie
console.log(cookies);

 useEffect(() => {
  const fetchApick = async (e) => {
    const result = await getUserstk(e)  // lấy dữ liệu tài khoản của người đang đăng nhập 
   setData(result);
   console.log(result);
  }
  fetchApick(cookies);
 },[])

//  const clientId = 'efde87b11bc65cb';
  const handleClick = () => {
    setEditing(false);   // sau khi click nút chỉnh sửa thì form tự động mở 
  };
  
  const handleClick_1 = () => {
    const delUserId = async (e) => {
      const result = await delInfor(e)
    }
    if (data_1 && data_1[0]){
       delUserId(data_1[0].id);
          setRender(!render);
    }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Xóa thông tin không thành công',
          text: 'Vui lòng cập nhật thông tin',
         
        })
      }
  }

  useEffect(() => {
    if (data && data.length > 0) {
      const fetchApi = async () => {
        const result = await getInfor();
           setData_2(result);   //lấy dữ liệu information của tất cả mọi người
        const datanow = result.filter(item => {
          return item.userId == data[0].id;
        })
       setData_1(datanow) // lấy dữ liệu của người đang đăng nhập
    }
    fetchApi();
  }}, [data]);

  
  useEffect(() => {
    if (data_1 && data_1[0]) {
      const formattedBirthday = moment(data_1[0].birthday).format("YYYY-MM-DD");
     
      console.log(formattedBirthday);
      form.setFieldsValue({   // cập nhật dữ liệu trên thanh input
        name: data_1[0].name,
        email: data_1[0].email,
        phone: data_1[0].phone,
        gender: data_1[0].gender,
      
        // Cập nhật các trường cần thiết
      });
    }
  }, [data_1, form]);

  const layout = {   // style lay out
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };

  const tailLayout = {  //style
    wrapperCol: { offset: 8, span: 16 },
  };

  const maxDob = moment().subtract(14, 'years'); // cho trẻ em đủ 14 tủi

  const disabledDate = (current) => {
    return current && current > maxDob;  // check đủ 14 tủi mới bấm đc
  };
  
  const onFinish = (values) => {  // hàm submit
    // nếu trong dữ liệu data_2 chưa có thằng hiện tại thì check qua hết 
    // nếu có dữ liệu trong data_2 rồi thì bỏ nó qua một bên lướt mấy thằng còn lại
const filterPost = data_2.filter(item => {
  return item.id != data_1[0].id  // item chỉ lướt qua những thằng đăng nhập thôi còn thằng khác thì vẫn lụm
})
     const checkPost = filterPost.some(x => {
      return x.email == values.email && x.phone == values.phone
     })
     console.log(checkPost);
    console.log("Received values:", values);

    
   

    if (checkPost == true) {
      Swal.fire({
        icon: 'error',
        title: 'Cập nhật thất bại',
        text: 'Không thể cập nhật thông tin. Vui lòng thử lại.',
        showConfirmButton: false,
        timer: 2000, // Thời gian hiển thị thông báo, tính theo milliseconds
        color: '#716add',
        background: '#fff url(https://addons-media.operacdn.com/media/themes/50/266250/1.0-rev1/animations/video_preview.webm)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      });
    }
    else {
      setEditing(true);
    // Gửi dữ liệu đến server hoặc xử lý tại đây
    const posttt = async (e) => {
      const result = postInfor(e);
    }

    const patchhh = async (e) => {
      const result = patchInfor(e);
    }
  
    if (data_1.length > 0) { // nếu đã có dữ liệu thông tin của người đang đăng nhập
       patchhh({
      ...values,
      id: data[0].id
    })
    }
    else {  // nếu chưa
    posttt({
      ...values,
      userId: data[0].id
    })
  }
}
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
console.log(data_1[0]);

  return (
    <>
    {} 
      <div className="thongtin">
        <div className="thongtin--header">
          <h1>Thông Tin Của Tôi</h1>
          <p>Thêm thông tin để tăng cường bảo mật</p>
          <hr />
        </div>
        <div className="thongtin--content">
          <Form
            className="thongtin--form"
            form={form}
            layout="vertical"
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            disabled = {editing}
          >
            <Form.Item
              label="Tên"
              name="name"
              initialValue={data_1 && data_1[0] && data_1[0].name ? data_1[0].name : ''}
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên!",
                },
                {
                  pattern: new RegExp("[A-Za-zÀ-ÖØ-öø-ÿs]+"),
                  message: "Tên chỉ được chứa ký tự chữ cái và khoảng trắng",
                },
              ]}
            >
             <Input   initialValue={data_1 && data_1[0] && data_1[0].name ? data_1[0].name : ''} />

            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ email!",
                },
                {
                  type: "email",
                  message: "Vui lòng nhập địa chỉ email hợp lệ!",
                },
              ]}
            >
              <Input  />
             
            </Form.Item>
           

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                
                  required: true,
                  message: "Vui lòng nhập số điện thoại!",
                },
                {
      pattern: /^[0-9]*$/,
      message: 'Số điện thoại chỉ được chứa số!',
    },
                  
                
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Giới tính"
              name="gender"
              rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
              initialValue="male"
            >
              <Radio.Group>
                <Radio value="male">Nam</Radio>
                <Radio value="female">Nữ</Radio>
                <Radio value="other">Khác</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item
  label="Ngày sinh"
  name="birthday"
  rules={[
    { required: true, message: 'Vui lòng chọn ngày sinh!' },
    
  ]}
>
  <DatePicker disabledDate={disabledDate} />
</Form.Item>


            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Cập Nhật
              </Button>
            </Form.Item>
          </Form>
          <Row>
            <Col>
               <Button onClick={handleClick} type="primary">
              chỉnh sửa
             </Button>
            </Col>
            <Col>
              <Button onClick={handleClick_1} type="primary">Xóa thông tin</Button>
            </Col>
          </Row>
         
        </div>
      </div>
    </>
  );
}
export default Thongtinkh;
