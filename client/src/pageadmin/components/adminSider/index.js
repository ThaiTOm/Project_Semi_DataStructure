import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ConfigProvider, Menu, Tooltip } from "antd"
import { SidebarData } from "../../../Data/Data";
import Logo from "../../../image/Logo.png";
import "./adminSider.scss"
import { Link, useLocation } from "react-router-dom";
const Adminsider = () => {
  const sessionKey = JSON.parse(sessionStorage.getItem('keyMenu'));
console.log(sessionKey)
    const sidebarVariants = {
      true: {
        left : '0'
      },
      false:{
        left : '-60%'
      }
    }
    const [selectedKey, setSelectedKey] = useState(sessionKey ? sessionKey : 'dashboard'); // Mặc định chọn dashboard khi load trang
    const [expanded, setExpaned] = useState(true)
    useEffect(() => {
      // Lưu giá trị vào sessionStorage
      sessionStorage.setItem('keyMenu', JSON.stringify(selectedKey));
    }, [selectedKey]); // Thay đổi keyMenu sẽ gọi useEffect
    
    const handleMenuClick = (key) => {
      setSelectedKey(key);
    };

    const location = useLocation();
    const currentPath = location.pathname;

useEffect(() => {
  console.log(currentPath)
   if (currentPath.includes('admin') === false){
    sessionStorage.removeItem('keyMenu');
   }
},[currentPath])

    return (
      <>
    
        <div className="bars"  onClick={()=>setExpaned(!expanded)}>
        <img width="50" height="50" style={expanded?{left: '60%'}:{left: '5%'}} src="https://img.icons8.com/ios-filled/50/menu--v6.png" alt="menu--v6"/>
        </div>
      <motion.div className='sidebar'
      variants={sidebarVariants}
      animate={window.innerWidth<=768?`${expanded}`:''}
      >
        {/* logo */}
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
  
        <div className="menu">
        <ConfigProvider
  theme={{
    components: {
      Menu: {
        itemSelectedBg: '#C8EFD4',
        itemSelectedColor: '#EC0F0F',
      },
    },
  }}
>
   <Menu
         defaultOpenKeys={['customers']}
        style={{backgroundColor: 'initial', border: 'none'}}
        mode="inline"
        selectedKeys={[selectedKey]}
        onClick={(e) => handleMenuClick(e.key)}
        items={SidebarData}
      />
</ConfigProvider>
       
    
 
          {/* signoutIcon */}
          <div className="menuItem">
          <Link to="/">
          <Tooltip placement="top" title={'Chuyển qua trang User'}>
          <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/logout-rounded.png" alt="logout-rounded"/>
        </Tooltip>
           
          </Link>
          
          </div>
        </div>
      </motion.div>  
      </>
    );
};

export default Adminsider;
