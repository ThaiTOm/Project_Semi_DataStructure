import { patch } from "../../tienich/request"

export const patchCart = async (options) => {
    try {
      const result = await patch(`cart/${options.id}`, options);
      return result;
    } catch (error) {
      throw new Error('Error in patchCart:', error);
    }
  };

export const patchInfor = async (options) => {
    try {
      const result = await patch(`information/${options.id}`, options);
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

export const patchUser = async (options) => {   // set mặc định cho đơn hàng
    try {
      const result = await patch(`users/${options.id}`, options);
      return result;
    } catch (error) {
      throw new Error('Error in patchinfor:', error);
    }
  };

