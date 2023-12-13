import { Button, Result } from "antd";


export const Error = (infor, navigate) => {
  

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

export const Errorempty = (navigate) => {
  

  return (
    <> <Result
    status="404"
    title="Lỗi"
    subTitle={`Không Có Dữ Liệu. Vui Lòng Quay Lại Trang Chủ!!`}
    extra={<Button onClick={() => {navigate("/")}} type="primary">Back Home</Button>}
  />
  
  </>
  )
}
