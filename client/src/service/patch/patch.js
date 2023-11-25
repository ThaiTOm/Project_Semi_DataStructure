import { patch } from "../../tienich/request"

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
      throw new Error('Error in patchinfor:', error);
    }
  };

export const patchUser = async (options) => {   //cập nhật người dùng
    try {
      const result = await patch(`users/${options.id}`, options);
      return result;
    } catch (error) {
      throw new Error('Error in patchinfor:', error);
    }
  };

export const patchPur = async (id ,options) => {   
  const option = {orderStep: options}
    try {
      const result = await patch(`purchase/${id}`, option);
      return result;
    } catch (error) {
      throw new Error('Error in patchinfor:', error);
    }
  };

