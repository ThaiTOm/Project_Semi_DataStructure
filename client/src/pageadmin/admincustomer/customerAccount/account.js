import React, { useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Space, Popconfirm, Typography, Form, InputNumber, message, Tag, Modal } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getUser } from '../../../service/getcategory/getCategory';
import { patchUser } from '../../../service/patch/patch';
import { postCart, postUser } from '../../../service/post/post';
import { delUser } from '../../../service/delete/delete';


const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Account = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [editingKey, setEditingKey] = useState('');
  const [show, setshow] = useState(false);
  const isEditing = (record) => record.id === editingKey;
  const [form] = Form.useForm();
  const [form_1] = Form.useForm();

  const fetchUser = async () => {
    const result = await getUser();
    console.log(result); 
    setData(result);
  }

const patchCus = async (e) => {
  const result = await patchUser(e) 
}

const deleteCus = async (e) => {
  const result = await delUser(e);
}


const postCus = async (e) => {
  const result = await postUser(e);
  setData([...data, result]);
  const postApi = async (e) => {
    try {
      const ketqua = await postCart(e); // Gọi hàm patchCart với tham số là data
      console.log(ketqua);
    } catch (error) {
      console.error("Error while patching cart:", error);
      // Xử lý lỗi nếu có, có thể log ra console hoặc thực hiện các hành động khác
    }
  };
 
  postApi({
    ["userId"]: result.id,
  ["product"]: []
  });
}

  useEffect(() => {
 fetchUser()
  }, []);

  const edit = (record) => {
    console.log(record)
    form.setFieldsValue({
      id: '',
      username: '',
      password: '',
      token: '',
      ...record,
    });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
    console.log(row)
    console.log(index);
    console.log(newData);
    const isDuplicate = newData.some((item) => (item.username === row.username || item.token === row.token) && item.id !== id);
      if (index > -1 && !isDuplicate) {
      
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        
        patchCus(newData[index])
        setData(newData);
        setEditingKey('');
      } 
      else if (isDuplicate === true) {
        message.error('Dữ liệu bạn nhập đã bị trùng');
      }
      else {
        message.error('Không thể lưu dữ liệu. Vui lòng kiểm tra lại.');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
      message.error('Không thể lưu dữ liệu. Vui lòng kiểm tra lại thông tin nhập.');
    }
}


  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{  marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() =>  clearFilters && handleReset(clearFilters, selectedKeys, confirm, dataIndex)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
        if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters, selectedKeys, confirm, dataIndex) => {
    clearFilters();
    setSearchText('');
    confirm();
    setSearchedColumn(dataIndex);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      editable: false,
      ...getColumnSearchProps('id'),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      editable: true,
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
      editable: true,
      ...getColumnSearchProps('password'),
    },
    {
      title: 'Token',
      dataIndex: 'token',
      key: 'token',
      editable: true,
      ...getColumnSearchProps('token'),
    },
    {
      title: 'Type',
      key: 'type',
      filters: [
         {
          text: 'Admin',
          value: 'Admin'
         },
         {
          text: 'Users',
          value: 'Users'
         },
      ],

      onFilter: (value, record) => {
        const check = record.token.includes('admin0305');
        if (value === 'Users'){
          return !check;
        }
        else {
          return check;
        }
      },
     
      render: (_, record) => {
      
        const searchString = "admin0305";
        return (
          <>
            {record.token.includes(searchString) === true ? (<Tag color="#87d068">Admin</Tag>) : (<Tag color="#108ee9">Users</Tag>)}
          </>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => {
           
        const editable = isEditing(record);
        return (
            <>
             <Space size="middle">
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <Button type="danger" icon={<DeleteOutlined />} />
          </Popconfirm>
         
        </Space>
                  {editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        )}
            </>
        

        )
      },
       
        

      
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'id' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        key: col.key,
        editing: isEditing(record),
      }),
    };
  });


  const handleDelete = (id) => {
    const findAdmin =  data.find(item => {
      return item.id === id;
    })
    if (findAdmin.token.includes("admin0305")) {
     message.error("không thể xóa admin");
    }
  else {
    deleteCus(id);
    setData(prevData => prevData.filter(user => user.id !== id));
  }

  };


const handleClick = () => {
     setshow(true)
}

const handleCancel = () => {
  form_1.resetFields();
  setshow(false)
};

const handleOk = () => {
   form_1.submit();
};

const handleFinish = (e) => {
  console.log(Array.isArray(data));
  console.log(e);
  if (Array.isArray(data)) {
    const isAdd = data && Array.isArray(data) && data.some((item) => (item.username === e.username || item.token === e.token) );
    if (isAdd === true ){
      message.error('Không thể cập nhật người dùng mới. Vui lòng kiểm tra lại.');
    }
    else {
       postCus(e);
    }
  } 
  else {
    // Xử lý trường hợp data không phải là mảng
    message.error('Dữ liệu không hợp lệ.');
  }
 

}


  return (
    <> <div>

    <h1>Account Users</h1>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={handleClick} type="primary" style={{ marginBottom: 16 }}>
          Add User
        </Button>
        
      </Space>

      <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
      pageSize: 50,
    }}
    scroll={{
      y: 400,
    }}
      />
    </Form>
    <Modal
    onOk={handleOk}
      open={show}
      title="User Form"
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
    >
      <Form autoComplete="off" onFinish={handleFinish} form={form_1} layout="vertical" name="userForm">
        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: 'Please input the username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input the password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="token"
          label="Token"
          rules={[
            {
              required: true,
              message: 'Please input the token!',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
    </div></>
   
  );
};

export default Account;
