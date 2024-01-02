import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { postUserLogin } from "../../service/post/post";
import { setCookie } from "../setTime/setTime";

export const checkLogin = async (e) => {
  const checkDataLogin = async (values) => {
    console.log(values);
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
    setCookie("token", checkData.token, 1);
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
          window.location.href = "/";
        }
      });
    }
  }

  // let newState = 0;
  // fetch("http://localhost:3000/users")
  //   .then((res) => res.json())
  //   .then((data) => {

  //     const checkDelete = data.find((item) => {
  //       return (
  //         e.password === item.password && e.username === item.username
  //       );
  //     });
  //     for (let i = 0; i < data.length; i++) {
  //       if (
  //         e.password === data[i].password &&
  //         e.username === data[i].username &&
  //         checkDelete && checkDelete.delete === false
  //       ) {
  //         newState = data[i].token;
  //         if (data[i].token.includes("admin0305")) {
  //           Swal.fire({
  //             icon: "success", // sử dụng icon "success" cho thông báo thành công
  //             title: "Đăng nhập vào trang Admin thành công",
  //             text: "Chào mừng chủ cửa hàng 3Tstore đã đăng nhập!",
  //           }).then((result) => {
  //             // đoạn mã được thực thi khi người dùng ấn nút OK trong thông báo
  //             if (result.isConfirmed) {
  //               window.location.href = "/admin/dash";
  //             }
  //           });
  //         } else {
  //           Swal.fire({
  //             icon: "success", // sử dụng icon "success" cho thông báo thành công
  //             title: "Đăng nhập thành công",
  //             text: "Chào mừng bạn đã đăng nhập!",
  //           }).then((result) => {
  //             // đoạn mã được thực thi khi người dùng ấn nút OK trong thông báo
  //             if (result.isConfirmed) {
  //               window.location.href = "/";
  //             }
  //           });
  //         }

  //         document.cookie = "token=" + newState;
  //         fetch(`http://localhost:3000/cart/${data[i].id}`)
  //           .then((res) => res.json())
  //           .then((result) => {
  //             localStorage.setItem(data[i].token, JSON.stringify(result));
  //           });
  //       } else if (checkDelete && checkDelete.delete === true) {
  //         Swal.fire({
  //           icon: "error",
  //           title: "ĐĂNG NHẬP KHÔNG THÀNH CÔNG",
  //           text: "TÀI KHOẢN CỦA BẠN ĐÃ BỊ KHÓA!",
  //         });
  //         newState = 1;
  //       }
  //     }
  //     if (newState === 0) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "ĐĂNG NHẬP KHÔNG THÀNH CÔNG",
  //         text: "MỜI BẠN ĐĂNG NHẬP LẠI",
  //       });
  //     }
  //   });
};
