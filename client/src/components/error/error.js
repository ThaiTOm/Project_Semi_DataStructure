import { Button, Result } from "antd";


const Error = (infor, navigate) => {
  

  return (
    <> <Result
    status="404"
    title="Lỗi"
    subTitle={`Vui Lòng Đăng Nhập Tài Khoản Để ${infor}`}
    extra={<Button onClick={() => {navigate("/")}} type="primary">Back Home</Button>}
  />
  
  </>
  )
}
export default Error;