import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import { getCookie } from '../takeCookies/takeCookies';
import { getMyUser } from '../../service/getcategory/getCategory';
import { delAvatarV1 } from '../../service/delete/delete';
import { useDispatch } from 'react-redux';
import { load } from '../../actions/actCart';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const HinhAnh = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
  
  ]);
  const [reload, setReload] = useState(true);
  const cookies = getCookie("token");
  const dispatch = useDispatch();

  const handleCancel = () => setPreviewOpen(false);
  
  const getAvatar = async (token) => {
    const result = await getMyUser(token);
    if(result && result.code === 200){
      setFileList([
        {
        
          uid: '-1',
          name: 'Hình Ảnh Chi Tiết',
          status: 'done',
          url: result.avatar ? result.avatar : "https://img.icons8.com/color/96/person-male.png",
        },
      ])
    }
  }

  useEffect(() => {
    getAvatar(cookies);
  }, [cookies])

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => {
    setReload(!reload)
    dispatch(load(reload))
    setFileList(newFileList)
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const delAvatar = async (token) => {
    const result = await delAvatarV1(token);
    setFileList([]);
  }
  const handleRemove = () => {
    delAvatar(cookies);
  }


  return (
    <>
      <Upload
      name="avatar"
      action={`http://localhost:3004/api/v1/users/information/avatar/${cookies}`}
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default HinhAnh;