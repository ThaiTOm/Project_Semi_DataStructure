import { useEffect, useRef, useState } from "react";
import { Table, Input, Button, Space, Checkbox, Tooltip, Modal, Popconfirm } from "antd";
import { SearchOutlined, RestOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Highlighter from "react-highlight-words";
import "./product.scss";
import { getProductsp } from "../../../service/getcategory/getCategory";
import { delProduct } from "../../../service/delete/delete";
import AddProductModal from "./modalList";
import { postProduct } from "../../../service/post/post";

function Productlist() {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [dataSource, setdataSource] = useState([]);
  const [reload, setReload] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await getProductsp();
      const resultAddkey = result.map((item) => {
        return [{ ...item, key: item.id }];
      });
      const hopnhat = resultAddkey.reduce((origin, item) => {
        return origin.concat(item);
      }, []);
      console.log(hopnhat);
      setdataSource(hopnhat);
    };

    fetchProduct();
  }, [reload]);

  const deleteProduct = async (e) => {
    const result = await delProduct(e);
    setReload(!reload);
  };

  const postproduct = async (values) => {
    const result = await postProduct(values);
  };

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

  const handleXoa = () => {
    // chức năng xóa khi select

    const dataFilter = selectedRowKeys.map((item) => {
      return dataSource.filter((x) => {
        return x.id !== item;
      });
    });
    if (dataFilter.length !== 0) {
      const dataAfterDel = dataFilter.reduce((origin, item) => {
        // origin là mảng đầu tiên
        return origin.filter(
          (obj1) => item.some((obj2) => obj2.key === obj1.key) // không dùng find vì nếu có cùng key thì nó sẽ lấy thằng đầu ( hi hữu )
        );
      }, dataFilter[0].slice());
      // giải thích :
      // - origin giữ vị trị đầu tiền của mảng findDel (findDel là một mảng chứa nhiều mảng có object)
      // - origin sử dụng filter để check những object trong mảng đầu tiên và check với item đầu tiên là mảng đầu tiên luôn (giống origin hiện tại) và check xong nó sẽ trả về mảng đầu tiên cho object
      // - từ đó item sẽ bám vào mảng thứ 2 và origin là mảng mới được check nó sẽ check típ với item đó và trả về origin chung của mảng 1 và 2 và từ orgin chung đó nếu còn mảng tiếp theo thì cũng sẽ tiếp tục check cho đến khi có origin chung cuối cùng thì return về kết quả
      setdataSource(dataAfterDel);
      for (let i = 0; i < selectedRowKeys.length; i++) {
        deleteProduct(selectedRowKeys[i]);
      }
    } else {
      Modal.error({
        title: "Không Thể Xóa",
        content: "Vui lòng lựa chọn sản phẩm cần xóa",
      });
    }
  };

  const handleDelitem = (e) => {
    // xóa từng item
    deleteProduct(e.id);
    setReload(!reload);
  };
  const handleXem = (values) => {
    // xem chi tiết từng item
    navigate("/admin/product/" + values.id);
  };

  const handleShow = () => {
    // thêm sản phẩm
    setShow(true);
  };

  const handleAddProduct = (e) => {
    const imageArray = [e.images_1, e.images_2, e.images_3, e.images_4];
    delete e.images_1;
    delete e.images_2;
    delete e.images_3;
    delete e.images_4;
    console.log({
      ...e,
      images: imageArray,
    });
    const PostValues = {
      ...e,
      images: imageArray,
    };
    postproduct(PostValues);
    setReload(!reload);
    setShow(false);
  };

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
      title: "Action",
      key: "action",
      render: (text, record) => (
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
      ),
    },
  ];

  return (
    <>
      <div className="productlist">
        <h1 className="productlist--top__h1">Danh Sách Sản Phẩm</h1>
        <div className="productlist--top">
            <Button className="productlist--top__bt1" type="primary" onClick={handleXoa}>
          Xóa
        </Button>
        <Button className="productlist--top__bt2"  type="primary" onClick={handleShow} >
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
      />
    </>
  );
}

export default Productlist;
