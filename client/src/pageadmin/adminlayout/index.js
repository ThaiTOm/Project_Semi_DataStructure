import React from 'react';
import { Layout, Breadcrumb } from 'antd';


import "./adminlayout.scss"


import Adminsider from '../components/adminSider';
import Admincontent from '../components/adminContent';


import Admindash from '../admindash';
import Sider from 'antd/es/layout/Sider';
const { Header, Content } = Layout;

const Adminlayout = () => {
  return (
    <>
    <Layout style={{backgroundColor: 'initial'}} >
      <Sider  style={{backgroundColor: 'initial', 
      minHeight: '97vh'}}>
 <Adminsider/>
      </Sider>
      <Content style={{backgroundColor: 'initial'}} className='content'>
    <Admincontent />
      </Content>
    </Layout>
     
    
        
    </>
   
  );
};

export default Adminlayout;




// {cookie == "admin0305" ? (<div>thanhcong</div>) : (<div>thatbai</div>)}