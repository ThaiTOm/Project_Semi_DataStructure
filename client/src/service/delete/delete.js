import { del, delV1 } from "../../tienich/request"

export const delInfor = async (e) => {
    const result = await del(`information/${e}`)
    return result;
}

export const delUser = async (e) => {
    const result = await del(`users/${e}`)
    return result;
}

export const delProduct = async (e) => {
    const result = await del(`beverages/${e}`)
    return result;
}

export const delShip = async (e) => {
    console.log(e);
    const result = await del(`shipping/${e}`)
    return result;
}

export const delPur = async (e) => {
    const result = await del(`purchase/${e}`)
    return result;
}

export const delCate = async (e) => {
    const result = await del(`category/${e}`)
    return result;
}

// v1 
export const delUserAdmin = async (e, token) => {
    try {
        const result = await delV1(`api/v1/users/information/adminUsersDel/${e}`, token)
        return result;
      } catch (error) {
        console.error("Error in delUserAdmin:", error);
        throw error;
      }

}

export const delAvatarV1 = async (token) => {
    try {
        const result = await delV1(`api/v1/users/information/removeAvatar`, token)
        return result;
      } catch (error) {
        console.error("Error in delUserAdmin:", error);
        throw error;
      }

}

export const delBlogV1 = async (token, id) => {
    try {
        const result = await delV1(`api/v1/blogs/delBlogId/${id}`, token)
        return result;
      } catch (error) {
        console.error("Error in delUserAdmin:", error);
        throw error;
      }

}

