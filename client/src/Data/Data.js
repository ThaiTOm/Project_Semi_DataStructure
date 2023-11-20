import { Link } from "react-router-dom";
import "../pageadmin/components/adminSider/adminSider.scss"

import {
 
  UilClipboardAlt,
 
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../image/img1.png";
import img2 from "../image/img2.png";
import img3 from "../image/img3.png";

export const SidebarData = [
  {
    key: 'dashboard',
    icon: <Link to="/admin/dash"><img width="19" height="19" src="https://img.icons8.com/wired/64/dashboard.png" alt="dashboard" /></Link>,
    label: "Dashboard",
    style: {
       marginTop: '20px',
       marginBottom: '20px',
    
       fontSize: '17px'
    }
  },
  {
    key: 'orders',
    icon: <Link to="/admin/orders"><img width="19" height="19" src="https://img.icons8.com/ios/50/order-completed--v2.png" alt="order-completed--v2" /></Link>,
    label: "Orders",
    style: {
      marginTop: '20px',
      marginBottom: '20px',
     
      fontSize: '17px'
   }
  },
  {
    key: 'customers',
    icon: <img width="19" height="19" src="https://img.icons8.com/windows/32/gender-neutral-user.png" alt="gender-neutral-user" />,
    label: "Customers",
    style: {
      marginTop: '20px',
      marginBottom: '20px',
      
      fontSize: '17px'
   },
   children: [
    {
      key: 'userAccount',
      label: <div  className="account" >Account</div>,
      icon: <Link  to="/admin/customer/account"><img width="19" height="19" src="https://img.icons8.com/fluency/48/guest-male--v1.png" alt="guest-male--v1"/></Link>  // Replace with the appropriate icon
      // Add any additional properties or styles as needed
    },
    {
      key: 'userInformation',
      label: 'Information',
      icon:  <Link to="/admin/customer/information"><img width="19" height="19" src="https://img.icons8.com/windows/32/information.png" alt="information"/></Link>, // Replace with the appropriate icon
      // Add any additional properties or styles as needed
    },
  ],
  },
  {
    key: 'products',
    icon: <Link to="/admin/product"><img width="19" height="19" src="https://img.icons8.com/material-outlined/24/product.png" alt="product" /></Link>,
    label: "Products",
    style: {
      marginTop: '20px',
      marginBottom: '20px',
      fontSize: '17px'
   }
  },
];

  

// export const SidebarData = [
//   {
//     icon:  <Link to="/admin"  ><img  width="14" height="14" src="https://img.icons8.com/wired/64/dashboard.png" alt="dashboard"/></Link>,
//     heading: "Dashboard",
//   },
//   {
//     icon: <Link to="/admin/customer" ><img width="14" height="14" src="https://img.icons8.com/ios/50/order-completed--v2.png" alt="order-completed--v2"/></Link>,
//     heading: "Orders",
//   },
//   {
//     icon: <Link to="/admin/customer" ><img width="14" height="14" src="https://img.icons8.com/windows/32/gender-neutral-user.png" alt="gender-neutral-user"/></Link>,
//     heading: "Customers",
//   },
//   {
//     icon: <Link to="/admin/product"><img width="14" height="14" src="https://img.icons8.com/material-outlined/24/product.png" alt="product"/></Link>,
//     heading: 'Products'
//   },

// ];
// Analytics Cards Data
export const cardsData = [
  {
    title: "Sales",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: UilUsdSquare,
   
  },
  {
    title: "Revenue",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270",
    png: UilMoneyWithdrawal,
   
  },
  {
    title: "Expenses",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "4,270",
    png: UilClipboardAlt,
 
  },
  {
    title: "Total Order",
    color: {
      backGround: "linear-gradient(rgb(173, 216, 230), rgb(152, 251, 152))",
      boxShadow: "0px 10px 20px 0px #98FB98",
      
    },
    barValue: 40,
    value: "43,270",
    png: UilClipboardAlt,
 
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];