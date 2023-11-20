import LayoutDefault from "../layout/layoutDefault";
import Collections from "../page/collections";
import Contact from "../page/contact";
import Discount from "../page/discount";
import Home from "../page/home";
import Introduce from "../page/introduce";
import Login from "../page/login";
import Register from "../page/register";
import Dscuahang from "../page/dscuahang"
import Products from "../page/products";
import Productdetail from "../page/products/productDetail";
import Category from "../page/category";
import Categorydetail from "../page/category/categoryDetail";
import Order from "../page/order";
import Search from "../page/search";
import Searchdetail from "../page/search/searchDetail";

import Cart from "../page/cart";
import Infor from "../page/information/homeinfor/homeinfor";
import Address from "../page/information/address/address";
import Changepass from "../page/information/changepass/changepass";
import Thongtinkh from "../page/information/thongtinkh/thongtinkh";
import Yourorder from "../page/information/yourorder/yourorder";
import Logout from "../page/information/logout/logout";
import Thanhtoan from "../page/thanhtoan";
import Admindash from "../pageadmin/admindash";
import Admincustomer from "../pageadmin/admincustomer";
import Adminproduct from "../pageadmin/adminproduct";
import Admin from "../pageadmin/admin";
import Adminorder from "../pageadmin/adminorder";
import Information from "../pageadmin/admincustomer/customerInformation/information";
import Account from "../pageadmin/admincustomer/customerAccount/account";






export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
         {   
            path: "/",
            element: <Home />
         },
         {   
            path: "login",
            element: <Login />
         },
         {   
            path: "register",
            element: <Register />
         },
         {
            path: "introduce",
            element: <Introduce />
         },
         {
            path: "collections",
            element: <Collections />
         },
         {
            path: "discount",
            element: <Discount />
         },
         {
            path: "contact",
            element: <Contact />
         },
         {
            path: "dscuahang",
            element: <Dscuahang />
         },
         {
            path: "product",
            element: <Products />,
            children: [
               {
                   path: ":id",
                   element: <Productdetail />
               }
            ]
         },
         {
            path: "category",
            element: <Category />,
            children: [
               {
                   path: ":cate",
                   element: <Categorydetail />
               }
            ]
         },
         {
            path: "order",
            element: <Order />
         },
         {
            path: "infor",
            element: <Infor />,
            children: [
              {
               path: "address",
               element: <Address />
            },
              {
               path: "changepass",
               element: <Changepass />
            },
              {
               path: "thongtinkh",
               element: <Thongtinkh />
            },
              {
               path: "yourorder",
               element: <Yourorder />
            },
              {
               path: "logout",
               element: <Logout />
            },
          
            ]
         },
         {
            path: "cart",
            element: <Cart />
         },
         {
            path: "order",
            element: <Order />
         },
         {
            path: "thanhtoan",
            element: <Thanhtoan />
         },
         {
            path: "search",
            element: <Search />,
            children: [
               {
                  path: ":name",
                  element: <Searchdetail />
               }
            ]
         }
        ],
    },
    {
      path: "/admin/",
      element: <Admin />,
      children: [
         {
            path: "dash",
            element: <Admindash />
         },
         {
            path: "customer",
            element: <Admincustomer />,
            children: [
                {
                  path: "information",
                  element: <Information />
                },
                {
                  path: "account",
                  element: <Account />
                }
            ]
         },
         {
            path: "orders",
            element: <Adminorder />
         },
         {
            path: "product",
            element: <Adminproduct />
         }
      ]
    }
]