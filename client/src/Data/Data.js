import { Link } from "react-router-dom";
import "../pageadmin/components/adminSider/adminSider.scss"
import img1 from "../image/img1.png";
import img2 from "../image/img2.png";
import img3 from "../image/img3.png";
import "./data.scss"
import { getUser } from "../service/getcategory/getCategory";



export const SidebarData = [
  {
    key: 'dashboard',
    icon: <Link to="/admin/dash"><img className="siderbar--icon" src="https://img.icons8.com/dusk/64/dashboard.png" alt="dashboard"/></Link>,
    label: "Dashboard",
    style: {
       marginTop: '20px',
       marginBottom: '20px',
    
       fontSize: '17px'
    }
  },
  {
    key: 'orders',
    icon: <Link to="/admin/orders"><img className="siderbar--icon" src="https://img.icons8.com/color/48/order-completed.png" alt="order-completed"/></Link>,
    label: "Orders",
    style: {
      marginTop: '20px',
      marginBottom: '20px',
     
      fontSize: '17px'
   }
  },
  {
    key: 'blogs',
    icon: <Link to="/admin/blogs/news"><img className="siderbar--icon" src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/external-blogs-digital-content-wanicon-lineal-color-wanicon.png" alt="oexternal-blogs-digital-content-wanicon-lineal-color-wanicon"/></Link>,
    label: "Blogs",
    style: {
      marginTop: '20px',
      marginBottom: '20px',
     
      fontSize: '17px'
   }
  },
  {
    key: 'customers',
    icon: <img className="siderbar--icon" src="https://img.icons8.com/windows/32/gender-neutral-user.png" alt="gender-neutral-user" />,
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
      icon: <Link  to="/admin/customer/account"><img className="siderbar--icon" src="https://img.icons8.com/fluency/48/guest-male--v1.png" alt="guest-male--v1"/></Link>  // Replace with the appropriate icon
      
    },
  ],
  },
  {
    key: 'products',
    icon: <img className="siderbar--icon" src="https://img.icons8.com/material-outlined/24/product.png" alt="product" />,
    label: "Products",
    style: {
      marginTop: '20px',
      marginBottom: '20px',
      fontSize: '17px'
   },
   children : [
    {
      key: 'productlist',
      label: 'Product List',
      icon: <Link className="siderbar--link" to="/admin/product/productlist"><img className="siderbar--icon" src="https://img.icons8.com/color/48/holding-box.png" alt="holding-box"/></Link>
    },
    {
      key: 'categorylist',
      label: 'Category List',
      icon: <Link className="siderbar--link" to="/admin/product/categorylist"><img className="siderbar--icon" src="https://img.icons8.com/pulsar-color/48/diversity.png" alt="diversity"/></Link>
    }
   ]
  },
];

  
export const cardsData = (length, totalOrder, totalExpenses, totalRevenue) => 

 [
    {
      title: "Revenue",
      color: {
        backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
        boxShadow: "0px 10px 20px 0px #e0c6f5",
      },
      type: "money",
      barValue: 70,
      value: totalRevenue.toLocaleString(),
      png: <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/banknotes.png" alt="banknotes"/>,
     
    },
    {
      title: "Total Users",
      color: {
        backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
        boxShadow: "0px 10px 20px 0px #FDC0C7",
      },
      barValue: 100,
      type: "person",
      value: length,
      png: <img width="30" height="30" src="https://img.icons8.com/office/30/person-male.png" alt="person-male"/>,
     
    },
    {
      title: "Expenses",
      color: {
        backGround:
          "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
        boxShadow: "0px 10px 20px 0px #F9D59B",
      },
      type: "money",
      barValue: 60,
      value: totalExpenses.toLocaleString(),
      png: <img width="30" height="30" src="https://img.icons8.com/material-sharp/24/purchase-order.png" alt="purchase-order"/>,
   
    },
    {
      title: "Total Order",
      color: {
        backGround: "linear-gradient(rgb(173, 216, 230), rgb(152, 251, 152))",
        boxShadow: "0px 10px 20px 0px #98FB98",
        
      },
      type: "order",
      barValue: 40,
      value: totalOrder.toLocaleString(),
      png: <img width="30" height="30" src="https://img.icons8.com/ios/50/coins--v1.png" alt="coins--v1"/>,
   
    },
  ];
 

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