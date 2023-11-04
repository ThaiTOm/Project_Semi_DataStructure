import React, { useEffect, useState } from "react";
import {
  Button,
  Radio,
  Form,
  Input,
  Col,
  Row,
  Modal,
  AutoComplete,
  Checkbox,
  Space,
  Select,
} from "antd";
import "./address.scss";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { getUserstk } from "../../../service/getcategory/getCategory";
import { getCookie } from "../../../components/takeCookies/takeCookies";
import { postShipping } from "../../../service/post/post";

const Address = () => {
  const [form] = Form.useForm(); // Quản lí form
  const [open, setOpen] = useState(false); // set mở modal
  const [confirmLoading, setConfirmLoading] = useState(false); // bấm nút thì nó loading
  const [addresses, setAddresses] = useState([])  // địa chỉ mô phỏng
  const [submit, setSubmit] = useState([])  // gias tri sau khi submit
  const [data, setData] = useState([]); // dữ liệu của người đang đăng nhập
  const cookies = getCookie("token");  // lấy token từ cookie
  const postship = async () => {
    const result = await postShipping();
  }
  useEffect(() => {
    const fetchApick = async (e) => {
      const result = await getUserstk(e)  // lấy dữ liệu tài khoản của người đang đăng nhập 
     setData(result);
     console.log(result);
    }
    fetchApick(cookies);
   },[])

  const showModal = () => {  // bấm nút show modal
    setOpen(true);
  };

  const handleCancel = () => {    // bấm nút hủy show
    console.log("Clicked cancel button");
    setOpen(false);
   
  };

  const handleOk = () => {    // submit form
    form.submit();
  };

 
  const  handleSelect_1 = (e) => {  // chon dia chi 
   setSubmit({
    ...submit,
    address: e,
   })
  }

  const onAddressSearch = async (value) => {  // xem thông tin lúc người dùng nhập

    const YOUR_API_KEY = 'EAddPu1fx9SFE8rAE7Ogdp1rheIPEfrhiAB65nif'; // mã api key của goong map

    const apiUrl = `https://rsapi.goong.io/Place/AutoComplete?api_key=${YOUR_API_KEY}&input=${value}&more_compound=true`; // api bên ngoài truy cập dữ liệu map
  
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        return response.json();
      })
      .then((data) => {
        
        // Xử lý dữ liệu trả về từ Goong API ở đây
        const namesArray = data.predictions.map(item => item.description);
        console.log('Geocoding data:', namesArray);
        setAddresses(namesArray);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
     
    setSubmit({
      ...submit,
      address: value,
    })
    
    
  };

  const onFinish = (values) => {  // khi bấm tạo mới 
    setConfirmLoading(true);
    setTimeout(() => {
      setConfirmLoading(false);
      setOpen(false);
    }, 2000); // Giả định xử lý dữ liệu mất 2 giây
   
    setSubmit({
      ...submit,
      ...values
    })
    console.log("Received values:", ({
      ...submit,
      ...values
    }));

    postship({
      ...submit,
      ...values
    })
  
  };

  const handleSelect = (e) => {  // khi country bấm chọn
    setSubmit({
      ...submit,
      country: e,
    })
  }

  return (
    <>
      <div className="address">
        <div className="address--header">
          <h2>Địa chỉ của tôi</h2>
          <Button
            className="button"
            icon={<PlusOutlined />}
            onClick={showModal}
          >
            Thêm địa chỉ mới
          </Button>
        </div>
        <Modal
          title="Thêm địa chỉ mới"
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Trở lại
            </Button>,
            <Button
              key="submit"
              onClick={handleOk}
              type="primary"
              loading={confirmLoading}
              
            >
              Tạo mới
            </Button>,
          ]}
        >
          <div className="address--form">
            <Form
            
              form={form}
              preserve={false}
              name="basic"
              onFinish={onFinish}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item  
                label="Họ tên"
                name="fullName"
                rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
              >
                <Input placeholder="Mời bạn nhập họ tên"  />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                ]}
              >
                <Input placeholder="Mời bạn nhập số điện thoại" />
              </Form.Item>

              <Form.Item label="Địa chỉ">
             
                <AutoComplete
                onSelect={handleSelect_1}
                  options={
                    addresses && addresses.map((item) => ({
                    label: item,
                    value: item,
                  }))
                  }
                  placeholder="mời bạn nhập địa chỉ"
                  onSearch={onAddressSearch}
                ></AutoComplete>
               
              </Form.Item>

              <Form.Item label="Quốc gia">
                <Select
              
      style={{
        width: 120,
      }}
      onSelect={handleSelect}
      options={[
        {
          value: 'Việt Nam',
          label: 'Việt Nam',
        },
        {
          value: 'Thái Lan',
          label: 'Thái Lan',
        },
        {
          value: 'Trung Quốc',
          label: 'Trung Quốc',
        },
       
      ]}
                />
              </Form.Item>

              <Form.Item name="defaultAddress" valuePropName="checked">
                <Checkbox>Đặt làm địa chỉ mặc định</Checkbox>
              </Form.Item>
             
            </Form>
          </div>
        </Modal>
        <div className="address--content">
          <hr />
          <h1>Địa chỉ</h1>
          <div className="address--item">
            <div className="address--item__infor">
              <h3>
                Họ và tên: <b></b>
              </h3>
              <p className="address--item__p1">
                Địa chỉ:<b></b>
              </p>
              <p className="address--item__p2">
                Số điện thoại:<b></b>
              </p>
            </div>
            <div className="address--item__button">
              <Row gutter={[6, 6]}>
                <Col span={24}>
                  <Button type="primary" block>
                    Cập nhật
                  </Button>
                </Col>
                <Col span={24}>
                  <Button type="primary" block>
                    Thiết lập mặc định
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Address;
