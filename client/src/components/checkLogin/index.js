import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { postUserLogin } from "../../service/post/post";
import { setCookie } from "../setTime/setTime";

export const checkLogin = async (e) => {
  const checkDataLogin = async (values) => {
    const result = await postUserLogin(values);
    return result;
  };
  var checkData = await checkDataLogin(e);
  if (checkData.code === 400) {
    Swal.fire({
      icon: "error",
      title: "ĐĂNG NHẬP KHÔNG THÀNH CÔNG",
      text: `${checkData.message}`,
    });
  } else {
    // document.cookie= `token=${checkData.token}`;
    fetch(`http://localhost:3000/cart?user=${checkData.id}`)
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem(checkData.token, JSON.stringify(result));
      });
    if (checkData.type === "admin") {
      Swal.fire({
        icon: "success", // sử dụng icon "success" cho thông báo thành công
        title: "Đăng nhập vào trang Admin thành công",
        text: "Chào mừng chủ cửa hàng 3Tstore đã đăng nhập!",
      }).then((result) => {
        // đoạn mã được thực thi khi người dùng ấn nút OK trong thông báo
        if (result.isConfirmed) {
          window.location.href = "/admin/dash";
          setCookie("token", checkData.token, 15);
        }
      });
    } else {
      Swal.fire({
        icon: "success", // sử dụng icon "success" cho thông báo thành công
        title: "Đăng nhập thành công",
        text: "Chào mừng bạn đã đăng nhập!",
      }).then((result) => {
        // đoạn mã được thực thi khi người dùng ấn nút OK trong thông báo
        if (result.isConfirmed) {
          setCookie("token", checkData.token, 15);
          window.location.href = "/";
        }
      });
    }
  }

};
