import {
  AutoComplete,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { getCategory } from "../../service/getcategory/getCategory";
import { Editor } from "@tinymce/tinymce-react";

function Modalblogs({ show, setShow, reload, handleAddBlogs }) {
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState('');
  const handleFilePicker = (callback, value, meta) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    input.onchange = function () {
      const file = this.files[0];
      const reader = new FileReader();

      reader.onload = function () {
        const id = "blobid" + new Date().getTime();
        const blobCache = editorRef.current.editorUpload.blobCache;
        const base64 = reader.result.split(",")[1];
        const blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        callback(blobInfo.blobUri(), { title: file.name });
      };

      reader.readAsDataURL(file);
    };

    input.click();
  };

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

  useEffect(() => {
    fetchCate();
  }, [reload]);

  const handleAddProduct = () => {
    form.submit();
  };

  const handleFinish = () => {
    form.validateFields().then((values) => {
      handleAddBlogs({
        ...values,
        description: editorContent
       });
      form.resetFields();
      onCancel();
    });
  };

  const handleFinishFail = () => {
    Modal.error({
      title: "Lỗi",
      content: "Nhập Không Đúng Yêu Cầu",
    });
  };

  const onCancel = () => {
    form.resetFields();
    setShow(false);
  };

  return (
    <>
      <Modal
        width={1000}
        open={show}
        title="Thêm blogs"
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
            Thêm blogs
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
            <Col span={24}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: "Vui lòng nhập title" }]}
              >
                <Input placeholder="Nhập tiêu đề Blog" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="content"
                label="Content"
                rules={[{ required: true, message: "Vui lòng nhập content" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Nhập giới thiệu sản phẩm"
              
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Vui lòng nhập category" }]}
              >
                <AutoComplete
                  placeholder="Chọn Category"
                  options={categories}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
               label="Description"
               required
              >
          <Editor
          
                  apiKey="v4f1smp37kpt1gjhf7y7pncfv3rkvlfy3tks2kcu3p3xtm0h"
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins:
                      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                    toolbar:
                      "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                    file_picker_callback: handleFilePicker,
                    setup: (editor) => {
              // Lắng nghe sự kiện thay đổi nội dung của Editor
              editor.on('Change', () => {
                // Cập nhật giá trị của biến state editorContent khi có sự kiện thay đổi
                setEditorContent(editor.getContent());
              });
            },
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="image"
                label="image"
                rules={[{ required: true, message: "Vui lòng nhập image" }]}
              >
                <Input placeholder="Nhập image" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
export default Modalblogs;
