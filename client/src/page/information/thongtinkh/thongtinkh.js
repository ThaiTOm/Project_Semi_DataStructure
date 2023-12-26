import { Button, Col, Form, Input, Radio, Row } from "antd";
import "./thongtinkh.scss";
import { useEffect, useState } from "react";
import { postInfor } from "../../../service/post/post";
import { getCookie } from "../../../components/takeCookies/takeCookies";
import {
  getInfor,
  getInforid,
  getUserstk,
} from "../../../service/getcategory/getCategory";
import { patchInfor } from "../../../service/patch/patch";

import Swal from "sweetalert2";
import { delInfor } from "../../../service/delete/delete";
import { checkVietnamesePhoneNumber } from "../../../components/checkInformation/checkInformation";

function Thongtinkh() {
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(true);
  const [data, setData] = useState([]); // dữ liệu của người đang đăng nhập
  const [data_1, setData_1] = useState([]); // dữ liệu thông tin cá nhận của người đang đăng nhập
  const [data_2, setData_2] = useState([]); // dữ liệu thông tin cá nhân của tất cả  mọi người đã đăg nhập và cung cấp thông tin

  const cookies = getCookie("token"); // lấy token từ cookie

  const posttt = async (e) => { // thêm thông tin người dùng
    const result = postInfor(e);
    setData_1(result);
  };

  const patchhh = async (e) => { // cập nhật thông tin người dùng
    const result = patchInfor(e, data_1);
    setData_1(result);
  };

  const delUserId = async (e) => { // xóa thông tin người dùng
    const result = await delInfor(e);
    setData_1(result);
  };

// lấy dữ liệu tài khoản của người đang đăng nhập
  useEffect(() => {
    const fetchApick = async (e) => {
      const result = await getUserstk(e); 
      setData(result);
      fetchId(result[0].id);
    };
    fetchApick(cookies);
  }, []);

  const handleClick = () => { // sau khi click nút chỉnh sửa thì form tự động mở
    setEditing(!editing);
  };

  const handleClickDelete = () => { // hàm xóa thông tin
    setEditing(true);
    if (data_1[0] !== undefined) {
      delUserId(data_1[0].id);
    } else {
      Swal.fire({
        icon: "error",
        title: "Xóa thông tin không thành công",
        text: "Vui lòng cập nhật thông tin",
      });
    }
  };

  useEffect(() => {  // hàm lấy thông tin tất cả mọi người
    if (data && data.length > 0) {
      const fetchApi = async () => {
        const result = await getInfor();
        setData_2(result); //lấy dữ liệu information của tất cả mọi người
      };
      fetchApi();
    }
  }, [data_1]);

  const fetchId = async (e) => {  // hàm lấy thông tin người đang đăng nhập
    const result = await getInforid(e);
    setData_1(result);
  };

  useEffect(() => { 
    if (data && data[0] && data[0].id) fetchId(data[0].id);
  }, [editing]);
 

  useEffect(() => {  // cập nhật dữ liệu trên form thanh input
    if (data_1 !== undefined && data_1[0]) {
      form.setFieldsValue({
        // cập nhật dữ liệu trên thanh input
        name: data_1[0].name,
        email: data_1[0].email,
        phone: data_1[0].phone,
        gender: data_1[0].gender,
        // Cập nhật các trường cần thiết
      });
    } else if (data_1 === undefined || data_1.length === 0) {
      form.setFieldsValue({
        // cập nhật dữ liệu trên thanh input
        name: "",
        email: "",
        phone: "",
        gender: "",
        // Cập nhật các trường cần thiết
      });
    }
  }, [data_1]);

  const layout = {  // chỉnh lại layout cho đẹp
    // style lay out
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };

  const tailLayout = { // chỉnh layout
    //style
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values) => {  // nhấn nút tạo mới ( cập nhật )
    // hàm submit
    // nếu trong dữ liệu data_2 chưa có thằng hiện tại thì check qua hết
    // nếu có dữ liệu trong data_2 rồi thì bỏ nó qua một bên lướt mấy thằng còn lại
if(checkVietnamesePhoneNumber(values.phone) === "block") {
  if (data_1[0] === undefined) {

    posttt({
      ...values,
      userId: data[0].id,
    });
    setEditing(true);
  } else {
    const filterPost = data_2.filter((item) => {
      return item.userId !== data_1[0].userId; // item chỉ lướt qua những thằng đăng nhập thôi còn thằng khác thì vẫn lụm
    });
    const checkPost = filterPost.some((x) => {
      return x.email === values.email && x.phone === values.phone;
    });

    console.log("Received values:", values);

    if (checkPost === true) {
      Swal.fire({
        icon: "error",
        title: "Cập nhật thất bại",
        text: "Không thể cập nhật thông tin. Vui lòng thử lại.",
        showConfirmButton: false,
        timer: 2000, // Thời gian hiển thị thông báo, tính theo milliseconds
        color: "#716add",
        background:
          "#fff url(https://addons-media.operacdn.com/media/themes/50/266250/1.0-rev1/animations/video_preview.webm)",
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `,
      });
    } else {
      setEditing(true);

      patchhh({
        ...values,
        userId: data[0].id,
      });
    }
  }
}
else {
  Swal.fire({
    icon: 'error', // Icon của thông báo (có thể là 'error', 'warning', 'success', ...)
    title: 'Cập Nhật Thất Bại',
    text: 'Vui Lòng Nhập Thông Tin Đúng Định Dạng.',
    // Các tùy chọn khác nếu cần
  });
}

   
  };

  const onFinishFailed = (errorInfo) => {  // nếu có lỗi khi bấm tạo mới
    console.log("Failed:", errorInfo);
  };

  return (   // xuất ra màn hình
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
            disabled={editing}
            autoComplete="off"
          >
            <Form.Item
              label="Tên"
              name="name"
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
              <Input />
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
              <Input />
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
                  message: "Số điện thoại chỉ được chứa số!",
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

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Cập Nhật
              </Button>
            </Form.Item>
          </Form>
          <Row>
            <Col span={16}>
              <Button
                className="thongtin--chinhsua"
                onClick={handleClick}
                type="primary"
              >
                {editing === true ? "Chỉnh sửa" : "Đóng"}
              </Button>
            </Col>
            <Col span={8}>
              <Button
                className="thongtin--xoa"
                onClick={handleClickDelete}
                type="primary"
              >
                Xóa thông tin
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
export default Thongtinkh;
