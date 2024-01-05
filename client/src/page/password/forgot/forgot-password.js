import { Button, Col, Form, Input, Modal, Row } from "antd";
import "../forgot/forgot-password.scss"
import { useNavigate } from "react-router-dom";
import { ForgotPasswordPost } from "../../../service/post/post";
import { getCookie } from "../../../components/takeCookies/takeCookies";
function Forgotpassword() {
  const navigate = useNavigate();
  const token = getCookie("token");
  if(token){
    navigate("/");
  }

const ForgotPost = async (data) => {
  const result = await ForgotPasswordPost(data);
  return result;
}

const handleFinish = async (value) => {
  const result = await ForgotPost(value);
if(result.code === 400) {
  Modal.error({
    title: "Lỗi",
    content: `${result.message}`
  })
}
else {
    navigate(`/password/otp?username=${value.username}`);
}
}

const handleFinishFailed = () => {
  Modal.error({
    title: "Lỗi",
    content: "Vui lòng nhập username!"
  })
}

const handleCancel = () => {
navigate("/login")
}
  return (
    <>
      <div className="forgotPassword">
      <h1 className="forgotPassword--top">
        Tìm kiếm tài khoản
      </h1>
      <hr/>
      <p className="forgotPassword--content">
        Vui lòng nhập Username của bạn!
      </p>
        <Form
          className="forgotPassword--form"
          autoComplete="off"
          requiredMark
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
          wrapperCol={{span: 24}}
        >
       <Form.Item name="username" rules={[{ required: true, message: 'Vui lòng nhập username' }]}>
        <Input className="forgotPassword--input" placeholder="Vui lòng nhập username" />
       </Form.Item>
       
       <Form.Item>
       <Row>
        <Col offset={15} span={4}>
                 <Button className="forgotPassword--buttonCancel" onClick={handleCancel} >
          Hủy bỏ
          </Button>
        </Col>
        <Col span={4}>
          
          <Button className="forgotPassword--buttonSubmit" type="primary" htmlType="submit">
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
export default Forgotpassword;
