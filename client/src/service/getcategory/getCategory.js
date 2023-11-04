import { get } from "../../tienich/request"

export const getCategory = async () => {       // lấy danh mục sản phẩm
   const result = await get("category");
   return result;
};

export const getUserstk = async (e) => {       // lấy id user dựa vào token
   const result = await get(`users?token=${e}`);
   return result;
};

export const getProductdc = async () => {    // lấy hàng khuyến mãi

   const result = await get(`beverages?discountPercentage_ne=0`);
   return result;
}

export const getProductsp = async () => {   // lấy sản phẩm 
   const result = await get("beverages");
   return result;
};

export const getProductdt = async (e) => {   // lấy từng sản phẩm theo từng id
   const result = await get(`beverages?id=${e}`);
   console.log(result);
   return result;
}

export const getProductcate = async (e) => {   // lấy từng sản phẩm theo từng category
   const result = await get(`beverages?category=${e}`);
   console.log(result);
   return result;
}

export const getProductsearch = async (e) => {   // lấy từng sản phẩm theo từng category
   const result = await get(`beverages?title_like=${e}`);
   console.log(result);
   return result;
};

export const getCart = async () => {       // lấy danh mục sản phẩm
   const result = await get("cart");
   return result;
};

export const getInforid = async (e) => {       // lấy danh mục sản phẩm
   const result = await get(`information?userId=${e}`);
   return result;
};

export const getInfor = async (e) => {       // lấy danh mục sản phẩm
   const result = await get("information");
   return result;
};
// export const getProducthsx = async (e) => {
//    const result = await get(`beverages?_page=${e}&_limit=12`);
//    return result;
// };

