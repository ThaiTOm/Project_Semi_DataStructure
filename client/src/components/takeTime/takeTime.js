import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Format thời gian theo chuẩn "yyyy-MM-dd HH:mm:ss"
  const formattedTime = format(currentTime, 'yyyy-MM-dd HH:mm:ss');
return formattedTime;
};

export default CurrentTime;
