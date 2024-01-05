import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Popconfirm,
  Typography,
  Form,
  InputNumber,
  message,
  Tag,
  Modal,
  Tooltip,
  AutoComplete,
  Radio,
  Col,
  Row,
} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllUsers, getUser } from "../../../service/getcategory/getCategory";
import {
  patchInforV1,
  patchUser,
  patchUserV1,
} from "../../../service/patch/patch";
import { postCart, postUser, postUserAdmin } from "../../../service/post/post";
import { delUser, delUserAdmin } from "../../../service/delete/delete";
import "./customerAccount.scss";
import { format } from "date-fns";
import { getCookie } from "../../../components/takeCookies/takeCookies";

const Account = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [show, setshow] = useState(false);
  const [show_1, setshow_1] = useState(false);
  const [reload, setReload] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();
  const [form_1] = Form.useForm();
  const [editing, setEditing] = useState([]);
  const cookies = getCookie("token");

  const fetchUser = async (values) => {
    const result = await getAllUsers(values);
    if (result.code === 200) {
      const dataWithKeys = result.user.map((item, index) => ({
        ...item,
        key: index + 1,
      }));
      setData(dataWithKeys);
    } else {
      //
    }
  };

  const patchCus = async (values, token) => {
    const result = await patchUserV1(values, token);
    if(result.code === 400) {
      Modal.error({
        title: "Lỗi",
        content: `${result.message}`,
      });
    }
    else {
      Modal.success({
        title: "Thành Công",
        content: `${result.message}`,
      });
      setReload(!reload);
      setData(result.dataUser);
    }
  };

  const deleteCus = async (e, token) => {
    const result = await delUserAdmin(e, token);
    if(result.code === 400){
      Modal.error({
        title: "Lỗi",
        content: `${result.message}`,
      });
    }
    else {
      Modal.success({
      title: "Thành Công",
      content: `${result.message}`,
    });
    }
    
  };
  const postApi = async (e) => {
    try {
      await postCart(e); // Gọi hàm patchCart với tham số là data
    } catch (error) {
      console.error("Error while patching cart:", error);
      // Xử lý lỗi nếu có, có thể log ra console hoặc thực hiện các hành động khác
    }
  };
  const postCus = async (e, token) => {
    const result = await postUserAdmin(e, token);
    if(result.code === 400) {
      Modal.error({
        title: "Lỗi",
        content: `${result.message}`,
      });
    }
    else {
      Modal.success({
      title: "Thành Công",
      content: `${result.message}`,
    });

    setData([...data, result.dataUser]);
    postApi({
      user: result.dataUser._id,
      product: [],
    });
    }
   
    setReload(!reload);

  };

  useEffect(() => {
    fetchUser(cookies);
  }, [cookies, reload]);

  const edit = (record) => {
    form.setFieldsValue({
      date: record.date,
      username: record.username,
      deleted: record.deleted,
      email: record.email,
      fullName: record.fullName,
      gender: record.gender,
      phoneNumber: record.phoneNumber,
      type: record.type,
    });
  setshow_1(true);
  setEditing(record);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
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
          <Button
            onClick={() =>
              clearFilters &&
              handleReset(clearFilters, selectedKeys, confirm, dataIndex)
            }
            size="small"
            style={{ width: 90 }}
          >
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
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
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
    setSearchText("");
    confirm();
    setSearchedColumn(dataIndex);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      ...getColumnSearchProps("_id"),
      width: 100,
      render: (text, record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </div>
      ),

    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      ...getColumnSearchProps("username"),
      width: 150,
    },
    {
      title: "Tên Đầy Đủ",
      dataIndex: "fullName",
      key: "fullName",
      ...getColumnSearchProps("fullName"),
      width: 150,
      render: (text, record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </div>
      ),
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ...getColumnSearchProps("phoneNumber"),
      width: 110,
      render: (text, record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </div>
      ),
    },
    {
      title: "Giới Tính",
      dataIndex: "gender",
      key: "gender",
      width: 70,
      filters: [
        {
          text: "Nam",
          value: "male",
        },
        {
          text: "Nữ",
          value: "female",
        },
        {
          text: "Khác",
          value: "other",
        },
      ],
      onFilter: (value, record) => {
        if (value === "other") {
          return record.gender !== "male" && record.gender !== "female";
        } else {
          return record.gender === value;
        }
      },
      render: (text, record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
      width: 180,
      render: (text, record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </div>
      ),
    },
    {
      title: "Thời gian đăng kí",
      dataIndex: "date",
      key: "date",
      width: 110,
      render: (text, record) => (
        <div style={{ wordWrap: 'break-word', wordBreak: 'break-word' }}>
          {text}
        </div>
      ),
    },
    {
      title: "Trạng Thái",
      dataIndex: "delete",
      key: "delete",
      filters: [
        {
          text: "Chưa xóa",
          value: "false",
        },
        {
          text: "Đã xóa",
          value: "true",
        },
      ],

      onFilter: (value, record) => {
        const check = record.deleted === "true";
        if (value === "false") {
          return !check;
        } else {
          return check;
        }
      },
      render: (text, record) => {
        if (text === true) {
          return (
            <>
              <div className="account--trangthai__true">
                <Tag color="#f50">Đã xóa</Tag>
              </div>
            </>
          );
        } else {
          return (
            <>
              <div className="account--trangthai__false">
                <Tag color="#2db7f5">Chưa xóa</Tag>
              </div>
            </>
          );
        }
      },
    },
    {
      title: "Type",
      key: "type",
      filters: [
        {
          text: "Admin",
          value: "admin",
        },
        {
          text: "Users",
          value: "user",
        },
      ],

      onFilter: (value, record) => {
        const check = record.type === "admin";
        if (value === "user") {
          return !check;
        } else {
          return check;
        }
      },

      render: (_, record) => {
        return (
          <>
            {record.type === "admin" ? (
              <Tag color="#87d068">Admin</Tag>
            ) : (
              <Tag color="#108ee9">Users</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        const checkDelete = record.deleted;
        return (
          <>
            {checkDelete === false ? (
              <>
                <Space className="account--del__phu" size="middle">
                  <Popconfirm
                    title="Xóa"
                    description="Admin có chắc là xóa chứ?"
                    okText="Chắc chắn rồi!"
                    cancelText="Để suy nghĩ lại!"
                    onConfirm={() => handleDelete_phu(record._id)}
                  >
                    <Tooltip title="Xóa">
                      <Button icon={<DeleteOutlined />} danger />
                    </Tooltip>
                  </Popconfirm>
                </Space>
                <Typography.Link onClick={() => edit(record)}>
                  Edit
                </Typography.Link>
              </>
            ) : (
              <>
                <Space className="account--del" size="middle">
                  <Popconfirm
                    title="Xóa"
                    description="Admin có chắc là xóa vĩnh viễn chứ?"
                    okText="Chắc chắn rồi!"
                    cancelText="Để suy nghĩ lại!"
                    onConfirm={() => handleDelete(record._id, record)}
                  >
                    <Tooltip title="Xóa vĩnh viễn">
                      <Button icon={<DeleteOutlined />} danger />
                    </Tooltip>
                  </Popconfirm>
                  <Popconfirm
                    title="khôi phục?"
                    description="Bạn có chắc là khôi phục chứ?"
                    okText="Chắc chắn rồi!"
                    cancelText="Để suy nghĩ lại!"
                    onConfirm={() => handleRestore(record._id)}
                  >
                    <Tooltip title="Khôi phục">
                      <Button className="account--restore">
                        <img
                          width="32"
                          height="32"
                          src="https://img.icons8.com/windows/32/settings-backup-restore.png"
                          alt="settings-backup-restore"
                        />
                      </Button>
                    </Tooltip>
                  </Popconfirm>
                </Space>
              </>
            )}
          </>
        );
      },
    },
  ];

  const handleRestore = (id) => {
    patchCus(
      {
        _id: id,
        deleted: false,
      },
      cookies
    );
  };
  const handleClick = () => {
    setshow(true);
  };

  const handleCancel = () => {
    form_1.resetFields();
    setshow(false);
  };
  const handleCancel_1 = () => {
    form.resetFields();
    setshow_1(false);
  };

  const handleOk = () => {
    form_1.submit();
  };
  const handleOk_1 = () => {
    form.submit();
  };

  const handleFinish = (e) => {
    postCus(
      {
        ...e,
      },
      cookies
    );
        setshow(false);
        form_1.resetFields();
  };
  const handleFinish_1 = (e) => {
    const username_phu = editing.username;
if(e.password === undefined){
  delete e.password
}
patchCus(
  {
    username_phu: username_phu,
    ...e,
  },
  cookies
);
    
  
        setshow_1(false);
  };

  const handleFinishFailed = () => {
    //
  };

  const onSelectChange = (e) => {
    setSelectedRowKeys(e);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // hàm xóa có thể khôi phục
  const handleDelete_phu = (id) => {
    patchCus(
      {
        _id: id,
        deleted: true,
      },
      cookies
    );
  };
  // end hàm xóa có thể khôi phục

  // hàm xóa bình thường
  const handleDelete = (id, values) => {
    if (values.type !== "admin") {
      deleteCus(id, cookies);
      setData((prevData) => prevData.filter((user) => user._id !== id));
    } else {
      Modal.error({
        title: "Lỗi",
        content: "Không thể xóa vĩnh viễn admin",
      });
    }
  };
  // end hàm xóa bình thường

  // chức năng xóa khi select
  const handleXoa = () => {
    const dataFilter = selectedRowKeys.map((item) => {
      return data.filter((x) => {
        return x.key !== item;
      });
    });
    if (dataFilter.length !== 0) {
      setSelectedRowKeys([]);
      for (let i = 0; i < selectedRowKeys.length; i++) {
        if (data[selectedRowKeys[i] - 1].deleted === false) {
          patchCus(
            {
              _id: data[selectedRowKeys[i] - 1]._id,
              deleted: true,
            },
            cookies
          );
        } else if (data[selectedRowKeys[i] - 1].deleted === true) {
          if (data[selectedRowKeys[i] - 1].type !== "admin") {
            deleteCus(data[selectedRowKeys[i] - 1]._id, cookies);
          } else {
            Modal.error({
              title: "Lỗi",
              content: "Không thể xóa vĩnh viễn admin",
            });
          }
        }
      }

      setReload(!reload);
    } else {
      Modal.error({
        title: "Không Thể Xóa",
        content: "Vui lòng lựa chọn sản phẩm cần xóa",
      });
    }
  };
  //end xóa khi select

  return (
    <>
      {" "}
      <div className="account">
        <h1 className="account--top__h1">Account Users</h1>
        <div className="account--top">
          <Button
            className="account--top__bt1"
            onClick={handleXoa}
            type="primary"
          >
            Xóa
          </Button>
          <Button
            className="account--top__bt2"
            onClick={handleClick}
            type="primary"
          >
            Thêm User
          </Button>
        </div>

        <Table
          className="account--table"
          rowSelection={rowSelection}
          bordered
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            pageSize: 50,
          }}
        />
        <Modal
          onOk={handleOk}
          open={show}
          title="User Form"
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Hủy bỏ
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk}>
              Thêm
            </Button>,
          ]}
        >
          <Form
            autoComplete="off"
            onFinish={handleFinish}
            onFinishFailed={handleFinishFailed}
            form={form_1}
            layout="vertical"
            name="userForm"
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập username!",
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
                  message: "Vui lòng nhập password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="fullName"
              label="Tên Đầy Đủ"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Số Điện Thoại"
            >
              <Input />
            </Form.Item>
           <Form.Item
              name="email"
              label="Email"
            >
              <Input />
            </Form.Item>
            <Row>
              <Col>
              <Form.Item
              name="type"
              label="Loại"
              initialValue="user"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="user">User</Radio.Button>
                <Radio.Button value="admin">Admin</Radio.Button>
              </Radio.Group>
            </Form.Item>
              </Col>
              <Col offset={5}>
              <Form.Item
              name="deleted"
              label="Trạng thái"
              initialValue={false}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value={false}>False</Radio.Button>
                <Radio.Button value={true}>True</Radio.Button>
              </Radio.Group>
            </Form.Item>
              </Col>
            </Row>
           <Row>
           <Col>
              <Form.Item
              name="gender"
              label="Giới Tính"
              initialValue="male"
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="male">Nam</Radio.Button>
                <Radio.Button value="female">Nữ</Radio.Button>
                <Radio.Button value="other">Khác</Radio.Button>
              </Radio.Group>
            </Form.Item>
              </Col>
           </Row>
          </Form>
        </Modal>
        <Modal
          onOk={handleOk_1}
          open={show_1}
          title="User Form"
          onCancel={handleCancel_1}
          footer={[
            <Button key="cancel" onClick={handleCancel_1}>
              Hủy bỏ
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk_1}>
              Thêm
            </Button>,
          ]}
        >
          <Form
            autoComplete="off"
            onFinish={handleFinish_1}
            onFinishFailed={handleFinishFailed}
            form={form}
            layout="vertical"
            name="userForm"
          >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập username!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="fullName"
              label="Tên Đầy Đủ"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Số Điện Thoại"
            >
              <Input />
            </Form.Item>
           <Form.Item
              name="email"
              label="Email"
            >
              <Input />
            </Form.Item>
            <Row>
              <Col>
              <Form.Item
              name="type"
              label="Loại"
              initialValue="user"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="user">User</Radio.Button>
                <Radio.Button value="admin">Admin</Radio.Button>
              </Radio.Group>
            </Form.Item>
              </Col>
              <Col offset={5}>
              <Form.Item
              name="deleted"
              label="Trạng thái"
              initialValue={false}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value={false}>False</Radio.Button>
                <Radio.Button value={true}>True</Radio.Button>
              </Radio.Group>
            </Form.Item>
              </Col>
            </Row>
           <Row>
           <Col>
              <Form.Item
              name="gender"
              label="Giới Tính"
              initialValue="male"
            >
              <Radio.Group buttonStyle="solid">
                <Radio.Button value="male">Nam</Radio.Button>
                <Radio.Button value="female">Nữ</Radio.Button>
                <Radio.Button value="other">Khác</Radio.Button>
              </Radio.Group>
            </Form.Item>
              </Col>
           </Row>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Account;
