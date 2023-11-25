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

const { Option } = Select;
const { Option: AutoCompleteOption } = AutoComplete;

const AddProductModal = ({ reload, open, onCancel, onAddProduct }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([
    {
      label: 'egsegsegs',
      value: 'aegagaeg',
    },
    {
      label: 'segsgseg',
      value: 'àwagege',
    },
    {
      label: 'segsgseegsegg',
      value: 'àwagseggege',
    },
  ]);

const fetchCate = async () => {
    const result = await getCategory();
    const option = 
        result.map(item => {
            return {
                label: item.cate,
                value: item.cate
            }
        })
    

    setCategories(option);
}

  useEffect(() => {
    fetchCate();
  }, [reload]);

  const handleAddProduct = () => {
    
  form.submit();
  };
  
  const handleFinish = () => {
    form.validateFields().then((values) => {
        console.log(values)
      onAddProduct(values);
      form.resetFields();
      onCancel();
    });
  }
 
  const handleFinishFail = () => {
    console.log("sai roai")
  }

  return (
    <Modal
      open={open}
      title="Add Product"
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Cancel
        </Button>,
        <Button htmlType="submit" key="submit" type="primary" onClick={handleAddProduct}>
          Add Product
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="addProductForm" onFinish={handleFinish} onFinishFailed={handleFinishFail} >
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
              rules={[
                { required: true, message: "Vui lòng nhập category" },
              ]}
            >
              <AutoComplete
             
                placeholder="Chọn Category"
                options={categories}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[
                { required: true, message: "Vui lòng nhập description" },
              ]}
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
          <Col span={12}>
            <Form.Item
              name="thumbnail"
              label="Thumbnail"
              rules={[
                { required: true, message: "Vui lòng nhập thumbnail" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
        <Col span={24}>
        <Form.Item
        name="images"
        label="Images"
        rules={[{ required: true, message: "Vui lòng nhập 4 image URL" }]}
      >
        <Input.TextArea placeholder="Nhập image URL ( mỗi URL phải cách nhau một dấu phẩy và dấu cách )" autoSize={{ minRows: 3, maxRows: 6 }} />
      </Form.Item>

        </Col>
    </Row>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
