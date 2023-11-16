import React, { useState, useEffect } from 'react';
import "./buttonScroll.scss"
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <> 
    <div className='button' >
          <div
      className={`button--scroll ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
    >
      <img wclassNameth="30" height="30" src="https://img.icons8.com/ios-glyphs/30/double-up--v1.png" alt="double-up--v1"/>
    </div>
    
    <div className='button--phone' >
    <a className="button--phone__link" href="tel:+84399038165">
    <div className="button--phone__container">
      <button className="button--phone__bt">
      <img width="50" height="50" src="https://img.icons8.com/flat-round/64/phone.png" alt="phone"/>
      </button>
    </div>
  </a>
    </div>
    <div className='button--zalo' >
    <a className="button--zalo__link" href="https://zalo.me/0399038165">
    <div className="button--zalo__container">
      <button className="button--zalo__bt"><img width="48" height="48" src="https://img.icons8.com/color/48/zalo.png" alt="zalo"/></button>
    </div>
  </a>
    </div>
    
    </div>
  
    </>
   
  );
};

export default ScrollToTopButton;
