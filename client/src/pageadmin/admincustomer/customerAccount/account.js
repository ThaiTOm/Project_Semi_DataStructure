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
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
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

const options = [
  {
    value: "user",
  },
  {
    value: "admin",
  },
];

const Account = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [editingKey, setEditingKey] = useState("");
  const [show, setshow] = useState(false);
  const [reload, setReload] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const isEditing = (record) => record._id === editingKey;
  const [form] = Form.useForm();
  const [form_1] = Form.useForm();
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
    setReload(!reload);
  };

  const deleteCus = async (e, token) => {
 const result = await delUserAdmin(e, token);
 Modal.success({
  title: "Thành Công",
  content: "Đã Xóa Thành Công"
})
  };

  const postCus = async (e, token) => {
    const result = await postUserAdmin(e, token);
    Modal.success({
      title: "Thành Công",
      content: `${result.message}`
    })
    setData([...data, result.dataUser]);
    setReload(!reload);
    const postApi = async (e) => {
      try {
        await postCart(e); // Gọi hàm patchCart với tham số là data
      } catch (error) {
        console.error("Error while patching cart:", error);
        // Xử lý lỗi nếu có, có thể log ra console hoặc thực hiện các hành động khác
      }
    };

    postApi({
      user: result.dataUser._id,
      product: [],
    });
  };

  useEffect(() => {
    fetchUser(cookies);
  }, [cookies, reload]);

  const edit = (record) => {
    form.setFieldsValue({
      date: "",
      username: "",
      ...record,
    });
    setEditingKey(record._id);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item._id);
      const isDuplicate = newData.some(
        (item) => item.username === row.username && item._id !== id
      );
      if (index > -1 && !isDuplicate) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        patchCus(newData[index], cookies);
        setData(newData);
        setEditingKey("");
      } else if (isDuplicate === true) {
        message.error("Dữ liệu bạn nhập đã bị trùng");
      } else {
        message.error("Không thể lưu dữ liệu. Vui lòng kiểm tra lại.");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
      message.error(
        "Không thể lưu dữ liệu. Vui lòng kiểm tra lại thông tin nhập."
      );
    }
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
      editable: false,
      ...getColumnSearchProps("_id"),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      editable: true,
      ...getColumnSearchProps("username"),
    },
    {
      title: "Thời gian đăng kí",
      dataIndex: "date",
      key: "date",
      editable: true,
    },
    {
      title: "Trạng Thái",
      dataIndex: "delete",
      key: "delete",
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
        const searchString = "admin0305";
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
        const editable = isEditing(record);
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
                {editable ? (
                  <span>
                    <Typography.Link
                      onClick={() => save(record._id)}
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
                  <Typography.Link
                    disabled={editingKey !== ""}
                    onClick={() => edit(record)}
                  >
                    Edit
                  </Typography.Link>
                )}
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

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "id" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        key: col.key,
        editing: isEditing(record),
      }),
    };
  });

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

  const handleOk = () => {
    form_1.submit();
  };

  const handleFinish = (e) => {
    if (Array.isArray(data)) {
      const isAdd =
        data &&
        Array.isArray(data) &&
        data.some((item) => item.username === e.username);
      if (isAdd === true) {
       Modal.error({
        title: "Lỗi",
        content:  "Không thể cập nhật người dùng mới. Vui lòng kiểm tra lại."
       })
      } else {
        postCus({
          ...e
        }, cookies);

        setshow(false);
      }
    } else {
      // Xử lý trường hợp data không phải là mảng
      message.error("Dữ liệu không hợp lệ.");
    }

   
  };

  const handleFinishFailed = () => {
    //
  }

  const onSelectChange = (e) => {
    setSelectedRowKeys(e);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // hàm xóa có thể khôi phục
  const handleDelete_phu = (id) => {
    patchCus({
      _id: id,
      deleted: true,
    }, cookies);
  };
  // end hàm xóa có thể khôi phục

  // hàm xóa bình thường
  const handleDelete = (id, values) => {
    if(values.type !== "admin"){
       deleteCus(id, cookies);
    setData((prevData) => prevData.filter((user) => user._id !== id));
    }else {
      Modal.error({
        title: "Lỗi",
        content: "Không thể xóa vĩnh viễn admin"
      })
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
          if(data[selectedRowKeys[i] - 1].type !== "admin"){
             deleteCus(data[selectedRowKeys[i] - 1]._id, cookies);
          }
         else {
          Modal.error({
            title: "Lỗi",
            content: "Không thể xóa vĩnh viễn admin"
          })
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

        <Form form={form} component={false}>
          <Table
            className="account--table"
            rowSelection={rowSelection}
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
          />
        </Form>
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
              name="type"
              label="Loại"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <AutoComplete
                style={{
                  width: 200,
                }}
                options={options}
                filterOption={(inputValue, option) =>
                  option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Account;
