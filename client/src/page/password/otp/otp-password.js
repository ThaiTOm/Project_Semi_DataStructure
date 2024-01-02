import { Button, Col, Form, Input, InputNumber, Modal, Row } from "antd";
import { useEffect, useState } from "react";
import { getEmail } from "../../../service/getcategory/getCategory";
import "../otp/otp-password.scss";
import { useNavigate } from "react-router-dom";
import { OtpPasswordPost } from "../../../service/post/post";
import { setCookie } from "../../../components/setTime/setTime"
import { getCookie } from "../../../components/takeCookies/takeCookies";
function Otppassword() {
  const [email, setEmail] = useState([]);
  const username = window.location.search.split("=")[1];
  const navigate = useNavigate();
  const token = getCookie("token");


  if(token){
    navigate("/");
  }

const otpPost = async(data) => {
  const result = await OtpPasswordPost(data);
  return result;
}

  const Email = async (username) => {
    const result = await getEmail(username);
    if (result.code === 400) {
      Modal.error({
        title: "Lỗi",
        content: result.email.message,
      });
    } else {
      setEmail(result.email.email);
    }
  };

  useEffect(() => {
    Email(username);
  }, []);


  const handleFinish = async (values) => {
  const result = await  otpPost({
      otp: values.otp,
      username: username,
      email: email
    })
    if (result.code === 400){
      Modal.error({
        title: "Lỗi",
        content: `${result.message}`
      })
    }
    else {
      setCookie("token_1", result.token, 1);
      navigate(`/password/reset`);
    }
  };

  const handleFinishFailed = () => {
    Modal.error({
      title: "Lỗi",
      content: "Vui lòng nhập OTP!",
    });
  };

  const handleCancel = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="otpPassword">
        <h1 className="otpPassword--top">Nhập Mã OTP!</h1>
        <hr />
        <p className="otpPassword--content">
          Mã đã được gửi qua Email: <b>{email}</b>
        </p>
        <Form
          className="otpPassword--form"
          autoComplete="off"
          requiredMark
          layout="vertical"
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
          wrapperCol={{ span: 24 }}
        >
          <Form.Item
            label="Mã OTP"
            name="otp"
            rules={[{ required: true, message: "Vui lòng nhập mã OTP" }]}
          >
            <Input
              style={{
                width: "100%",
              }}
              className="otpPassword--input"
              placeholder="Vui lòng nhập mã OTP"
            />
          </Form.Item>

          <Form.Item>
            <Row>
              <Col offset={15} span={4}>
                <Button
                  className="otpPassword--buttonCancel"
                  onClick={handleCancel}
                >
                  Hủy bỏ
                </Button>
              </Col>
              <Col span={4}>
                <Button
                  className="otpPassword--buttonSubmit"
                  type="primary"
                  htmlType="submit"
                >
                  Xác nhận
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
export default Otppassword;
