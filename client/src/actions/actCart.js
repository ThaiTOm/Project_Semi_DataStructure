export const add = (id, infor) => {
    return {
        type: "add",
        id: id,
        quanlity: 1,
        infor: infor
    };
} 

export const addmt = (id, infor, slg) => {
    return {
        type: "add",
        id: id,
        quanlity: slg,
        infor: infor
    };
}

export const up = (id) => {
    return {
        type: "Up",
        id: id,
       
    };
}

export const upmt = (id, slg) => {
    return {
        type: "Upmt",
        id: id,
        slg: slg
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

export const addtt = ( infor, slg) => {
    return {
        type: "Addtt",
        infor: infor,
        quantity: slg
    }
}

export const addcart = ( infor) => {
    return {
        type: "Addcart",
        infor: infor,
       
    }
}

export const load = (render) => {
    return {
        type: "Load",
        render: render,
    }
}

