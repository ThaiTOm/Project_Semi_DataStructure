import { Button, Col, Row, notification } from "antd";
import { Content } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import "./Items.scss";
function Items({
  paginatedData,
  checkId,
  cookies,
  dispatch,
  navigate,
  id,
  AddtoCart,
}) {
  const [api, contextHolder] = notification.useNotification();
  const handleAddCart = (itemId, item) => {
    AddtoCart(itemId, item, checkId, cookies, dispatch, navigate);
    api.success({
      message: "Thêm vào giỏ hàng thành công",
      duration: 0.5,
    });
  };

  return (
    <>
     {contextHolder}
      <Content className="Items">
        <Row gutter={[0, 10]}>
          {paginatedData.length > 0 && Array.isArray(paginatedData[id]) ? (
            paginatedData[id].map((item) => (
              <Col className="Items--col ">
                <Link to={"/product/" + item.id}>
                  <div className="Items--item">
                    <div className="Items--item__top">
                      <img src={item.thumbnail} />
                    </div>
                    <div className="Items--item__under">
                      <h3>{item.title}</h3>
                      {item.discountPercentage !== 0 ? (
                        <p className="Items--item__p1">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(
                            `${
                              item.price *
                              ((100 - Math.floor(item.discountPercentage)) /
                                100)
                            }`
                          )}
                        </p>
                      ) : (
                        ""
                      )}
                      <div className="Items--item__price">
                        <p
                          className={`Items--item__p2 ${
                            item.discountPercentage !== 0
                              ? "gachngang"
                              : "tomau"
                          }`}
                        >
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(`${item.price}`)}
                        </p>
                        <div className="dc">
                          {item.discountPercentage !== 0
                            ? `${item.discountPercentage}%`
                            : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="Items--item__add">
                  <Button
                    shape="circle"
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() =>
                      handleAddCart(item.id, item)
                    }
                  ></Button>
                </div>
              </Col>
            ))
          ) : (
            <div class="Items--message">
              <h2>Sản phẩm không được tìm thấy!</h2>
              <p>Xin lỗi, không có sản phẩm phù hợp với yêu cầu của bạn.</p>
            </div>
          )}
        </Row>
      </Content>
    </>
  );
}
export default Items;
