import { put } from "../../tienich/request";

export const putPur = async (id ,options) => {
    console.log(options);

    
    try {
      const result = await put(`purchase/${id}`, options[0]);
      return result;
    } catch (error) {
      throw new Error('Error in putPur:', error);
    }
  };