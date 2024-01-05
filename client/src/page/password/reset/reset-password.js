import { Button, Col, Form, Input, Modal, Row } from "antd";
import "../reset/reset-password.scss";
import { useState } from "react";
import { getCookie } from "../../../components/takeCookies/takeCookies";
import { deleteCookie, setCookie } from "../../../components/setTime/setTime";
import { resetPasswordPost } from "../../../service/post/post";
import "sweetalert2/src/sweetalert2.scss";
import { isValidPassword } from "../../../components/checkInformation/checkInformation";
import { Errorempty } from "../../../components/error/error";
import { useNavigate } from "react-router-dom";
function Resetpassword() {
  const navigate = useNavigate();
  const [checkPass, setCheckPass] = useState(true); // check để báo hiệu của pass
 const token_1 = getCookie("token_1");
  if(!token_1){
    window.history.back("/");
    return;
  }

const resetPassword = async (data) => {
  const result = await resetPasswordPost(data);
  return result
}

  const handleOnblur_2 = (e) => {
    if (isValidPassword(e.target.value) === false) {
      setCheckPass(false);
    } else {
      setCheckPass(true);
    }
  };

  const handleChange_2 = () => {
    setCheckPass(true);
  };

  const handleFinish = async (values) => {
    if(values.password !== values.confirmPassword){
      Modal.error({
        title: "Lỗi",
        content: "Mật Khẩu Không Trùng Khớp!"
      })
      return;
    }
    else {
      const valuesReset = {
        token: token_1,
        password: values.password,
        confirmPassword: values.confirmPassword
      }
      const result = await resetPassword(valuesReset);
      if(result.code === 400){
        Modal.error({
          title: "Lỗi",
          content: `${result.message}`
        })
      }
      else {
       Modal.success({
          title: 'Chào mừng bạn đã đăng nhập!',
          content: `${result.message}`,
          onOk() {
            setCookie("token", token_1, 15);
            deleteCookie("token_1");
            window.location.href = "/";
          },
        });

      }
    
    }
  };

  const handleFinishFailed = () => {
     Modal.error({
      title: "Lỗi",
      content:"Vui lòng điền đầy đủ dữ liệu"
     })
  };

  return (
    <>
    {token_1 && token_1.length !== 0 ? (<> <div className="resetPassword">
        <h1 className="resetPassword--top">Đặt lại mật khẩu!</h1>
        <hr />
        <Form
          className="resetPassword--form"
          autoComplete="off"
          requiredMark
          layout="vertical"
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
          wrapperCol={{ span: 24 }}
        >
          <Form.Item
            label="Mật Khẩu Mới"
            name="password"
            rules={[{required: true}]}
            validateStatus={!checkPass ? "error" : ""}
            help={!checkPass ? "Vui lòng nhập tối thiểu 8 kí tự, một chữ thường, 1 chữ hoa và 1 số" : ""}
          >
            <Input.Password onBlur={handleOnblur_2} onChange={handleChange_2} />
          </Form.Item>
          {/* Field */}
          <Form.Item
            label="Xác Nhận Mật Khẩu Mới"
            name="confirmPassword"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng nhập xác nhận mật khẩu",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp!"));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Row>
              <Col offset={10} span={4}>
                <Button
                  className="resetPassword--buttonSubmit"
                  type="primary"
                  htmlType="submit"
                >
                  Xác nhận
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div></>) : (Errorempty(navigate)) }
     
    </>
  );
}
export default Resetpassword;
