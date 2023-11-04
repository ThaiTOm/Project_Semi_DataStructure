import { Content } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import "./cart.scss";
import { useEffect, useState } from "react";
import { down, up, xoa, xoahet } from "../../actions/actCart";
import { getCookie } from "../../components/takeCookies/takeCookies";
import { getCart, getUserstk } from "../../service/getcategory/getCategory";
import { patchCart } from "../../service/patch/patch";
function Cart() {
  const storedData = JSON.parse(localStorage.getItem(getCookie("token")));
  console.log(storedData);
  const products = useSelector((state) => state.cartStore);
  const [data, setData] = useState([]);
  const [data_2, setData_2] = useState();
  const [data_3, setData_3] = useState();
  const dispatch = useDispatch();
  var tong = 0;
  for (let i = 0; i < products.length; i++) {
    tong +=
      products[i].quanlity *
      (
        products[i].infor.price *
        ((100 - Math.floor(products[i].infor.discountPercentage)) / 100)
      ).toFixed();
  }
  const cookies = getCookie("token");

  useEffect(() => {
    const fetchApi = async (e) => {
      try {
        const result = await getUserstk(e);
        // Xử lý dữ liệu ở đây sau khi nhận được kết quả từ getUserstk
        setData(result);
      } catch (error) {
        console.error("Error in fetchhApi:", error);
        throw new Error("Failed to fetch data");
      }
    };

    fetchApi(cookies);
  }, []);

  useEffect(() => {
    if (data && data.length > 0) {
      setData_2({
        id: data[0].id,
        userId: data[0].id,
        product: [...products],
      });
    }
  }, [products, data]);
  console.log(data_2);

  useEffect(() => {
    if (data_2 && Object.keys(data_2).length > 0) {
      const patchApi = async (data) => {
        try {
          const result = await patchCart(data); // Gọi hàm patchCart với tham số là data
          console.log(result);
        } catch (error) {
          console.error("Error while patching cart:", error);
          // Xử lý lỗi nếu có, có thể log ra console hoặc thực hiện các hành động khác
        }
      };

      patchApi(data_2); // Gọi hàm patchApi với tham số là data_2
      localStorage.setItem(cookies, JSON.stringify(data_2));
    }
  }, [data_2]);

  return (
    <>
      <Content className="cart--content">
        <div className="cart--top">
          <h2>DANH SÁCH GIỎ HÀNG</h2>
          <button className="cart--button" onClick={() => dispatch(xoahet(-1))}>
            {" "}
            Xóa tất cả{" "}
          </button>
        </div>

        <div className="cart">
          {data_2 && data_2.product && data_2.product.length > 0 ? (
            data_2.product.map((item) => (
              <div className="cart--main">
                <div className="cart--left">
                  <img
                    src={item.infor.thumbnail}
                    alt={item.infor.title}
                    className="cart--left__img"
                  />
                  <div className="cart--infor">
                    <h4 className="cart--infor__h4">{item.infor.title}</h4>

                    {item.infor.discountPercentage !== 0 ? (
                      <p className="cart--infor__p1">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(
                          `${
                            item.infor.price *
                            ((100 - Math.floor(item.infor.discountPercentage)) /
                              100)
                          }`
                        )}
                      </p>
                    ) : (
                      ""
                    )}
                    <div className="cart--infor__price">
                      <p
                        className={`cart--infor__p2 ${
                          item.infor.discountPercentage !== 0
                            ? "gachngang"
                            : "cart--infor__p3"
                        }`}
                      >
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(`${item.infor.price}`)}
                      </p>
                      <div>
                        {item.infor.discountPercentage !== 0
                          ? `${item.infor.discountPercentage}%`
                          : ""}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cart--right">
                  <div className="cart--control">
                    <button
                      className="cart--control__b1"
                      onClick={() => dispatch(down(item.id))}
                    >
                      -
                    </button>
                    <div className="cart--control__display">
                      {item.quanlity}
                    </div>
                    <button
                      className="cart--control__b2"
                      onClick={() => dispatch(up(item.id))}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="cart--right__delete"
                    onClick={() => dispatch(xoa(item.id))}
                  >
                    Xoa
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div class="cart-empty">
              <p>Giỏ hàng của bạn hiện tại đang trống.</p>
              <p>
                Hãy khám phá sản phẩm thức uống của chúng tôi và thêm những món
                hàng mà bạn thích!!
              </p>
            </div>
          )}
          <div className="cart--sum">
            Tổng tiền:{" "}
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(`${tong}`)}
            </span>{" "}
          </div>
        </div>
      </Content>
    </>
  );
}
export default Cart;
