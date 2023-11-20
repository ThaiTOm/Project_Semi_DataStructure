import { post } from "../../tienich/request";

export const postCart = async (option) => {
    const result = await post("cart", option);
    return result;
} 

export const postUser = async (option) => {
    const result = await post("users", option);
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
    return result
}

// export const postCart = async (option) => {
//    const result = await post ("")
// }
