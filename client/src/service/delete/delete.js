import { del } from "../../tienich/request"

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

