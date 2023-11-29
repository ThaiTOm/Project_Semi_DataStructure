import { Modal } from "antd";
import { add, up } from "../../actions/actCart";

// xử lí logic hãng sản xuất
export const taohsx = (data, mang) => {
    data.map((item) => {
      const check = mang.some((x) => {
        return item.brand == x;
      });
      if (check == false) {
        mang.push(item.brand);
      }
    });
  };

  // xử lí logic category
 export const taocate = (data, cate) => {
    data.map((item) => {
      const check_1 = cate.some((x) => {
        return item.category == x;
      });
      if (check_1 == false) {
        cate.push(item.category);
      }
    });
  };

  // xử lí logic sắp xếp
 export const filterByArrange = (data_3, ploai, data) => {
    // tên A -> Z
    if (data_3.phanloai === 'tentang') {
      return ploai.sort((a, b) => a.title.localeCompare(b.title));
    } 
    // tên từ Z -> A
    else if (data_3.phanloai === 'tengiam') {
      return ploai.sort((a, b) => b.title.localeCompare(a.title));
    } 
    // giá tăng dần
    else if (data_3.phanloai === 'giatang') {
      return ploai.sort((a, b) =>  a.price *
      ((100 - Math.floor(a.discountPercentage)) /
        100) -  b.price *
        ((100 - Math.floor(b.discountPercentage)) /
          100));
    } 
    // giá giảm dần
    else if
     (data_3.phanloai === 'giagiam') {
      return ploai.sort((a, b) =>  b.price *
      ((100 - Math.floor(b.discountPercentage)) /
        100) -  a.price *
        ((100 - Math.floor(a.discountPercentage)) /
          100));
    } 
    // trở về trạng thái ban đầu
    else if (data_3.phanloai === 'original'){
      return data;
    }
    // không có điều kiện nào thì trả về dữ liệu cũ
    return ploai;
  };


  // xử lí logic add sản phẩm 
 export const AddtoCart = (id, infor, checkId, cookies, dispatch, navigate) => {

    if (cookies) {
      const check = checkId.some((item) => {
        return item.id === id;
      });

      if (check) {
        const productSlg = checkId.find((item) => {
          return item.id === id;
        });
      

        if (infor.Quantity > productSlg.quanlity) {
          dispatch(up(id));
        } else {
          Modal.error({
            title: "Không Thể Thêm Sản Phẩm",
            content:
              "Số lượng bạn chọn đã đạt mức tối đa số lượng của sản phẩm này ",
          });
        }
      } else {
        dispatch(add(id, infor));
      }
    } else {
      navigate("/login");
    }
  };