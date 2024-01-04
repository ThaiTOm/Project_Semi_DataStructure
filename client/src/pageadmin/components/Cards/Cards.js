import React, { useEffect, useState } from "react";
import "./Cards.scss";
import { useSelector } from "react-redux";
import Card from "../Card/Card"
import { cardsData } from "../../../Data/Data";
import { getQuantityUsers, getAllOrder, getProductadminsp } from "../../../service/getcategory/getCategory";
import { getCookie } from "../../../components/takeCookies/takeCookies";


const Cards = () => {
  const [data, setData] = useState([]);
  const [totalOrder, setTotalOrder] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const reload = useSelector((state) => state.Reload)
  const cookies = getCookie("token");

  const getusers = async (token) => {
    const lengthUser = await getQuantityUsers(token);
    if(lengthUser.code === 200){
      setData(lengthUser.quantity);
    }
  }

  const getPurchase = async () => {
    const result = await getAllOrder();
    const sumAllOrder = result.reduce((origin, item) => {
     const sumOrder = item.thanhtoan.reduce((sum, x) => {
      return x.thanhtien + sum;
     }, 0)
     return origin + sumOrder;
    }, 0)
    setTotalOrder(result.length);
    setRevenue(sumAllOrder)
  }
  
  const getExpenses = async () => {
    const result = await getProductadminsp();
    const sumTotal = result.reduce((origin, item) => {
      const totalPrice = item.price *
      (1 - item.discountPercentage / 100) *
      item.Quantity
        return origin + totalPrice;
    }, 0)
    setExpenses(sumTotal * (80/100));
  }

  useEffect(() => {
       getusers(cookies);
  },[cookies])

  useEffect(() => {
    getPurchase();
    getExpenses();
  }, [reload ? reload : null])
  

  return (
    <div className="Cards">
      {Array.isArray(cardsData(data, totalOrder, expenses, revenue)) && cardsData(data, totalOrder, expenses, revenue).map((card, id) => {
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
