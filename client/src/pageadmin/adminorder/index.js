import React, { useEffect, useState } from "react";
import { Button, Table, Tag } from "antd";

import "./adminorder.scss"
import { patchPur } from "../../service/patch/patch";
import { getAllOrder } from "../../service/getcategory/getCategory";




const Adminorder = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const [checkDel, setcheckDel] = useState(false)
  var  previousData = [{userId : "" , date: ""}] ;

const patchpur = async (id, data) => {
  const result = await patchPur(id, data)
}


  const handleOrderStepChange = (record, action) => {
    const updatedData = data.map((item) => {
      if (item.date === record.date && item.userId === record.userId) {
        let newOrderStep;
        if (action === "increase") {
          newOrderStep = Math.min(item.orderStep + 1, 3);
         
        } else {
          newOrderStep = Math.max(item.orderStep - 1, 0);
         
        }
  
        return {
          ...item,
          orderStep: newOrderStep,
        };
      }
      return item;
    });
    
    setData(updatedData);
    const timkiem = updatedData.find(item => {
      return item.date === record.date && item.userId === record.userId
    })
    console.log(timkiem.purchaseId)
    patchpur(timkiem.purchaseId,  timkiem.orderStep)
  };
  
  const getTagColor = (orderStep, record) => {
   
  };
  
  const getTagText = (orderStep, record) => {
    return orderStep
  };
  
  const columns = [
    {
      title: "UserId",
      dataIndex: "userId",
      sorter: (a, b) => a.userId - b.userId,
    },
    {
      title: "Ngày đặt",
      dataIndex: "date",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.date > b.date,
    },
    {
      title: "Tên Sản Phẩm",
      dataIndex: "title",
    },
    {
      title: "Đơn Giá",
      dataIndex: "dongia",
    },
    {
      title: "Số Lượng",
      dataIndex: "soluong",
    },
    {
      title: "Thành Tiền",
      dataIndex: "thanhtien",
    },
    {
      title: "Hình Thức Thanh Toán",
      dataIndex: "paymentMethod",
    },
    {
      title: "Trạng Thái Thanh Toán",
      dataIndex: "paymentStatus",
      render: (_, record) => {
        if (record.paymentMethod === "Tiền mặt") {
          if (record.orderStep !== 3) {
            return <Tag color="#f50">Chưa trả tiền</Tag>;
          } else {
            return <Tag color="#2db7f5">Đã trả tiền</Tag>;
          }
        } else {
          return <Tag color="#2db7f5">Đã trả tiền</Tag>;
        }
      },
    },
    {
      title: "Quá Trình Giao Hàng",
      dataIndex: "orderStep",
      render: (orderStep, record) => {
            
   const check = previousData.every(item => {
   
    return item.userId === record.userId && item.date === record.date
   })

if (check === false) {
  previousData = ([{ userId: record.userId , date: record.date}])
}


        return (
          <>
           {check === false ? (  <>
         
          
            <div className="adminorder" style={{ marginTop: 8 }}>
              <Button
                size="small"
                onClick={() => handleOrderStepChange(record, "decrease")}
                disabled={orderStep === 0}
              >
               <img width="15" height="15" src="https://img.icons8.com/android/24/minus.png" alt="minus"/>
              </Button>
              <Tag color={getTagColor(orderStep, record)}>
              {getTagText(orderStep, record)}
            </Tag>
              <Button
              className="admininfor--increase"
                size="small"
                onClick={() => handleOrderStepChange(record, "increase")}
                disabled={orderStep === 3}
                style={{ marginLeft: 8 }}
              >
               <img width="15" height="15" src="https://img.icons8.com/android/24/plus.png" alt="plus"/>
              </Button>
            </div>
          </>) : ("")}
          </>
        );
      },
      filters: [
        {
          text: "Đã nhận được hàng",
          value: 0,
        },
        {
          text: "Đã xuất kho",
          value: 1,
        },
        {
          text: "Đang giao hàng",
          value: 2,
        },
        {
          text: "Giao hàng thành công",
          value: 3,
        },
      ],
      onFilter: (value, record) => {
        return record.orderStep === value;
      },
      sorter: (a, b) => a.orderStep - b.orderStep,
     
    },
    
  ];


  const fetchPur = async () => {
    const result = await getAllOrder();
    const updatedData = result.map((item) => {
      const { orderStep, date, userId, thanhtoan, id, paymentMethod } = item;

      // Thêm dữ liệu vào mỗi đối tượng trong mảng thanhtoan
      const updatedThanhtoan = thanhtoan.map((product) => {
        return {
          ...product,
          orderStep,
          date,
          userId,
          paymentMethod,
          purchaseId: id
        };
      });

      // Trả về đối tượng được cập nhật
      return {
        ...updatedThanhtoan,
      };
    });
    
    const objects = [].concat(...updatedData.map((item) => Object.values(item)));
    const newArray = objects.map((item, index) => {
      return {
        ...item,
        key: index, 
      };
    });
    setData(newArray);
  };

  useEffect(() => {
    fetchPur();
  }, []);

  const onSelectChange = (newSelectedRowKeys) => {
    // lưu key trả về khi select thay đổi
  console.log(newSelectedRowKeys)
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    //các checkbox
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleClick = () => {
   
    if(selectedRowKeys != []) {
        const findDel = selectedRowKeys.map(item => {
          const hi = data.filter(x => {
          
            return item != x.key
           })
           
           return hi;
        })
   
   const red =  findDel.reduce ((origin, item) => {   // origin là mảng đầu tiên
    return origin.filter(obj1 =>
     item.some(obj2 => obj2.key === obj1.key)  // không dùng find vì nếu có cùng key thì nó sẽ lấy thằng đầu ( hi hữu )
    );
   },findDel[0].slice())
   // giải thích :
   // - origin giữ vị trị đầu tiền của mảng findDel (findDel là một mảng chứa nhiều mảng có object)
   // - origin sử dụng filter để check những object trong mảng đầu tiên và check với item đầu tiên là mảng đầu tiên luôn (giống origin hiện tại) và check xong nó sẽ trả về mảng đầu tiên cho object 
   // - từ đó item sẽ bám vào mảng thứ 2 và origin là mảng mới được check nó sẽ check típ với item đó và trả về origin chung của mảng 1 và 2 và từ orgin chung đó nếu còn mảng tiếp theo thì cũng sẽ tiếp tục check cho đến khi có origin chung cuối cùng thì return về kết quả
   setData(red)
   const groupedArrays = red.reduce((result, currentObject) => {
    const existingGroup = result.find(group => group[0].purchaseId === currentObject.purchaseId);
  console.log(existingGroup)
  console.log(result);
    if (existingGroup) {
      existingGroup.push(currentObject);
    } else {
      result.push([currentObject]);
    }
  
    return result;
  }, []);
  
  console.log(groupedArrays)
    }
    else { 
      //
    }
  }
  return (
    <>
    <div className="adminorder--table">
    <div className="adminorder--control">
        <h1>Đơn Hàng</h1>
        <Button type="primary" onClick={handleClick} >Xóa</Button>
    </div>
    
  <Table
        pagination={{
          pageSize: 50,
        }}
        scroll={{
          y: 500,
        }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        bordered
      />
    </div>
    
    </>
  );
};

export default Adminorder;

