import logo from './logo.svg';
import './App.css';
import AllRoute from './components/AllRoute';
import ScrollToTopButton from './components/buttonScroll';
import { getCookie } from './components/takeCookies/takeCookies';


function App() {

const cookies = getCookie("token")
   
  return (
   <>
  <div>
 <ScrollToTopButton />
    
      <AllRoute />
        
    </div>
   
    
   </>
  );

  }
export default App;
