import { getCookie } from "../components/takeCookies/takeCookies";

const initialState = JSON.parse(localStorage.getItem(getCookie("token"))) || [];

const cartStore = (state = initialState.product || [], action) => {
  let newState;

  switch (action.type) {
    case "add":
      newState = [
        ...state,
        {
          id: action.id,
          infor: action.infor,
          quanlity: action.quanlity
        }
      ];
      return newState;


    case "Up":
      newState = state.map(item => {
        if (item.id === action.id) {
          return { ...item, quanlity: item.quanlity + 1 };
        }
        return item;
      });
      return newState;

    case "Upmt":
      newState = state.map(item => {
        if (item.id === action.id) {
          return { ...item, quanlity: item.quanlity + action.slg };
        }
        return item;
      });
      return newState;

    case "Down":
      newState = state.map(item => {
        if (item.id === action.id && item.quanlity > 0) {
          return { ...item, quanlity: item.quanlity - 1 };
        }
        return item;
      });
      return newState;

    case "Delete":
     const newState_1 = state.filter(item => item.id !== action.id);
      return newState_1;

    case "DeleteAll":
     const newState_2 = state.filter(item => item.id === action.id);
      return newState_2;

    default:
      return state;
  }
};

export default cartStore;




// import { getCookie } from "../components/takeCookies/takeCookies";


// const cartStore = (state = JSON.parse(localStorage.getItem(getCookie("token"))) , action ) => {
//   console.log(state);
 
//     let newState = [...state];
// switch (action.type) {
//  case "add":
//     { newState = [
//          ...newState,
        
//          // {state.id === action.id} ? 
//          {
//              id: action.id,
//              infor: action.infor,
//              quanlity: action.quanlity
              
//          }
//         ]
        
//         return newState;
//      }

//      case "Up":

//          newState.forEach(item => {
//              if (item.id === action.id) {
//                  item.quanlity++;
//              } 
//         })
//     return newState;
//      case "Down":
//          const index = newState.findIndex(item => {
//              return item.id === action.id
//          })
//         console.log(index);
//              if (newState[index].quanlity > 0) {
//                  newState[index].quanlity--;
//              } 
//              else {
//                 console.log(newState[index]);
//              }

        
//     return newState;
//          case "Delete":
//             const newState_1 = newState.filter(item => {
//                  return item.id !== action.id
//              })
             
//              return newState_1;
//          case "DeleteAll":
//              const newState_2 = newState.filter(item => {
//                  return item.id == action.id
//              })
//              return newState_2;
// default:
//  return state;
// }
// }
// export default cartStore;
