import { del } from "../../tienich/request"

export const delInfor = async (e) => {
    const result = await del(`information/${e}`)
    return result;
}

export const delUser = async (e) => {
    const result = await del(`users/${e}`)
    return result;
}

export const delShip = async (e) => {
    const result = await del(`shipping/${e}`)
    return result;
}