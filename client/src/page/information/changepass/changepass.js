import { useState } from "react";
import { getCookie } from "../../../components/takeCookies/takeCookies";
import { Form, Input, Button, Modal } from "antd";
import { patchChangePass } from "../../../service/patch/patch";
import "./changepass.scss";
import { isValidPassword } from "../../../components/checkInformation/checkInformation";
function Changepass() {
  const cookies = getCookie("token");
  const [form] = Form.useForm();
  const [data_2, setData_2] = useState(true);
  const changePass = async (values, token) => {
    const result = await patchChangePass(values, token);
    return result;
  };

  const handleOnblur_2 = (e) => {
    if (isValidPassword(e.target.value) === false) {
      setData_2(false);
    } else {
      setData_2(true);
    }
  };
  const handleChange_2 = () => {
    setData_2(true);
  };


  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
   
  if(Object.keys(values).length === 3){
 const data = await changePass(values, cookies); 
    if(data.code === 400){
      Modal.error({
        title: "Lỗi",
        content: `${data.message}`,
        
      })
    }else {
      Modal.success({
        title: "Thành Công",
        content: `${data.message}`
      })
      form.resetFields();
    }
  }
  else {
    Modal.error({
      title: "Lỗi",
      content: "Vui lòng nhập đầy đủ không tin"
    })
  }

  };

  const onFinishFailed = (errorInfo) => {
    Modal.error({
      title: "Lỗi",
      content: "Vui lòng kiểm tra lại thông tin"
    })
  };

  return (
    <>
    <div className="pass">
        <h2>Đổi mật khẩu</h2>
        <hr />
        <Form
          form={form}
          name="change-password"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          
        >
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
          >
            <Input.Password style={{ width: "450px" }} />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[{ required: true}]}
            validateStatus={!data_2 ? "error" : ""}
                help={
                  !data_2
                    ? "Vui lòng nhập tối thiểu 8 kí tự, một chữ thường, 1 chữ hoa và 1 số"
                    : ""
                }
          >
            <Input.Password
              style={{ width: "450px" }}
              onBlur={handleOnblur_2}
              onChange={handleChange_2}
            />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="confirmNewPassword"
            dependencies={["newPassword"]}
            hasFeedback
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu xác nhận không khớp!");
                },
              }),
            ]}
          >
            <Input.Password style={{ width: "450px" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đổi mật khẩu
            </Button>
          </Form.Item>
        </Form>
      </div>
     
    </>
  );
}
export default Changepass;
