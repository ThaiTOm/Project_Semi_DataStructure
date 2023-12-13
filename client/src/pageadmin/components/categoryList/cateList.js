import "./categoryList.scss";
import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Input,
  Space,
  Button,
  Tooltip,
  Form,
  InputNumber,
  Typography,
  Popconfirm,
  Modal,
  Tag,
} from "antd";
import { SearchOutlined,  DeleteOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { getCategoryAdmin } from "../../../service/getcategory/getCategory";
import { patchCate } from "../../../service/patch/patch";
import { delCate } from "../../../service/delete/delete";
import { postCate } from "../../../service/post/post";
import { useDispatch } from "react-redux";
import { load } from "../../../actions/actCart";

const EditableCell = ({    // cập nhật bảng  ( những biến ở đây là của ant ds chứ không phải biến của bài code )
  editing,   // chỉnh sửa
  dataIndex,   // thông tin của data
  title,  
  inputType,  // loạt input nhập vào ( number hay là string )
  record,   // dữ liệ của toàn bảng
  index,   // index của từng thằng
  children,  // dữ liệu hàng
  ...restProps  // tất cả các dữ liệu khác
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;  // check nếu loại là number thì sử dụng inputnumber
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
              message: `Vui lòng thêm ${title}!`,
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

const CategoryList = () => {
  const [searchText, setSearchText] = useState("");  
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [dataSource, setdataSource] = useState([]);
  const [reload, setReload] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const dispatch = useDispatch();

const patchcate = async (values) => {  // cập nhật cate
    const result = await patchCate(values);
} 

const delcate = async (id) => {    // xóa cate theo id của cate
    const result = await delCate(id);
}

const postcate = async (values) => {   // thêm cate
    const result = await postCate(values);
}


const fetchCate = async () => {
  const result = await getCategoryAdmin();
  const options = result.map((item) => {
    return { ...item, key: item.id };
  });
  setdataSource(options);
};

useEffect(() => {
  fetchCate();
}, [reload]);


  const edit = (record) => {   // điều chỉnh trường giá trị của form trong thanh input
    form.setFieldsValue({
      cate: "",
      icon: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {   //  hủy khi bấm chỉnh sửa
    setEditingKey("");
  };



  const save = async (key) => {  // lưu những thứ mới chỉnh sửa
    try {
      const row = await form.validateFields();   // đợi lấy giá trị của trường dữ liệu form
      const newData = [...dataSource];   // cập nhật giá trị của bảng và phân rã để không gây ảnh hưởng đến dữ liệu
      const index = newData.findIndex((item) => key === item.key);   //tìm index của dữ liệu bằng cách so key 
      if (index > -1) {   // nếu tìm ra index thì chỉnh sửa
        const item = newData[index];    // chỉnh sửa dữ liệu tại index
        newData.splice(index, 1, {      // xóa phần tử chỉnh sửa và thay cho nó dữ liệu mới được cập nhật
          ...item,
          ...row,
        });
        setdataSource(newData);   // cập nhật dữ liệu lên table
        const dataPatch = newData.find (item => {      // tìm dữ liệu cần cập nhật
            return item.id === key;
        })
      if (key === undefined){  // nếu key của save mà un thì post dữ liệu mới lên (kết hợp với nút thêm cate)
          postcate({...newData[index], delete: false});  
          setReload(!reload);  // khi post thì cập nhật dữ liệu
      }
      else {
         patchcate(dataPatch);    // nếu không phải thì cập nhật
      }
       
        setEditingKey(""); // set edit về dạng rỗng để đóng save
      } else { 
        newData.push(row);    // nếu index không được tìm ra thì thêm hàng  (kết hợp với thêm cate)
        setdataSource(newData);  // cập nhật dữ liệu
        setEditingKey("");
      }
    } catch (errInfo) { // báo lỗi khi gặp vấn đề
      console.log("Failed:", errInfo);
    }
  };



  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({   // đây là biến của ant ds
      setSelectedKeys,  // cập nhật dữ liệu tìm kiếm
      selectedKeys,     // hiện thị dữ liệu tìm kiếm dưới dạng mảng
      confirm,             // xác nhận tìm kiếm khi bấm nút
      clearFilters,    // reset dữ liệu khi bấm reset  
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}  // điều chỉnh theo tên của cột cần chức năg
          value={selectedKeys[0]}     // giá trị tìm kiếm
          onChange={(e) =>  // cập nhật liên tục khi có sự thay đổi giá trị của người nhập
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}  // khi bấm tìm kiếm thì đưa ba dữ liệu này đi
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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {  // nhận dữ liệu tìm kiếm
    confirm();  // xác nhận
    setSearchText(selectedKeys[0]);  // trả về giá trị sau khi xác nhận
    setSearchedColumn(dataIndex);  // trả về dữ liệu column
  };

  const handleReset = (clearFilters, selectedKeys, confirm, dataIndex) => {   // reset
    clearFilters();    // xóa sạch dữ liệu
    setSearchText("");   // trả dữ liệu về rỗng
    confirm();  // xác nhận
    setSearchedColumn(dataIndex);  // cập nhật
  };

  const handleXoa = () => {     // chức năng xóa khi select
    const dataFilter = selectedRowKeys.map(item => {   // map qua key khi select (có thể thay thế nhưng khuyến khích sử dụng cách này vì giúp web tối ưu hơn)
        return dataSource.filter(x => {      // lọc ra từng object thõa mãn 
            return x.id !== item;
        })
    }) 
    if (dataFilter.length !== 0 ){

        // vì sử dụng map nên nó cứ lặp thằng đầu rồi filter rồi lặp thằng sau r filter => tạo ra rất nhiều mảng với dữ liệu không được hợp nhất
    // const dataAfterDel =  dataFilter.reduce ((origin, item) => {   // => hợp nhất (origin là mảng đầu tiên)
    //     return origin.filter(obj1 =>
    //      item.some(obj2 => obj2.key === obj1.key)  // không dùng find vì nếu có cùng key thì nó sẽ lấy thằng đầu ( hi hữu )
    //     );
    //    },dataFilter[0].slice())
       // giải thích :
       // - origin giữ vị trị đầu tiền của mảng findDel (findDel là một mảng chứa nhiều mảng có object)
       // - origin sử dụng filter để check những object trong mảng đầu tiên và check với item đầu tiên là mảng đầu tiên luôn (giống origin hiện tại) và check xong nó sẽ trả về mảng đầu tiên cho object 
       // - từ đó item sẽ bám vào mảng thứ 2 và origin là mảng mới được check nó sẽ check típ với item đó và trả về origin chung của mảng 1 và 2 và từ orgin chung đó nếu còn mảng tiếp theo thì cũng sẽ tiếp tục check cho đến khi có origin chung cuối cùng thì return về kết quả
       
       setSelectedRowKeys([])
       for (let i = 0 ; i < selectedRowKeys.length ;i++){
    
      if (dataSource[selectedRowKeys[i] - 1].delete === false) {
        patchcate({id: selectedRowKeys[i], delete: true });
      }
      else {
        delcate(selectedRowKeys[i]);
      }
      setReload(!reload);
       }


    }
    else {
      Modal.error({
        title: 'Không Thể Xóa',
        content: 'Vui lòng lựa chọn Category cần xóa'
      })
    }
  

}

const handleDelete = (id) => {
  if (id === undefined){
    setReload(!reload);
  }
  else {
      delcate(id)
      setReload(!reload);
      dispatch(load(reload))
  }
}

const handleRestore = (id) => {
  patchcate({id: id, delete: false})
  setReload(!reload);
  dispatch(load(reload))
}

const handleDelitem = (e) => {
    // xóa từng item
if (e.id === undefined){
  setReload(!reload);
}
else {
    patchcate({id: e.id, delete: true})
    setReload(!reload);
}
  };



  const onSelectChange = (newSelectedRowKeys) => {
    // lưu key trả về khi select thay đổi

    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    //các checkbox
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
   
      sorter: (a, b) => a.id - b.id, 
    },
    {
      title: "Category",
      dataIndex: "cate",
      key: "cate",
      editable: true,
      ...getColumnSearchProps("cate"),  // search cate
    },
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      editable: true,
      render: (text) => {
      
        return (<>
           {text === undefined ? '' : (<img src={text} alt="Icon" style={{ width: 30, height: 30 }} />)} 
        </>)
      } ,
    },
    {
      title: "Trạng thái Category",
      dataIndex: "delete",
      key: "delete",
    
      render: (text) => {
      if (text === true){
        return (
          <>
            <div className="">
            <Tag color="#f50">Đã xóa</Tag>
            </div>
          </>
        )
      }
       else {
        return (
          <>
            <div className="">
            <Tag color="#2db7f5">Chưa xóa</Tag>
            </div>
          </>
        )
       }
      } ,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        const checkDelete = record.delete;
        console.log(checkDelete);
        return (
          <>
          {checkDelete === false || checkDelete === undefined ? (<> <Space size="middle">
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
              {editable ? (  // nếu bấm vô edit thì hiện ra
              <span>
                <Typography.Link
                  onClick={() => save(record.key)}
                  style={{
                    marginRight: 8,
                    marginLeft: 18,
                  }}
                >
                  Save
                </Typography.Link>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
              ) : ( // nếu không thì ko hiện
<Tooltip title="Chỉnh sửa" color="#232B99" >
     <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
            
              >
                <Button type="primary"   style={{
                    marginRight: 8,
                    marginLeft: 8,
                  
                  }} icon={<img width="20" height="20" src="https://img.icons8.com/metro/26/FFFFFF/create-new.png" alt="create-new"/>}></Button>
              </Typography.Link>
</Tooltip>
             

              )}
              </Space></>) : (<>
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
              </>)}
           
          </>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {  // hỗ trợ cột mở để có thể nhập dữ liệu vào
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
        editing: isEditing(record),
      }),
    };
  });

  return (
    <>
      <div className="categorylist">
        <h1 className="categorylist--top__h1">Danh sách Category</h1>
        <div className="categorylist--top">
          <Button className="categorylist--top__bt1" type="primary" onClick={handleXoa}>
            Xóa
        </Button>
        <Button className="categorylist--top__bt2" type="primary" onClick={() => save(-1)}>
       Thêm Category
    </Button>
        </div>
        
        <Form form={form} component={false}>
          <Table className="categorylist--table"
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={dataSource}
            rowSelection={{
              ...rowSelection,
            }}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              pageSize: 50,
            }}
          />
          ;
        </Form>
      </div>
    </>
  );
};

export default CategoryList;
