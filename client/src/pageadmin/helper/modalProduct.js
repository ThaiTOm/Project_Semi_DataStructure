import { AutoComplete, Button, Col, Input, InputNumber, Modal, Row } from "antd";
import { Form } from 'antd';


function ModalProduct({show, onCancel, handleAddProduct, form, handleFinish, handleFinishFail, categories, dataButton }){
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
     {dataButton}
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
              <Input placeholder="Nhập tiêu đề sản phẩm" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="rating"
              label="Rating"
              rules={[{ required: true, message: "Vui lòng nhập rating" }]}
            >
              <InputNumber style={{ width: "100%" }} min={0} max={5} placeholder="Nhập rating" />
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
              <InputNumber style={{ width: "100%" }} placeholder="Nhập giá sản phẩm" min={1000} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="discountPercentage" label="Discount Percentage"   rules={[{ required: true, message: "Vui lòng nhập discount" }]}>
              <InputNumber style={{ width: "100%" }} placeholder="Nhập giảm giá" min={0} max={100} />
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
              <InputNumber style={{ width: "100%" }} placeholder="Nhập số lượng sản phẩm" min={1} defaultValue={1} />
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
              <Input.TextArea placeholder="Nhập mô tả sản phẩm" />
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
              <Input placeholder="Nhập brand" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="thumbnail"
              label="Thumbnail"
              rules={[{ required: true, message: "Vui lòng nhập thumbnail" }]}
            >
              <Input placeholder="Nhập Thumbnail" />
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
}

export default ModalProduct;