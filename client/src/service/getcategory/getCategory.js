import { get } from "../../tienich/request";

export const getadminCategory = async () => {
  // lấy danh mục sản phẩm
  const result = await get("category");
  return result;
};

export const getCategory = async () => {
  // lấy danh mục sản phẩm
  const result = await get("category?delete=false");
  return result;
};

export const getUserstk = async (e) => {
  try {
    const result = await get(`users?token=${e}&delete=false`);
    return result;
  } catch (error) {
    console.error("Error in getUserstk:", error);
    throw error;
  }
};

export const getUser = async () => {
  try {
    const result = await get("users");
    return result;
  } catch (error) {
    console.error("Error in getUserstk:", error);
    throw error;
  }
};

export const getProductdc = async () => {
  // lấy hàng khuyến mãi

  const result = await get(`beverages?discountPercentage_ne=0&delete=false`);
  return result;
};

export const getProductadminsp = async () => {
  // lấy sản phẩm
  const result = await get("beverages");
  return result;
};

export const getProductsp = async () => {
  // lấy sản phẩm
  const result = await get("beverages?delete=false");
  return result;
};

export const getProductdt = async (e) => {
  // lấy từng sản phẩm theo từng id
  const result = await get(`beverages?id=${e}&delete=false`);

  return result;
};

export const getProductcate = async (e) => {
  // lấy từng sản phẩm theo từng category
  const result = await get(`beverages?category=${e}&delete=false`);

  return result;
};

export const getProductsearch = async (e) => {
  // thanh tìm kiếm
  const result = await get(`beverages?title_like=${e}&delete=false`);
  return result;
};

export const getCart = async () => {
  // lấy ds giỏ hàng
  const result = await get("cart");
  return result;
};

export const getInforid = async (e) => {
  // lấy thông tin người dùng kiểm tra dữ liệu có bị trùng không
  const result = await get(`information?userId=${e}`);
  return result;
};

export const getInfor = async (e) => {
 
  const result = await get("information");
  return result;
};

export const getShip = async (e) => {
  // lấy dữ liệu địa chỉ có bị trùng không
  const result = await get(`shipping?userId=${e}`);
  return result;
};

export const getOrder = async (e) => {
  const result = await get(`purchase?userId=${e}`);
  return result;
};

export const getAllOrder = async () => {
  const result = await get("purchase");
  return result;
};

// export const getProducthsx = async (e) => {
//    const result = await get(`beverages?_page=${e}&_limit=12`);
//    return result;
// };
