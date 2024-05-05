import React from "react";
import style from "../Css/Checkout.module.css";
import Navbar from "../Allsimilar/Navbar";
import { useEffect } from "react";
import { Authcontext } from "../Context/Authcontextprovider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Afterloginnavbar from "../Allsimilar/Afterloginnavbar"

const Checkout = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [pincode, setPincode] = useState("");

  const { handleCheckout, checkall, checktotal, handleorderid } =
    React.useContext(Authcontext);
  console.log(checkall);

  async function handleOrderAdd() {
    try {
      let res = await fetch(
        "https://snapdeal-backend-4.onrender.com/orderuser/addorder",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email,address,phone, pincode, total:checktotal,products: checkall}),
        }
      );
      let res2 = await res.json();
      console.log(res2);
    } catch (error) {
      console.log(error);
    }
  }

  function handleloding() {
    handleOrderAdd();
    handleorderid();
    navigate("/loading");
  }

  useEffect(() => {
    handleCheckout();
    document.title = "Snapdeal Cart Checkout";
  }, []);

  return (
    <>
      <Afterloginnavbar />

      <div className={style.checkoutmain}>
        <div className={style.indiv2}>
          <div>
            <p className={style.chep1}>Review Order</p>

            {checkall &&
              checkall.map((ele, index) => {
                return (
                  <div className={style.checpro1} key={index}>
                    <img src={ele.img} alt="" />

                    <div>
                      <p className={style.chedes}>{ele.title}</p>
                      <p className={style.chedes2}>
                        Color: Multicolor Size: {ele.size}
                      </p>
                    </div>

                    <p className={style.chedes3}>Qty : {ele.qty}</p>
                    <p className={style.chedes4}>
                      Total: Rs. {ele.price * ele.qty}
                    </p>
                  </div>
                );
              })}
            <button className={style.checpay} onClick={handleloding}>
              PAY RS. {checktotal}
            </button>
          </div>

          <div>
            <p className={style.chep2}>Customer Details</p>

            <div className={style.detailpay}>
              <label>Name : </label>
              <input
                className={style.payin1}
                type="text"
                placeholder="enter name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className={style.detailpay}>
              <label>Email : </label>
              <input
                className={style.payin2}
                type="email"
                placeholder="enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div className={style.detailpay}>
              <label>Address : </label>
              <input
                className={style.payin3}
                type="text"
                placeholder="enter address"
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
            </div>

            <div className={style.detailpay}>
              <label>Phone : </label>
              <input
                className={style.payin4}
                type="number"
                placeholder="enter phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
            </div>

            <div className={style.detailpay}>
              <label>Pincode : </label>
              <input
                className={style.payin5}
                type="number"
                placeholder="enter pincode"
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
