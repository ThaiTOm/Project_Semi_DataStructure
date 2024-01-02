import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "../../layout/layoutDefault/responsiveContainer.scss";
import "sweetalert2/src/sweetalert2.scss";
import "./register.scss";
import { getCookie } from "../../components/takeCookies/takeCookies";
import { Link, useNavigate } from "react-router-dom";
import {
  postCart,
  postUserRegister,
} from "../../service/post/post";
import { Button, Form, Input, Modal } from "antd";
import { Errorempty } from "../../components/error/error";
import {
  isValidPassword,
  isValidUsername,
} from "../../components/checkInformation/checkInformation";
import { setCookie } from "../../components/setTime/setTime";
function Register() {
  const inputRef = useRef();
  const cookie = getCookie("token");
  const navigate = useNavigate();
  const [data_1, setData_1] = useState(true); // check để báo hiệu của username
  const [data_2, setData_2] = useState(true); // check để báo hiệu của pass

  // Sử dụng hàm kiểm tra

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus(); // focus tự động khi truy cập trang
    }
  }, []);

  const checkRegister = async (values) => {
    const result = await postUserRegister(values);
    return result;
  };

  const addCart = async (e) => {
    try {
      await postCart(e); // Gọi hàm postCart với tham số là data
    } catch (error) {
      console.error("Error while posting cart:", error);
      // Xử lý lỗi nếu có, có thể log ra console hoặc thực hiện các hành động khác
    }
  };

  // hàm bấm ra ngoài thì check giá trị đó đúng hay chưa
  const handleOnblur_1 = (e) => {
    if (isValidUsername(e.target.value) === false) {
      setData_1(false);
    } else {
      setData_1(true);
    }
  };
  const handleOnblur_2 = (e) => {
    if (isValidPassword(e.target.value) === false) {
      setData_2(false);
    } else {
      setData_2(true);
    }
  };
  // hàm bấm ra ngoài thì giá trị đó hay sai?

  const onFinish = async (values) => {
    // check và xác nhận sau khi bấm bút
    const result = await checkRegister(values);
    if (result.code === 400) {
      Modal.error({
        title: "Lỗi",
        content: `${result.message}`,
      });
    } else {
      addCart({
        user: result.user,
        product: [],
      });
      Swal.fire({
        icon: "success", // Sử dụng icon "success" cho thông báo thành công
        title: "Đăng kí thành công",
        text: "Chào mừng bạn đến với 3Tstore!",
      }).then((ketqua) => {
        // Đoạn mã được thực thi khi người dùng ấn nút OK trong thông báo
        if (ketqua.isConfirmed) {
          setCookie("token", result.token, 1);
          window.location.href = "/";
        }
      });
    }
  };

  const onFinishFailed = (e) => {
    Modal.warning({
      title: "Cảnh báo",
      content: "Vui Lòng Nhập Đầy Đủ Thông Tin",
    });
  };

  // nhập thì không báo lỗi

  const handleChange_1 = () => {
    setData_1(true);
  };
  const handleChange_2 = () => {
    setData_2(true);
  };

  // nhập thì không báo lỗi

  return (
    <>
      {cookie.length === 0 ? (
        <Form
          layout="vertical"
          name="register"
          className="register--form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{ span: 16 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
        >
          <div className="container">
            <div className="register">
              <h3 className="register--heading"> Đăng ký </h3>
              <p className="register--login">
                Bạn đã có tài khoản? <Link to="/login">Đăng nhập tại đây</Link>
              </p>
              <Form.Item
                label="Username"
                name="username"
                validateStatus={!data_1 ? "error" : ""}
                help={
                  !data_1
                    ? "Username phải có ít nhất 8 ký tự và chỉ chứa chữ cái, số, gạch dưới và dấu gạch ngang."
                    : ""
                }
                rules={[{ required: true }]}
              >
                <Input
                  ref={inputRef}
                  onBlur={handleOnblur_1}
                  onChange={handleChange_1}
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true }]}
                validateStatus={!data_2 ? "error" : ""}
                help={
                  !data_2
                    ? "Vui lòng nhập tối thiểu 8 kí tự, một chữ thường, 1 chữ hoa và 1 số"
                    : ""
                }
              >
                <Input.Password
                  onBlur={handleOnblur_2}
                  onChange={handleChange_2}
                />
              </Form.Item>
              <Form.Item
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Vui lòng xác nhận mật khẩu" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu không khớp"));
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="
        register--submit"
                >
                  Đăng Ký
                </Button>
              </Form.Item>
            </div>
          </div>
        </Form>
      ) : (
        Errorempty(navigate)
      )}
    </>
  );
}
export default Register;
