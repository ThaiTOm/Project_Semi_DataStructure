import { patch, patchV1 } from "../../tienich/request"

export const patchCart = async (options) => {
    try {
      const result = await patch(`cart/${options.id}`, options);
      return result;
    } catch (error) {
      throw new Error('Error in patchCart:', error);
    }
  };

export const patchCate = async (options) => {
    try {
      const result = await patch(`category/${options.id}`, options);
      return result;
    } catch (error) {
      throw new Error('Error in patchCate:', error);
    }
  };

export const patchInfor = async (options, a) => {
    try {
      const result = await patch(`information/${a[0].id}`, options);
      return result;
    } catch (error) {
      throw new Error('Error in patchinfor:', error);
    }
  };

export const patchBool = async (options) => {   // set mặc định cho đơn hàng
    try {
      const result = await patch(`shipping/${options.id}`, options);
      return result;
    } catch (error) {
      throw new Error('Error in patchBool:', error);
    }
  };

export const patchUser = async (options) => {   //cập nhật người dùng
    try {
      const result = await patch(`users/${options.id}`, options);
      return result;
    } catch (error) {
      throw new Error('Error in patchUser:', error);
    }
  };

export const patchPur = async (id ,options) => {   
  const option = {orderStep: options}
    try {
      const result = await patch(`purchase/${id}`, option);
      return result;
    } catch (error) {
      throw new Error('Error in patchPur:', error);
    }
  };

export const patchProduct = async (id ,options) => {   
    try {
      const result = await patch(`beverages/${id}`, options);
      return result;
    } catch (error) {
      throw new Error('Error in patchProduct:', error);
    }
  };

// V1

export const patchInforV1 = async (options, token) => {
  try {
    const result = await patchV1("api/v1/users/information/myInforPatch", options, token);
    return result;
  } catch (error) {
    throw new Error('Error in patchinfor:', error);
  }
};

export const patchUserV1 = async (options, token) => {
  try {
    const result = await patchV1("api/v1/users/information/adminUsersPatch", options, token);
    return result;
  } catch (error) {
    throw new Error('Error in patchUserV1:', error);
  }
};

export const patchChangePass = async (option, token) => {
  try {
      const result = await patchV1("api/v1/users/information/changePass", option, token);
      return result;
    } catch (error) {
      console.error("Error in postUserRegister:", error);
      throw error;
    }
} 

export const patchBlogId = async (option, token, id) => {
  try {
      const result = await patchV1(`api/v1/blogs/patchBlogId/${id}`, option, token);
      return result;
    } catch (error) {
      console.error("Error in postUserRegister:", error);
      throw error;
    }
} 