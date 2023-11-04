import { Breadcrumb, Button, Col, Form, Input, Row } from "antd";
import { defaultConfig } from "antd/es/theme/context";
import "./contact.scss";
import { Link } from "react-router-dom";
import position from "../../image/position.png"
import email from "../../image/email.png"
import telephone from "../../image/telephone.png"
function Contact() {
  const handleSubmit = (values) => {
    console.log(values);
  };
  const onFinishFailed = (values) => {
    console.log(values);
  };
  return (
    <>
      <div className="contact--bread">
        {" "}
        <Breadcrumb
          items={[
            {
              title: <Link to="/">Trang chủ</Link>,
            },

            {
              title: "Liên hệ",
            },
          ]}
        />
      </div>

      <div className="contact">
        <Row>
          <Col lg={12} sm={24}>
            <h1 className="contact--name">3Tstore</h1>
            <div className="contact--qc">
              <div className="contact--address contact--chunginfor">
                <img
                  src={position}
                  alt="diachi"
                />
                <p>
                  <b>Địa chỉ:</b> 93 Hồ Văn Huê, Phú Nhuận{" "}
                </p>
              </div>
              <div className="contact--number contact--chunginfor">
                <img
                  src={telephone}
                  alt="sdt"
                />
                <p>
                  <b>Số điện thoại:</b> 0399038165
                </p>
              </div>
              <div className="contact--email contact--chunginfor">
                <img
                  src={email}
                  alt="email"
                />
                <p>
                  <b>Email:</b> sonthanh@gmail.com
                </p>
              </div>
              <hr className="contact--hr" />
              <h1 className="contact--form__h1">Liên hệ với chúng tôi</h1>
              <p className="contact--form__p">
                Chúng tôi rất vui khi bạn liên hệ với chúng tôi. Hãy điền thông
                tin vào biểu mẫu bên dưới và chúng tôi sẽ phản hồi bạn sớm nhất
                có thể.
              </p>
              <div className="contact--form">
                <Form
                  name="information-contact"
                  onFinish={handleSubmit}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item className="contact--form__item" name="name">
                    <Input placeholder="Họ tên" />
                  </Form.Item>
                  <Form.Item name={"email"} className="contact--form__item">
                    <Input placeholder="Email" type="email" required />
                  </Form.Item>
                  <Form.Item
                    name={"numberphone"}
                    className="contact--form__item"
                  >
                    <Input placeholder="Số điện thoại" type="number" required />
                  </Form.Item>

                  <Form.Item className="contact--form__item" name={"content"}>
                    <Input.TextArea
                      placeholder="Nhập nội dung"
                      style={{
                        height: 100,
                      }}
                    ></Input.TextArea>
                  </Form.Item>

                  <Form.Item>
                    <Button  htmlType="submit" className="contact--form__button">
                      Gửi liên hệ
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Col>
          <Col lg={12} sm={24}>
            <div className="contact--map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0935222155426!2d106.67477847481852!3d10.804148889346346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528d889986667%3A0xf67a8e4ed2b9989a!2zOTMgSOG7kyBWxINuIEH1w6osIFBoxrDhu51uZyA5LCBQaMO6IE5odeG6rW4sIFRow6BuaCBwaOG7kSBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1698375221696!5m2!1svi!2s"
                width="600"
                height="600"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default Contact;