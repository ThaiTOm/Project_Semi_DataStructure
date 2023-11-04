import { del } from "../../tienich/request"

export const delInfor = async (e) => {
    const result = await del(`information/${e}`)
    return result;
}