export const add = (id, infor) => {
    return {
        type: "add",
        id: id,
        quanlity: 1,
        infor: infor
    };
}

export const up = (id) => {
    return {
        type: "Up",
        id: id
    };
}
export const down = (id) => {
    return {
        type: "Down",
        id: id
    };
}

export const xoa = (id) => {
    return {
        type: "Delete",
        id: id
    };
}
export const xoahet = (id) => {
    return {
        type: "DeleteAll",
        id: id
    };
}

