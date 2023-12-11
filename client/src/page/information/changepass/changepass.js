import { useEffect, useState } from "react";
import { getCookie } from "../../../components/takeCookies/takeCookies";
import { Form, Input, Button, message } from "antd";
import { getUserstk } from "../../../service/getcategory/getCategory";
import { patchUser } from "../../../service/patch/patch";
import "./changepass.scss";
function Changepass() {
  const cookies = getCookie("token");
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [data_2, setData_2] = useState(true);
  function isValidPassword(password) {
    // yêu cầu tối thiểu 8 ký tự, ít nhất một chữ cái viết hoa, chữ cái viết thường và một chữ số
    const lengthRequirement = password.length >= 8;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;

    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasDigit = digitRegex.test(password);

    return lengthRequirement && hasUppercase && hasLowercase && hasDigit;
  }
  const handleOnblur_2 = (e) => {
    if (isValidPassword(e.target.value) == false) {
      setData_2(false);
    } else {
      setData_2(true);
    }
  };
  const handleChange_2 = () => {
    setData_2(true);
  };
  useEffect(() => {
    const fetchApick = async (e) => {
      try {
        const result = await getUserstk(e); // lấy dữ liệu tài khoản của người đang đăng nhập
        setData(result);
        console.log(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchApick(cookies); // lấy thông tin user từ cookie
  }, []);
  const patchPass = async (e) => {
    const result = await patchUser(e);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    //  if (data.password == )
    if (
      values.oldPassword == data[0].password &&
      isValidPassword(values.newPassword) &&
      values.newPassword == data[0].confirmNewPassword
    ) {
      patchPass({
        id: data[0].id,
        password: values.newPassword,
      });
    } else {
      message.error({
        content: "Đổi mật khẩu không thành công",
        className: "custom-class",
        style: {
          marginTop: "5vh",
          padding: "5vh",
        },
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
            rules={[{ required: true, message: "" }]}
          >
            <Input.Password
              style={{ width: "450px" }}
              onBlur={handleOnblur_2}
              onChange={handleChange_2}
            />
          </Form.Item>
          <span className={data_2 ? "handleNotice" : "span"} id="notice">
            Vui lòng nhập tối thiểu 8 kí tự, một chữ thường, 1 chữ hoa và 1 số{" "}
          </span>
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
