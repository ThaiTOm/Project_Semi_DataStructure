
const takethanhtoan = JSON.parse(sessionStorage.getItem('thanhtoan')) || [];

const ttStore = (state = takethanhtoan || [], action) => {
    let newState 

    switch(action.type){
        case "Addtt":
        console.log(state)
        
        const ketqua = [{
            id: action.infor[0].id,
            img: action.infor[0].thumbnail,
            title: action.infor[0].title,
            dongia: action.infor[0].price *
            (1 - Math.floor(action.infor[0].discountPercentage) / 100),
            soluong: action.quantity,
            thanhtien:  action.infor[0].price *
            (1 - Math.floor(action.infor[0].discountPercentage) / 100) * action.quantity
        }]
       newState = ketqua

       return newState;
    
        case "Addcart":
      
     const result = action.infor.map(item => {
        return {
            id: item.id,
            img: item.image,
            title: item.orderInfo,
            dongia: item.price,
            soluong: item.quantity,
            thanhtien: item.total
        }
     })
        console.log(result)
        console.log(action.infor)
        const arrayOfObjects = Object.values(result);
       
return  arrayOfObjects;
       default:
        return state;
    }

} 
export default ttStore;