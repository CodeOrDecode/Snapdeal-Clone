import React, { useState } from "react";
import Afterloginnavbar from "../Allsimilar/Afterloginnavbar";
import style from "../Css/Order.module.css";
import { useEffect } from "react";
import Loader from "./Loader";

const Order = () => {
  const [ordercount, setOrdercount] = useState([]);
  const [come, setCome] = useState(false);

  async function handleOrderIs() {
    setCome(true);
    let name = JSON.parse(localStorage.getItem("name"));

    try {
      let res = await fetch(
        `https://snapdeal-backend-4.onrender.com/orderuser/getorder`
      );
      let res2 = await res.json();

      let uporder = res2.orders.filter((ele) => {
        if (ele.name == name) {
          return ele;
        }
      });
      console.log(uporder);
      setCome(false);
      setOrdercount(uporder);
    } catch (error) {
      console.log(error);
      setCome(false);
    }
  }

  useEffect(() => {
    handleOrderIs();
    document.title = "Snapdeal - Order";
  }, []);

  if (come) {
    return <Loader />;
  }

  return (
    <>
      <Afterloginnavbar />

      <div className={style.ordershow}>
        {ordercount.length > 0 ? (
          ordercount.map((ele) => {
            return (
              <div className={style.ordersmall} key={ele._id}>
                <p className={style.date}>
                  Date :{" "}
                  {new Date(ele.date).toLocaleString(undefined, {
                    timeZone: "Asia/Kolkata",
                  })}
                </p>

                <div className={style.comple}>
                  {ele.products.map((pro, index) => {
                    return (
                      <div className={style.showinfor} key={index}>
                        <div>
                          <img className={style.imgpro} src={pro.img} alt="" />
                        </div>

                        <div>
                          <p className={style.ptitle}>{pro.title}</p>
                          <p>Qty: {pro.qty}</p>
                          <p>Size: {pro.size}</p>
                          <p>Price: {pro.price}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <div className={style.noorder}>No Order Found</div>
        )}
      </div>
    </>
  );
};

export default Order;
