import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  AutoComplete,
  Space,
  Row,
  Col,
} from "antd";
import { getCategory } from "../../../service/getcategory/getCategory";

// const { Option } = Select;
// const { Option: AutoCompleteOption } = AutoComplete;

const Admodaldetail = ({ reload, show, setShow, onPatchProduct , data}) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);

  const fetchCate = async () => {
    const result = await getCategory();
    const option = result.map((item) => {
      return {
        label: item.cate,
        value: item.cate,
      };
    });

    setCategories(option);
  };

const onCancel = () => {
  form.setFieldsValue({
    ...data[0],
    images_1: data[0].images[0],
    images_2: data[0].images[1],
    images_3: data[0].images[2],
    images_4: data[0].images[3],

    });
  setShow(false);
 
}

  useEffect(() => {
    fetchCate();
  }, [reload]);

  const handleAddProduct = () => {
    form.submit();
  };

  const handleFinish = () => {
    form.validateFields().then((values) => {
     
      onPatchProduct(values);
      form.resetFields();
      onCancel();
    });
  };

  const handleFinishFail = () => {
 
  };
  useEffect(() => {
    // Kiểm tra xem có dữ liệu trong 'data' hay không
    if (data && data.length > 0) {
      // Sử dụng setFieldsValue để đặt giá trị cho trường 'title'
      form.setFieldsValue({
        ...data[0],
        images_1: data[0].images[0],
        images_2: data[0].images[1],
        images_3: data[0].images[2],
        images_4: data[0].images[3],
    
        });
    }
  }, [data]);

console.log(data);

  return (
    <Modal
      open={show}
      title="Add Product"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Hủy bỏ
        </Button>,
        <Button
          htmlType="submit"
          key="submit"
          type="primary"
          onClick={handleAddProduct}
        >
          Cập nhật
        </Button>,
      ]}
    >
      <Form
        form={form}
        layout="vertical"
        name="addProductForm"
        onFinish={handleFinish}
        onFinishFailed={handleFinishFail}
   
      >
        <Row gutter={16}>
          <Col span={18}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Vui lòng nhập title" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="rating"
              label="Rating"
              rules={[{ required: true, message: "Vui lòng nhập rating" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Price"
              rules={[{ required: true, message: "Vui lòng nhập price" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="discountPercentage" label="Discount Percentage">
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="Quantity"
              label="Quantity"
              rules={[{ required: true, message: "Vui lòng nhập quantity" }]}
            >
              <InputNumber style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Vui lòng nhập category" }]}
            >
              <AutoComplete placeholder="Chọn Category" options={categories} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Vui lòng nhập description" }]}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="brand"
              label="Brand"
              rules={[{ required: true, message: "Vui lòng nhập brand" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="thumbnail"
              label="Thumbnail"
              rules={[{ required: true, message: "Vui lòng nhập thumbnail" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              name="images_1"
              label="Images"
              rules={[{ required: true, message: "Vui lòng image URL" }]}
            >
              <Input placeholder="Nhập image URL 1"/>
                
              
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="images_2"
              label="Images"
              rules={[{ required: true, message: "Vui lòng image URL" }]}
            >
              <Input placeholder="Nhập image URL 2"/>
                
              
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="images_3"
              label="Images"
              rules={[{ required: true, message: "Vui lòng image URL" }]}
            >
              <Input placeholder="Nhập image URL 3"/>
                
              
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="images_4"
              label="Images"
              rules={[{ required: true, message: "Vui lòng image URL" }]}
            >
              <Input placeholder="Nhập image URL 4"/>
                
              
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default Admodaldetail;
