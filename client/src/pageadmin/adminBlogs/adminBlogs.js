import React, { useState, useEffect, useRef } from "react";
import { Table, Input, Space, Button, Tag, Tooltip, Popconfirm, Modal } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import Modalblogs from "./modalBlogs";
import { getCookie } from "../../components/takeCookies/takeCookies";
import { postBlogs } from "../../service/post/post";
import { getBlogs } from "../../service/getcategory/getCategory";
import { useNavigate } from "react-router-dom";
import { patchBlogId } from "../../service/patch/patch";
import { delBlogV1 } from "../../service/delete/delete";
const { Search } = Input;



function Adminblogs() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [show, setShow] = useState(false);
  const [reload, setReload] = useState(true);
  const [dataSource, setDataSource] = useState([]);
 const cookies = getCookie("token")
 const navigate = useNavigate();
const takeBlogs = async (token) => {
  const result = await getBlogs(token);
  if(result && result.code === 200){
    for (let i = 0 ; i < result.blogs.length; i++){
      result.blogs[i].key = i;
   }
    setDataSource(result.blogs);
  }
}

const deleteBlog = async (id) => {
  await delBlogV1(cookies, id);
  setReload(!reload);
};

const updateBlogId = async (option, token, id) => {
  const result = await patchBlogId(option, token, id)
  setReload(!reload);
}

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  // hàm reset chữ
  const handleReset = (clearFilters, selectedKeys, confirm, dataIndex) => {
    clearFilters();
    setSearchText("");
    confirm();
    setSearchedColumn(dataIndex);
  };
  // hàm reset chữ

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
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
              handleReset(clearFilters, selectedKeys, confirm, dataIndex)
            }
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
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
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const onSelectChange = (newSelectedRowKeys) => {
    // lưu key trả về khi select thay đổi
   console.log(newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    //các checkbox
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleShow = () => {  // show modal
    setShow(true);
  };

  const handleDelete = (id) => { // xóa hẳn
    deleteBlog(id);
  
  };

  const handleRestore = async (e) => { // khôi phục
   updateBlogId({ deleted: false }, cookies, e._id);
  };

  const handleDelitem = async (e) => {// ẩn từng item
 updateBlogId({ deleted: true }, cookies, e._id);
  };

  const handleXoa = () => { // chức năng xóa khi select
   
    const dataFilter = selectedRowKeys.map((item) => {
      return dataSource.filter((x) => {
        return x.key !== item;
      });
    });
    if (dataFilter.length !== 0) {

   
      setSelectedRowKeys([]);
      for (let i = 0; i < selectedRowKeys.length; i++) {
        if (dataSource[selectedRowKeys[i]].deleted === false) {
          updateBlogId({ deleted: true }, cookies, dataSource[selectedRowKeys[i]]._id);
        }
        else {
          deleteBlog(dataSource[selectedRowKeys[i]]._id);
        }
      }
    } else {
      Modal.error({
        title: "Không Thể Xóa",
        content: "Vui lòng lựa chọn sản phẩm cần xóa",
      });
    }
  };

const handleAddBlogs = async (values) => {
 const result = await postBlogs(values, cookies);
 if (Array.isArray(result.blogs)) {
  // Nếu là mảng, thực hiện gán
  setDataSource([
    ...dataSource,
    ...(result.blogs),
  ]);
} else {
  // Xử lý khi result.blogs không phải là mảng
  console.error("result.blogs is not an array");
}
 setReload(!reload);
}


const handleXem = (values) => {  // xem chi tiết sản phẩm
  // xem chi tiết từng item
  navigate("/admin/blogs/" + values._id);
};
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="image"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      ...getColumnSearchProps("category"),
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      ...getColumnSearchProps("content"),
    },
    {
      title: "Trạng thái sản phẩm",
      dataIndex: "deleted",
      key: "deleted",
      render: (text, record) => {
        if (text === true) {
          return (
            <>
              <div className="">
                <Tag color="#B21016">Đã xóa</Tag>
              </div>{" "}
            </>
          );
        } else {
          return (
            <>
              <div className="">
                <Tag color="#138535">Chưa xóa</Tag>
              </div>
            </>
          );
        }
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        const checkDelete = record.deleted;
        return checkDelete === false ? (
          <>
            <Space size="middle">
              <Tooltip title="Xem chi tiết" color="#085820" key="1">
                {" "}
                <Button
                  type="primary"
                  icon={
                    <img
                      width="20"
                      height="20"
                      src="https://img.icons8.com/external-gradak-royyan-wijaya/24/FFFFFF/external-eyes-gradak-interface-solidarity-gradak-royyan-wijaya.png"
                      alt="external-eyes-gradak-interface-solidarity-gradak-royyan-wijaya"
                    />
                  }
                  className="productlist--delitem"
                  onClick={() => handleXem(record)}
                ></Button>
              </Tooltip>
              <Tooltip title="Xóa" color="#085820" key="2">
                <Popconfirm
                  title="Xóa"
                  description="Admin có chắc là xóa chứ?"
                  onConfirm={() => handleDelitem(record)}
                  okText="Chắc chắn rồi!"
                  cancelText="Để suy nghĩ lại!"
                >
                  <Button
                    type="primary"
                    icon={
                      <img
                        width="19"
                        height="19"
                        src="https://img.icons8.com/ios-filled/50/FFFFFF/trash.png"
                        alt="trash"
                      />
                    }
                    className="productlist--delitem"
                    danger
                  />
                </Popconfirm>
              </Tooltip>
            </Space>
          </>
        ) : (
          <>
            <Space className="productlist--del" size="middle" align="center">
              <Popconfirm
                title="Xóa"
                description="Admin có chắc là xóa vĩnh viễn chứ?"
                okText="Chắc chắn rồi!"
                cancelText="Để suy nghĩ lại!"
                onConfirm={() => handleDelete(record._id)}
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
                onConfirm={() => handleRestore(record)}
              >
                <Tooltip title="Khôi phục">
                  <Button className="productlist--restore">
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
        );
      },
    },
  ];
  
useEffect(() => {
  takeBlogs(cookies);
}, [cookies, reload])


  return (
    <>
      <div className="adminBlogs">
      <h1 className="productlist--top__h1">Danh Sách Blogs</h1>
        <div className="productlist--top">
          <Button
            className="productlist--top__bt1"
            type="primary"
            onClick={handleXoa}
          >
            Xóa
          </Button>
          <Button
            className="productlist--top__bt2"
            type="primary"
            onClick={handleShow}
          >
            Thêm sản phẩm
          </Button>
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 5 }}
          bordered
          rowSelection={{
            ...rowSelection,
          }}
        />
      </div>
      <Modalblogs show={show} setShow={setShow} reload={reload} handleAddBlogs = {handleAddBlogs} />
    </>
  );
}
export default Adminblogs;
