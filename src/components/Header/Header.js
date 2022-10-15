import React, { useState, useEffect } from "react";
import './header.css'
import {apiRequest} from "../fetch-api";

const Currency = () => {
  const [currency, setCurrency] = useState([
    { cur: "USD", buy: 0, sale: 0, id: 1 },
    { cur: "EUR", buy: 0, sale: 0, id: 2 },
  ]);

// получаем данные о курсах валют от Приватбанка и записывает в обьект currensy:
  useEffect(() => {
    apiRequest
      .getRates()
      .then((responce) => responce.data)
      .then((data) => {
        currency.map(item => {
          data.filter(getItem => {
            if(getItem.ccy === item.cur) {
              item.buy = Math.floor(getItem.buy * 100) / 100;
              item.sale = Math.floor(getItem.sale * 100) / 100;
            }
          });
        });
        setCurrency(prev => [...currency]);
      });
  }, [currency]);

  return (         
    <div className="header"> 
        <div className="container">
        <div className="header__inner">
        <div className="header__logo"><b>H<span>a</span>wk<span>w</span>eb</b></div>
      <div className="header__exchange">
          {currency.map((itemCurrency) => (
            
            <div className="exchange__rate">
                <div className="exchange__title">{itemCurrency.cur}</div>
                <div className="exchange__out">{itemCurrency.buy}/{itemCurrency.sale}</div>
            </div>
          ))}
        </div>
        </div>
        </div>
    </div>
  );
};

export default Currency;