import React, { useState, useEffect } from 'react';
import { format, isSameDay } from 'date-fns';

const CurrentDay = () => {
  const [currentDay, setCurrentDay] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
  
      // kiểm tra xem ngày hiện tại có khác với ngày trước đó hay không
      if (!isSameDay(now, currentDay)) {
        setCurrentDay(now);
      }
    }, 1000);

    return () => clearInterval(intervalId); 
  }, [currentDay]); 

  // format thời gian theo chuẩn "yyyy-MM-dd HH:mm:ss"
  const formattedTime = format(currentDay, 'yyyy-MM-dd');
return formattedTime;
};

export default CurrentDay;
