import "./homeSider.scss";
import React, { useEffect, useRef, useState } from "react";
import { Menu } from "antd";
import { AlignLeftOutlined } from "@ant-design/icons";
import { getCategory } from "../../service/getcategory/getCategory";
import { getProduct_cate } from "../../service/getcategory/getCategory";
import { Await, Link } from "react-router-dom";
import { get } from "../../tienich/request";
import { useSelector } from "react-redux";
function Homesider() {
  const render = useSelector((state) => state.Reload);
  const [data, setData] = useState([
    {
      id: "",
    },
  ]);
  const [data_1, setData_1] = useState([
    {
      title: "",
    },
  ]);

  useEffect(() => {
    const fetchapi = async () => {
      const res = await getCategory();
      if (!res) {
        console.error("loi");
      } else {
        setData(res);
      }
    };

    fetchapi();
  }, [render]);


  useEffect(() => {
    const fetchData2 = async () => {
      const newData2 = [];
      for (const item of data) {
        const result = await getProduct_cate(item.cate);
        newData2.push(result);
      }
      
      setData_1(newData2);
    };

    fetchData2();
  }, [render, data]);

  return (
    <>
      <div className="homesider">
        <div className="homesider--category">
          <AlignLeftOutlined className="homesider--icon" />
          <h1 className="homesider--h1">Danh mục sản phẩm</h1>
        </div>

        <div className="homesider--collection">
          {data.map((item, index) => (
            <div>
            <Link to={'/category/' + item.cate} >
              <div className="homesider--product" key={item.id}>
                <Menu
                  className="homesider--product__menu"
                  mode="vertical"
                  items={[
                    {
                      icon: (
                        <img
                          className="homesider--product__img"
                          src={item.icon}
                          alt="Icon"
                        />
                      ),
                      label: item.cate,

                      children: Array.isArray(data_1[index])
                        ? data_1[index].map((x) => (
                          {
                            label: <Link to={`/product/${x.id}`} key={x.title}>{x.title}</Link>,

                          }
                          ))
                        : null,
                    },
                  ]}
                />
              </div>
              </Link>
              <hr className="homesider--hr" />
            </div>
          ))}
        </div>

        <div className="homesider--giaohang">
          <img src="https://img.icons8.com/clouds/100/truck.png" alt="truck" />
          <p>Giao hàng đúng giờ</p>
        </div>
        <div className="homesider--giaohang">
          <img
            src="https://img.icons8.com/color-glass/48/hand-box.png"
            alt="hand-box"
          />
          <p>Ưu đãi hấp dẫn mỗi ngày</p>
        </div>
        <div className="homesider--lienhe">
          <img
            src="https://img.icons8.com/bubbles/50/phone--v1.png"
            alt="phone--v1"
          />
          <div className="homesider--lienhe__phone">
            <strong>gọi mua hàng: 0399038165</strong>
            <p>(7h-22h T2-T7)</p>
          </div>
        </div>
      </div>
      
    </>
  );
}
export default Homesider;
