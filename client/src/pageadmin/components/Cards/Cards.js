import React, { useEffect, useState } from "react";
import "./Cards.scss";

import Card from "../Card/Card"
import { cardsData } from "../../../Data/Data";
import { getQuantityUsers } from "../../../service/getcategory/getCategory";
import { getCookie } from "../../../components/takeCookies/takeCookies";


const Cards = () => {
  const [data, setData] = useState([]);
  const cookies = getCookie("token");
  const getusers = async (token) => {
    const lengthUser = await getQuantityUsers(token);
    if(lengthUser.code === 200){
      setData(lengthUser.quantity);
    }
  }

  useEffect(() => {
       getusers(cookies);
  },[cookies])

  return (
    <div className="Cards">
      {Array.isArray(cardsData(data)) && cardsData(data).map((card, id) => {
        return (
          <div className="parentContainer" key={id}>
            <Card
              title={card.title}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
              type={card.type}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
