import React from 'react';
import { Layout } from 'antd';


import "./adminlayout.scss"


import Adminsider from '../components/adminSider';
import Admincontent from '../components/adminContent';

import Sider from 'antd/es/layout/Sider';
const {  Content } = Layout;

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