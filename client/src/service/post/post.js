import { post, postV1 } from "../../tienich/request";

export const postCart = async (option) => {
    try {
        const result = await post("cart", option);
        return result;
      } catch (error) {
        console.error("Error in postCart:", error);
        throw error;
      }
} 

export const postUser = async (option) => {
    const result = await post("users", option);
    return result;
} 

export const postCate = async (option) => {
    const result = await post("category", option);
    return result;
} 

export const postShipping = async (option) => {
    console.log(option)
    const result = await post("shipping", option);
    return result;
} 

export const postInfor = async (option) => {
    const result = await post("information", option);
    return result;
} 

export const postOrder = async (option) => {
    const result = await post("purchase", option);
    return result;
}

export const postProduct = async (option) => {
    const result = await post("beverages", option);
    return result;
}

// V1
export const ForgotPasswordPost = async (option) => {
    try {
        const result = await postV1("api/v1/users/password/forgot", option);
        return result;
      } catch (error) {
        console.error("Error in ForgotPasswordPost:", error);
        throw error;
      }
} 

export const OtpPasswordPost = async (option) => {
    try {
        const result = await postV1("api/v1/users/password/otp", option);
        return result;
      } catch (error) {
        console.error("Error in OtpPasswordPost:", error);
        throw error;
      }
} 

export const resetPasswordPost = async (option) => {
    try {
        const result = await postV1("api/v1/users/password/reset", option);
        return result;
      } catch (error) {
        console.error("Error in resetPasswordPost:", error);
        throw error;
      }
} 

export const postInforExist = async (option, token) => {
    try {
        const result = await postV1("api/v1/users/information/inforExist", option, token);
        return result;
      } catch (error) {
        console.error("Error in postInforExist:", error);
        throw error;
      }
} 

export const postUserLogin = async (option) => {
    try {
        const result = await postV1("api/v1/users/login/checkLogin", option, " ");
        return result;
      } catch (error) {
        console.error("Error in postUserLogin:", error);
        throw error;
      }
} 

export const postUserRegister = async (option) => {
    try {
        const result = await postV1("api/v1/users/register/checkRegister", option, "");
        return result;
      } catch (error) {
        console.error("Error in postUserRegister:", error);
        throw error;
      }
} 

export const postUserAdmin = async (option, token) => {
    try {
        const result = await postV1("api/v1/users/information/adminUsersPost", option, token);
        return result;
      } catch (error) {
        console.error("Error in postUserRegister:", error);
        throw error;
      }
} 

export const postSameProducts = async (productId) => {
  try {
    const result = await postV1(`api/v1/products/sameProducts`, productId, "");
    return result;
  } catch (error) {
    console.error("Error in getSameProducts:", error);
    throw error;
  }
};

export const postBlogs = async (option, token) => {
  try {
    const result = await postV1(`api/v1/blogs/postBlogs`, option, token);
    return result;
  } catch (error) {
    console.error("Error in postBlogs:", error);
    throw error;
  }
};


export const postBlogCate = async (token, cate) => {
  try {
    const result = await postV1(`api/v1/blogs/getBlogs/category`, cate, token);
    return result;
  } catch (error) {
    console.error("Error in getQuantityUsers:", error);
    throw error;
  }
};
