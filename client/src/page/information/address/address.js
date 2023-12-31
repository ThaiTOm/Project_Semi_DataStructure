import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Col,
  Row,
  Modal,
  AutoComplete,
  Checkbox,
  message,
  Result,
  Popconfirm,
} from "antd";
import "./address.scss";
import { PlusOutlined } from "@ant-design/icons";
import {
  getMyUser,
  getShip,
  getUserstk,
} from "../../../service/getcategory/getCategory";
import { getCookie } from "../../../components/takeCookies/takeCookies";
import { postShipping } from "../../../service/post/post";
import { patchBool } from "../../../service/patch/patch";
import { delShip } from "../../../service/delete/delete";
import { useNavigate } from "react-router-dom";
import {
  checkAddress,
  checkVietnamesePhoneNumber,
} from "../../../components/checkInformation/checkInformation"; // check số điện thoại vn, địa chỉ
const Address = () => {
  const [form] = Form.useForm(); // Quản lí form
  const [open, setOpen] = useState(false); // set mở modal
  const [confirmLoading, setConfirmLoading] = useState(false); // bấm nút thì nó loading
  const [addresses, setAddresses] = useState([]); // địa chỉ mô phỏng
  const [submit, setSubmit] = useState([]); // gias tri sau khi submit
  const [show, setShow] = useState(true); // bấm cập nhật là show
  const navigate = useNavigate();
  const [shipid, setShipid] = useState({
    id: 0,
  });
  const [ship, setShip] = useState([]); // lấy tất cả dữ liệu địa chỉ của user đang đăng nhập
  const [data, setData] = useState([]); // dữ liệu của người đang đăng nhập
  const cookies = getCookie("token"); // lấy token từ cookie
  const [checkaddress, setCheckaddress] = useState("block");
  const [checkphone, setCheckphone] = useState("block");
  const postship = async (e) => {
    // hàm đưa dữ liệu lên data shipping
    const result = await postShipping(e);
    if (data && data.code === 200) {
      getship(data.id); // sau khi nhập thì render lại trang với giá trị ship mới
    }
  };

  const getship = async (e) => {
    // hàm lấy dữ liệu shipping của user đang sử dụng
    const result = await getShip(e);
    console.log(result);
    setShip(result);
  };

  const patchbool = async (e) => {
    // cập nhật giá trị mặc định
    const result = await patchBool(e);
    if (data && data.code === 200) {
      getship(data.id); // sau khi nhập thì render lại trang với giá trị ship mới
    }
  };

  const del = async (e) => {
    console.log(e);
    const result = await delShip(e);
    if (data && data.code === 200) {
      getship(data.id); // sau khi nhập thì render lại trang với giá trị ship mới
    }
  };

  const fetchApick = async (e) => {
    try {
      const result = await getMyUser(e); // lấy dữ liệu tài khoản của người đang đăng nhập
      setData(result);
      getship(result.id); // lấy dữ liệu shipping của user khi mới đăng nhập
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchApick(cookies); // lấy thông tin user từ cookie
  }, [cookies]);

  const showModal = () => {
    setShipid({
      id: 0,
    });
    // bấm nút show modal
    setOpen(true);
    form.setFieldsValue({
      fullName: "",
      phoneNumber: "",
      address: "",
      defaultAddress: "",
    });
  };
  // bấm nút hủy show

  const handleCancel = () => {
    setCheckaddress(checkAddress("", 1));
    setOpen(false);
    setShipid({
      id: 0,
    });
  };

  const handleOk = () => {
    // submit form
    form.submit();
  };

  const handleSelect_1 = (e) => {
    // chon dia chi
    setSubmit({
      ...submit,
      address: e,
    });
  };

  const handleDelete = async (e) => {
    const xoa = ship.find((item) => {
      return item.id === e;
    });

    if (xoa.delivery[0].defaultAddress === false) {
     await del(e);
    } else {
      message.error({
        content: "Đây là địa chỉ mặc định. Không thể xóa !",
        className: "custom-class",
        style: {
          marginTop: "5vh",
          padding: "2vh",
        },
      });
    }
  };

  const handleClick_1 = (x) => {
    setOpen(true);
    setShow(true);
    const search = ship.find((item) => {
      return item.id === x.id;
    });

    form.setFieldsValue({
      fullName: search.delivery[0].fullName,
      phoneNumber: search.delivery[0].phoneNumber,
      address: search.delivery[0].address,
      defaultAddress: search.delivery[0].defaultAddress,
    });
    setShipid(x);
  };

  const handleClick = async (a, b) => {
    // hàm chuyển đổi thiết lập mặc định

    try {
      // thử lỗi
      const valuesbool = ship.filter((item) => {
        return item.delivery[0].defaultAddress === true;
      });

      if (valuesbool.length > 0) {
        await patchbool({
          id: valuesbool[0].id,
          delivery: [
            {
              ...valuesbool[0].delivery[0],
              defaultAddress: false,
            },
          ],
        });
      }

      await patchbool({
        id: a,
        delivery: [
          {
            ...b,
            defaultAddress: true,
          },
        ],
      });

      await getship(data.id);
    } catch (error) {
      // lỗi thì ra đường này
      console.error("Error setting default address:", error);
    }
  };
  const onAddressSearch = async (value) => {
    // xem thông tin lúc người dùng nhập

    const YOUR_API_KEY = "EAddPu1fx9SFE8rAE7Ogdp1rheIPEfrhiAB65nif"; // mã api key của goong map

    const apiUrl = `https://rsapi.goong.io/Place/AutoComplete?api_key=${YOUR_API_KEY}&input=${value}&more_compound=true`; // api bên ngoài truy cập dữ liệu map

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        // Xử lý dữ liệu trả về từ Goong API ở đây
        const namesArray = data.predictions.map((item) => item.description);
        console.log("Geocoding data:", namesArray);
        setAddresses(namesArray); // lưu giá trị address
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      }); // quan trọng vô cùng nên không được xóa // nếu tới khi kiểm tra thì mở cái này ra
    // const namesArray = [

    //   // address ví dụ
    //   "63/1 Trần Hưng Đạo, Quận 1, TP.HCM",
    //   " 144 Xuân Thủy, Cầu Giấy, Hà Nội",
    //   "112 Nguyễn Huệ, Quận 2, TP. Hải Phòng",
    //   "101 Trần Hưng Đạo, TP. Cần Thơ",
    //   "789 Phan Đình Phùng, Thành phố Đà Nẵng",
    //   "456 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
    //   "23 Đinh Tiên Hoàng, Quận Hoàn Kiếm, Hà Nội",
    //   "93 Hồ Văn Huê, phường 9, phú nhuận",
    //   "15 Tiền Giang, Phước Hải, Nha Trang",
    //   "1079 đường 23/10, Vĩnh Hiệp, Nha Trang",
    // ];

    setSubmit({
      ...submit, // thêm giá trị address vào submit
      address: value,
    });
  };

  const onFinish = (values) => {
    // hàm xử lí sau khi tạo mới
    setCheckaddress(checkAddress(values.address));
    setCheckphone(checkVietnamesePhoneNumber(values.phoneNumber));
    if (
      checkAddress(values.address) === "block" &&
      checkVietnamesePhoneNumber(values.phoneNumber) === "block"
    ) {
      const valuesbool =
        ship &&
        ship.filter((item) => {
          // lọc dữ liệu nào đang true
          return item.delivery[0] && item.delivery[0].defaultAddress === true;
        });
      if (values.defaultAddress === true && valuesbool.length > 0) {
        // nếu trong values mà người dùng nhập có defaultAddres là true thì chuyển những đ/c còn lại thành false
        patchbool({
          id: valuesbool[0].id,
          delivery: [
            {
              ...valuesbool[0].delivery[0],
              defaultAddress: false,
            },
          ],
        });
      }
      // khi bấm tạo mới

      setConfirmLoading(true); // xoay load
      setTimeout(() => {
        setConfirmLoading(false);
        setOpen(false);
        setShow(false);
      }, 2000); // Giả định xử lý dữ liệu mất 2 giây
      setSubmit({
        // thêm dữ liệu vào submit
        ...submit,
        ...values,
      });

      const checkship = ship.map((item) => {
        // check qua từng đứa trong dữ liệu user
        const result = item.delivery.some((x) => {
          // kiểm tra dữ liệu đúng hay sai để cho phép tạo mới hay không

          return (
            x.address === { ...submit, ...values }.address &&
            x.fullName === { ...submit, ...values }.fullName &&
            x.phoneNumber === { ...submit, ...values }.phoneNumber
          );
          // chỉ cần 1 thằng khác biệt thì sẽ trả về false => được cho phép tạo mới khi không có dữ liệu nào trùng
          // và ngược lại nếu đúng hết toàn bộ thì sẽ trả về là true => không cho phép tạo mới vì đã có địa chỉ giống
        });
        return result;
      });
      let soluongfalse = 0;

      for (let item of checkship) {
        if (item === false) {
          soluongfalse++; // kiểm tra số lượng false
        }
      }
      const updatetrung = ship.find((item) => {
        const result = item.delivery.find((x) => {
          return (
            x.address === { ...submit, ...values }.address &&
            x.fullName === { ...submit, ...values }.fullName &&
            x.phoneNumber === { ...submit, ...values }.phoneNumber
          );
        });
        return result;
      });

      if (shipid.id === 0) {
        // vì nếu có true thì sẽ có 1 đứa bị trùng và điều đó là cấm kị
        if (soluongfalse === checkship.length) {
          if (ship.length === 0) {
            postship({
              // gửi dữ liệu địa chỉ của người dùng
              user: data.id,
              delivery: [
                {
                  ...submit,
                  ...values,
                  defaultAddress: true, // nếu là giá trị đầu tiện trong shipping thì sẽ là địa chỉ mặc định
                },
              ],
            });
          } else {
            postship({
              // ngược lại thì không cần xét
              // gửi dữ liệu địa chỉ của người dùng
              user: data.id,
              delivery: [
                {
                  ...submit,
                  ...values,
                  defaultAddress: false
                },
              ],
            });
          }
        } else if (soluongfalse !== checkship.length) {
          if (updatetrung.delivery[0].defaultAddress === false) {
            if (values.defaultAddress === true) {
              handleClick(updatetrung.id, updatetrung.delivery[0]);
            } else {
              // thong bao
            }
          } else if (updatetrung.delivery[0].defaultAddress === true) {
            if (values.defaultAddress === true) {
              patchbool({
                id: updatetrung.id,
                delivery: [
                  {
                    ...submit,
                    ...values,
                  },
                ],
              });
            } else {
              //
            } // đánh dấu có gì thì sửa =>
          }
        }
      } else if (shipid.id !== 0) {
        if (updatetrung) {
          if (
            updatetrung.id === shipid.id &&
            updatetrung.delivery[0].defaultAddress === false &&
            values.defaultAddress === true
          ) {
            handleClick(updatetrung.id, updatetrung.delivery[0]);
          }
        } else if (soluongfalse === checkship.length) {
          if (shipid.delivery[0].defaultAddress === true) {
            patchbool({
              id: shipid.id,
              delivery: [
                {
                  ...submit,
                  ...values,
                  defaultAddress: true,
                },
              ],
            });
          } else {
            patchbool({
              id: shipid.id,
              delivery: [
                {
                  ...submit,
                  ...values,
                },
              ],
            });
          }
        }
      }
    } else {
      //
    }
  };

  const handleChange = () => {
    setCheckaddress("block");
  };

  const handleChange_1 = () => {
    setCheckphone("block");
  };

  return (
    <>
      <div className="address">
        <div className="address--header">
          <h2>Địa chỉ của tôi</h2>
          <Button
            className="button"
            icon={<PlusOutlined />}
            onClick={showModal}
          >
            Thêm địa chỉ mới
          </Button>
        </div>
        <Modal
          title="Thêm địa chỉ mới"
          open={open}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Trở lại
            </Button>,
            <Button
              key="submit"
              onClick={handleOk}
              type="primary"
              loading={confirmLoading}
            >
              Tạo mới
            </Button>,
          ]}
        >
          <div className="address--form">
            <Form
              form={form}
              preserve={false}
              name="basic"
              onFinish={onFinish}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item
                label="Họ tên"
                name="fullName"
                rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
              >
                <Input placeholder="Mời bạn nhập họ tên" />
              </Form.Item>

              <Form.Item
                label="Số điện thoại"
                name="phoneNumber"
                rules={[
                  { required: true, message: "Vui lòng nhập số điện thoại!" },
                ]}
              >
                <Input
                  onChange={handleChange_1}
                  placeholder="Mời bạn nhập số điện thoại"
                />
              </Form.Item>
              <>
                <div
                  className={
                    checkphone === "block" ? "address--block" : "address--check"
                  }
                >
                  {checkphone}
                </div>
              </>
              <Form.Item label="Địa chỉ" name="address">
                <AutoComplete
                  onChange={handleChange}
                  onSelect={handleSelect_1}
                  options={addresses.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  placeholder="mời bạn nhập địa chỉ"
                  onSearch={onAddressSearch}
                ></AutoComplete>
              </Form.Item>
              <>
                <div
                  className={
                    checkaddress === "block"
                      ? "address--block"
                      : "address--check"
                  }
                >
                  {checkaddress}
                </div>
              </>
              {(shipid &&
                shipid.delivery &&
                shipid.delivery[0] &&
                shipid.delivery[0].defaultAddress === false) ||
              shipid.id === 0 ? (
                <Form.Item name="defaultAddress" valuePropName="checked">
                  <Checkbox defaultChecked={false}>
                    Đặt làm địa chỉ mặc định
                  </Checkbox>
                </Form.Item>
              ) : (
                ""
              )}
            </Form>
          </div>
        </Modal>
        <div className="address--content">
          <hr />
          <h1>Địa chỉ</h1>

          {ship &&
          ship[0] &&
          ship[0].delivery &&
          ship[0].delivery.length > 0 ? (
            ship.map((item) => (
              <div className="address--item">
                <div className="address--item__infor">
                  <div className="address--item__main">
                    <p className="address--item__p">Họ và tên:</p>
                    <span>{item.delivery[0].fullName}</span>
                    {/* { item.delivery[0].

                      } */}
                    {item.delivery[0].defaultAddress === true ? (
                      <div className="address--item__macdinh">
                        <img
                          className="address--item__img"
                          width="16"
                          height="16"
                          src="https://img.icons8.com/office/16/checked--v1.png"
                          alt="checked--v1"
                        />
                        <p>Địa chỉ mặc định</p>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="address--item__main">
                    <p className="address--item__p">Địa chỉ:</p>
                    <span>{item.delivery[0].address}</span>
                  </div>
                  <div className="address--item__main">
                    <p className="address--item__p">Số điện thoại:</p>
                    <span>{item.delivery[0].phoneNumber}</span>
                  </div>
                </div>
                <div className="address--item__button">
                  <Row gutter={[6, 6]}>
                    <Col span={12}>
                      <Button
                        type="primary"
                        block
                        onClick={() => handleClick_1(item)}
                      >
                        Cập nhật
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Popconfirm
                        title="Xóa Địa Chỉ Này?"
                        description="Bạn Có Chắc Là Xóa Địa Chỉ Này Chứ?"
                        okText="Chắc Chắn Rồi"
                        cancelText="Hong Chắc Lắm"
                        onConfirm={() => handleDelete(item.id)}
                      >
                        <Button type="primary" block>
                          Xóa
                        </Button>
                      </Popconfirm>
                    </Col>
                    <Col span={24}>
                      <Button
                        type="primary"
                        block
                        onClick={() => handleClick(item.id, item.delivery[0])}
                      >
                        Thiết lập mặc định
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            ))
          ) : (
            <Result
              status="warning"
              title="Vui Lòng Nhập Địa Chỉ Để Thanh Toán Đơn Hàng."
            />
          )}
        </div>
      </div>
    </>
  );
};
export default Address;
