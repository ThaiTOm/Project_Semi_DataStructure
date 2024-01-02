import {  Button, Col, Form, Input, Radio, Row } from "antd";
import "./thongtinkh.scss";
import { useEffect, useState } from "react";
import { postInforExist } from "../../../service/post/post";
import { getCookie } from "../../../components/takeCookies/takeCookies";
import {
  getMyInfor,
} from "../../../service/getcategory/getCategory";
import { patchInforV1 } from "../../../service/patch/patch";
import HinhAnh from "../../../components/avatar/avatar";
import Swal from "sweetalert2";
import { checkVietnamesePhoneNumber } from "../../../components/checkInformation/checkInformation";

const layout = {
  // chỉnh lại layout cho đẹp
  // style lay out
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const tailLayout = {
  // chỉnh layout
  //style
  wrapperCol: { offset: 8, span: 16 },
};

function Thongtinkh() {
  const [form] = Form.useForm();
  const [editing, setEditing] = useState(true);
  const [myData, setMyData] = useState([]); // dữ liệu thông tin cá nhận của người đang đăng nhập
  const cookies = getCookie("token"); // lấy token từ cookie


  const patchInfor = async (values, token) => {
    // cập nhật thông tin người dùng
    const result = await patchInforV1(values, token);
    myInfor(cookies);
  };


  // lấy dữ liệu tài khoản của người đang đăng nhập

  const myInfor = async (e) => {
    // hàm lấy thông tin người đang đăng nhập
    const result = await getMyInfor(e);
    setMyData(result);
  };

  const inforExist = async (e, token) => {
    // hàm lấy thông tin người đang đăng nhập
    const result = await postInforExist(e, token);
    return result;
  };

  useEffect(() => {
    myInfor(cookies);
  }, []);


  const handleClick = () => {
    // sau khi click nút chỉnh sửa thì form tự động mở
    setEditing(!editing);
  };


  useEffect(() => {
    // cập nhật dữ liệu trên form thanh input
    if (myData !== undefined && myData) {
      form.setFieldsValue({
        // cập nhật dữ liệu trên thanh input
        fullName: myData.fullName,
        email: myData.email,
        phoneNumber: myData.phoneNumber,
        gender: myData.gender,
        // Cập nhật các trường cần thiết
      });
    } else if (myData === undefined || myData.length === 0) {
      form.setFieldsValue({
        // cập nhật dữ liệu trên thanh input
        fullName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        // Cập nhật các trường cần thiết
      });
    }
  }, [myData]);

  const onFinish = async (values) => {
    const checkExist = await inforExist(
      {
        email: values.email,
        phoneNumber: values.phoneNumber,
      },
      cookies
    );

    if(checkVietnamesePhoneNumber(values.phoneNumber) === "block") {
      if(checkExist.code === 400){
        Swal.fire({
          icon: "error",
          title: "Cập nhật thất bại",
          text: "Thông tin cá nhân đã bị trùng. Vui lòng thử lại!!",
          showConfirmButton: false,
          timer: 2000, // Thời gian hiển thị thông báo, tính theo milliseconds
        });
      }
 else {
          setEditing(true);
          patchInfor({
            fullName: values.fullName,
            email: values.email,
            phoneNumber: values.phoneNumber,
            gender: values.gender
          }, cookies)
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

  const onFinishFailed = (errorInfo) => {
    // nếu có lỗi khi bấm tạo mới
    Swal.fire({
      icon: "error", // Icon của thông báo (có thể là 'error', 'warning', 'success', ...)
      title: "Cập Nhật Thất Bại",
      text: "Vui Lòng Nhập Đúng Yêu Cầu!.",
      // Các tùy chọn khác nếu cần
    });
  };

  return (
    // xuất ra màn hình
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
          encType="multipart/form-data"
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
          className="thongtin--form__avatar"
          name="avatar"
          >
          <HinhAnh />
          </Form.Item>
            <Form.Item
              label="Tên"
              name="fullName"
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
              className="thongtin--form__email"
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
              name="phoneNumber"
              className="thongtin--form__phoneNumber"
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
              className="thongtin--form__gender"
              rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
              initialValue="male"
            >
              <Radio.Group>
                <Radio value="male">Nam</Radio>
                <Radio value="female">Nữ</Radio>
                <Radio value="other">Khác</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item {...tailLayout} className="thongtin--form__updateButton">
            
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
          </Row>
        </div>
      </div>
    </>
  );
}
export default Thongtinkh;
