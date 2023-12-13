import React, { useEffect, useState } from "react";
import "./Cards.scss";

import Card from "../Card/Card"
import { cardsData } from "../../../Data/Data";
import { getUser } from "../../../service/getcategory/getCategory";


const Cards = () => {
  const [data, setData] = useState([]);
  const getusers = async () => {
    const lengthUser = await getUser();
    
   setData(lengthUser);
  }

  useEffect(() => {
       getusers();
  },[])

  return (
    <div className="Cards">
      {Array.isArray(cardsData(data.length)) && cardsData(data.length).map((card, id) => {
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
