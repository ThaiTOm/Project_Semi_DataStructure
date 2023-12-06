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
} from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { getUser } from "../../../service/getcategory/getCategory";
import { patchUser } from "../../../service/patch/patch";
import { postCart, postUser } from "../../../service/post/post";
import { delUser } from "../../../service/delete/delete";
import "./customerAccount.scss";
import { format } from 'date-fns';
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

const Account = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [editingKey, setEditingKey] = useState("");
  const [show, setshow] = useState(false);
  const [reload, setReload] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const isEditing = (record) => record.id === editingKey;
  const [form] = Form.useForm();
  const [form_1] = Form.useForm();

  const fetchUser = async () => {
    const result = await getUser();

    const dataWithKeys = result.map((item, index) => ({
      ...item,
      key: index + 1,
    }));

    setData(dataWithKeys);
  };

  const patchCus = async (e) => {
    const result = await patchUser(e);
    setReload(!reload);
  };

  const deleteCus = async (e) => {
    const result = await delUser(e);
  };

  const postCus = async (e) => {
    const result = await postUser(e);
    setData([...data, result]);
    setReload(!reload);
    const postApi = async (e) => {
      try {
        const ketqua = await postCart(e); // Gọi hàm patchCart với tham số là data
      } catch (error) {
        console.error("Error while patching cart:", error);
        // Xử lý lỗi nếu có, có thể log ra console hoặc thực hiện các hành động khác
      }
    };

    postApi({
      ["userId"]: result.id,
      ["product"]: [],
    });
  };

  useEffect(() => {
    fetchUser();
  }, [reload]);

  const edit = (record) => {
    form.setFieldsValue({
      id: "",
      username: "",
      password: "",
      token: "",
      ...record,
    });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      const isDuplicate = newData.some(
        (item) =>
          (item.username === row.username || item.token === row.token) &&
          item.id !== id
      );
      if (index > -1 && !isDuplicate) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        patchCus(newData[index]);
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
    onFilterDropdownVisibleChange: (visible) => {
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
      dataIndex: "id",
      key: "id",
      editable: false,
      ...getColumnSearchProps("id"),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      editable: true,
      ...getColumnSearchProps("username"),
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
      editable: true,
      ...getColumnSearchProps("password"),
    },
    {
      title: "Token",
      dataIndex: "token",
      key: "token",
      editable: true,
      ...getColumnSearchProps("token"),
    },
    {
      title: "Thời gian đăng kí",
      dataIndex: "date",
      key: "date",
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
          value: "Admin",
        },
        {
          text: "Users",
          value: "Users",
        },
      ],

      onFilter: (value, record) => {
        const check = record.token.includes("admin0305");
        if (value === "Users") {
          return !check;
        } else {
          return check;
        }
      },

      render: (_, record) => {
        const searchString = "admin0305";
        return (
          <>
            {record.token.includes(searchString) === true ? (
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
        const checkDelete = record.delete;

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
                    onConfirm={() => handleDelete_phu(record.id)}
                  >
                    <Tooltip title="Xóa"><Button icon={<DeleteOutlined />} danger /></Tooltip>
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
                <Space className="account--del" size="middle" >
                  <Popconfirm
                    title="Xóa"
                    description="Admin có chắc là xóa vĩnh viễn chứ?"
                    okText="Chắc chắn rồi!"
                    cancelText="Để suy nghĩ lại!"
                    onConfirm={() => handleDelete(record.id)}
                  >
                    <Tooltip title="Xóa vĩnh viễn"><Button icon={<DeleteOutlined />} danger /></Tooltip>
                  </Popconfirm>
                  <Popconfirm
                    title="khôi phục?"
                    description="Bạn có chắc là khôi phục chứ?"
                    okText="Chắc chắn rồi!"
                    cancelText="Để suy nghĩ lại!"
                    onConfirm={() => handleRestore(record.id)}
                  >
                       <Tooltip title="Khôi phục"><Button className="account--restore" ><img width="32" height="32" src="https://img.icons8.com/windows/32/settings-backup-restore.png" alt="settings-backup-restore"/></Button></Tooltip>

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
    patchCus({
      id: id,
      delete: false,
    });
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
        data.some(
          (item) => item.username === e.username || item.token === e.token
        );
      if (isAdd === true) {
        message.error(
          "Không thể cập nhật người dùng mới. Vui lòng kiểm tra lại."
        );
      } else {
        postCus({...e,
          delete: false,
          date: format(new Date(), 'yyyy-MM-dd HH:mm:ss')
          });
          
       setshow(false);
      }
    } else {
      // Xử lý trường hợp data không phải là mảng
      message.error("Dữ liệu không hợp lệ.");
    }
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
    const findAdmin = data.find((item) => {
      return item.id === id;
    });
    if (findAdmin.token == "admin0305") {
      message.error("không thể xóa admin chính");
    } else {
      patchCus({
        id: id,
        delete: true,
      });
    }
  };
  // end hàm xóa có thể khôi phục

  // hàm xóa bình thường
  const handleDelete = (id) => {
    const findAdmin = data.find((item) => {
      return item.id === id;
    });
      deleteCus(id);
      setData((prevData) => prevData.filter((user) => user.id !== id));
  };
  // end hàm xóa bình thường

  // chức năng xóa khi select
  const handleXoa = () => {
    const dataFilter = selectedRowKeys.map((item) => {
      return data.filter((x) => {
        return x.id !== item;
      });
    });
    if (dataFilter.length !== 0) {
      // const dataAfterDel = dataFilter.reduce((origin, item) => {
      //   // origin là mảng đầu tiên
      //   return origin.filter(
      //     (obj1) => item.some((obj2) => obj2.key === obj1.key) // không dùng find vì nếu có cùng key thì nó sẽ lấy thằng đầu ( hi hữu )
      //   );
      // }, dataFilter[0].slice());
      // // giải thích :
      // // - origin giữ vị trị đầu tiền của mảng findDel (findDel là một mảng chứa nhiều mảng có object)
      // // - origin sử dụng filter để check những object trong mảng đầu tiên và check với item đầu tiên là mảng đầu tiên luôn (giống origin hiện tại) và check xong nó sẽ trả về mảng đầu tiên cho object
      // // - từ đó item sẽ bám vào mảng thứ 2 và origin là mảng mới được check nó sẽ check típ với item đó và trả về origin chung của mảng 1 và 2 và từ orgin chung đó nếu còn mảng tiếp theo thì cũng sẽ tiếp tục check cho đến khi có origin chung cuối cùng thì return về kết quả
      
      
      // setData(dataAfterDel);
      
      setSelectedRowKeys([]);
      for (let i = 0; i < selectedRowKeys.length; i++) {
        if ( data && data[selectedRowKeys[i] - 1] &&  data[selectedRowKeys[i] - 1].token === "admin0305") {
          
          Modal.error({
            title: "Không Thể Xóa Admin chính",
            content: "Vui lòng không lựa chọn Admin chính",
          });
        }
        else if (data[selectedRowKeys[i] - 1].delete === false)  {
          patchCus({
            id: selectedRowKeys[i],
            delete: true,
          });
          
        }
        else if (data[selectedRowKeys[i] - 1].delete === true) {
          deleteCus(selectedRowKeys[i]);
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
              name="token"
              label="Token"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập token!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Account;
