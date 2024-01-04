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
import ModalProduct from "../../helper/modalProduct";

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
      dataButton="Chỉnh sửa"
    />
  </>
  );
};

export default Admodaldetail;
