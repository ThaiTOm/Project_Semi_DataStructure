import { useEffect, useRef, useState } from "react";
import {
  Table,
  Input,
  Button,
  Space,
  Checkbox,
  Tooltip,
  Modal,
  Popconfirm,
  Tag,
} from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Highlighter from "react-highlight-words";
import "./product.scss";
import {
  getCategory,
  getProduct_cate,
  getProductadminsp,
  getProductsp,
  getadminCategory,
} from "../../../service/getcategory/getCategory";
import { delProduct } from "../../../service/delete/delete";
import AddProductModal from "./modalList";
import { postProduct } from "../../../service/post/post";
import { patchCate, patchProduct } from "../../../service/patch/patch";
import { useDispatch } from "react-redux";
import { load } from "../../../actions/actCart";

function Productlist() {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [dataSource, setdataSource] = useState([]);
  const [reload, setReload] = useState(true);
  const [show, setShow] = useState(false);
  const [cate, setCate] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProduct = async () => {
      const result = await getProductadminsp();
      const resultAddkey = result.map((item) => {
        return [{ ...item, key: item.id }];
      });
      const hopnhat = resultAddkey.reduce((origin, item) => {
        return origin.concat(item);
      }, []);
      setdataSource(hopnhat);
    };

    fetchProduct();
  }, [reload]);

  useEffect(() => {
    getCate();
  },[])
  const patchcate = async (values) => {  // cập nhật cate
    const result = await patchCate(values);
} 

const getCate = async () => {
  const result = await getadminCategory();
  setCate(result);
}

const getproductCate = async (e, Cate) => {
  const result = await getProduct_cate(e);
 const findIdCate = cate.find(item => {
  return item.cate === Cate;
})

  if (result.length === 0 ) {
   if (findIdCate) {
    patchcate({id: findIdCate.id, delete: true})
   }
  }
  
  else  {
   if (findIdCate && findIdCate.delete === true) {
    patchcate({id: findIdCate.id, delete: false})
   }
  }
}
  


  // hàm tạo search của ant ds
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
  // hàm tạo search của ant ds

  const deleteProduct = async (e) => {
     await delProduct(e);
    setReload(!reload);
  };

  const postproduct = async (values) => {
    await postProduct(values);
  };

  const patchproduct = async (id, values) => {
     await patchProduct(id, values);
  };

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
  const onSelectChange = (newSelectedRowKeys) => {
    // lưu key trả về khi select thay đổi

    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    //các checkbox
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleXoa = () => { // chức năng xóa khi select
   
    const dataFilter = selectedRowKeys.map((item) => {
      return dataSource.filter((x) => {
        return x.id !== item;
      });
    });
    if (dataFilter.length !== 0) {

   
      setSelectedRowKeys([]);
      for (let i = 0; i < selectedRowKeys.length; i++) {
        
        if (dataSource[selectedRowKeys[i] - 1].delete === false) {
          patchproduct(selectedRowKeys[i], { delete: true });
        }
        else {
           deleteProduct(selectedRowKeys[i]);
        }
        setReload(!reload);
      }
    } else {
      Modal.error({
        title: "Không Thể Xóa",
        content: "Vui lòng lựa chọn sản phẩm cần xóa",
      });
    }
  };

  const handleDelete = (id) => { // xóa hẳn
    deleteProduct(id);
    setReload(!reload);
    dispatch(load(reload));
  };

  const handleRestore = async (e) => { // khôi phục
    const cate = e.category;
   await patchproduct(e.id, { delete: false });
   getproductCate(e.category, cate);
    setReload(!reload);
   dispatch(load(reload));
  };

  const handleDelitem = async (e) => {// ẩn từng item
  const cate = e.category;
  await  patchproduct(e.id, { delete: true });
   getproductCate(e.category, cate);
    setReload(!reload);
    dispatch(load(reload));
  };

  const handleXem = (values) => {  // xem chi tiết sản phẩm
    // xem chi tiết từng item
    navigate("/admin/product/" + values.id);
  };

  const handleShow = () => {  // show modal
    setShow(true);
  };

  // thêm sản phẩm
  const handleAddProduct = (e) => {
    const imageArray = [e.images_1, e.images_2, e.images_3, e.images_4];
    delete e.images_1;
    delete e.images_2;
    delete e.images_3;
    delete e.images_4;
    const PostValues = {
      ...e,
      images: imageArray,
      delete: false,
    };
    postproduct(PostValues);
    setReload(!reload);
    setShow(false);
  };
// end thêm sản phẩm

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail) => (
        <img
          src={thumbnail}
          alt="Thumbnail"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => {
        let priceA = a.price * (1 - a.discountPercentage / 100);
        let priceB = b.price * (1 - b.discountPercentage / 100);
        return priceA - priceB;
      },
      render: (price, record) => (
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(
            `${
              record.discountPercentage > 0
                ? price * (1 - record.discountPercentage / 100)
                : price
            }`
          )}
        </span>
      ),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      sorter: (a, b) => a.discountPercentage - b.discountPercentage,
      render: (_, record) => (
        <>
          <span>{record.discountPercentage}</span>%
        </>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",

      sorter: (a, b) => a.Quantity - b.Quantity,
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",

      render: (text, record) => (
        <span>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(
            `${
              record.discountPercentage > 0
                ? record.price *
                  (1 - record.discountPercentage / 100) *
                  record.Quantity
                : record.price * record.Quantity
            }`
          )}
        </span>
      ),
    },
    {
      title: "Trạng thái sản phẩm",
      dataIndex: "delete",
      key: "delete",
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
        const checkDelete = record.delete;
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
                onConfirm={() => handleDelete(record.id)}
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

  return (
    <>
      <div className="productlist">
        <h1 className="productlist--top__h1">Danh Sách Sản Phẩm</h1>
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
          className="productlist--table"
          bordered
          columns={columns}
          rowSelection={{
            ...rowSelection,
          }}
          dataSource={dataSource}
        />
      </div>
      <AddProductModal
        reload={reload}
        show={show}
        setShow={setShow}
        onAddProduct={handleAddProduct}
        setReload={setReload}
        dataSource={dataSource}
      />
    </>
  );
}

export default Productlist;
