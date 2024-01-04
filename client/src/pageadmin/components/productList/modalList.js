import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
} from "antd";
import { getCategory } from "../../../service/getcategory/getCategory";
import ModalProduct from "../../helper/modalProduct";


const AddProductModal = ({
  reload,
  show,
  setShow,
  onAddProduct,
}) => {
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
      onAddProduct(values);
      form.resetFields();
      onCancel();
    });
  };

  const handleFinishFail = () => {
    Modal.error({
      title: "Lỗi",
      content: "Nhập Không Đúng Yêu Cầu"
    })
  };

  const onCancel = () => {
    form.resetFields();
    setShow(false);
  };

  return (
    <>
      <ModalProduct
        show={show}
        onCancel={onCancel}
        handleAddProduct={handleAddProduct}
        form={form}
        handleFinish={handleFinish}
        handleFinishFail={handleFinishFail}
        categories={categories}
        dataButton="Thêm Sản Phẩm"
      />
    </>
  );
};

export default AddProductModal;
