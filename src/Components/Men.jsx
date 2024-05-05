import React from "react";
import Navbar from "../Allsimilar/Navbar";
import style from "../Css/Men.module.css";
import { FaAngleDown } from "react-icons/fa";
import Footer from "../Allsimilar/Footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Afterloginnavbar from "../Allsimilar/Afterloginnavbar"
import { Authcontext } from "../Context/Authcontextprovider";
import Loader from "./Loader"

const Men = () => {
  const navigate = useNavigate();
  const [mendata, setmendata] = useState(null);
  const [show, setShow] = useState(false);
  const [wantto, setWantto] = useState("All Products");
  const [loadit, setLoadit] = useState(false);

  const { handlecartno } = React.useContext(Authcontext)

  async function menProductData() {
    setLoadit(true)
    try {
      let res = await fetch("https://snapdeal-backend-4.onrender.com/men/getmen");
      let res2 = await res.json();
      if (wantto == "All Products") {
        setmendata(res2.products);
        setLoadit(false)
      } else if (wantto == "Price High To Low") {
        let hightolow = res2.products.sort((a, b) => {
          return b.price - a.price;
        });
        setmendata(hightolow);
        setLoadit(false)
      } else {
        let lowToHigh = res2.products.sort((a, b) => {
          return a.price - b.price;
        });
        setmendata(lowToHigh);
        setLoadit(false)
      }

      
    } catch (error) {
      console.log(error);
      setLoadit(false)
    }
  }

  function handleSingleproduct(pro) {
    localStorage.setItem("product", JSON.stringify(pro));
    navigate("/product");
  }

  function handleAllProducts(val) {
    if (val == "All Products") {
      setWantto("All Products");
    } else if (val == "Price High To Low") {
      setWantto("Price High To Low");
    } else {
      setWantto("Price Low To High");
    }
  }



  useEffect(() => {
    menProductData();
    handlecartno();
    document.title = "Buy Branded Men's T-Shirts &amp; Polos Online at Snapdeal";
  }, [wantto]);
  
  if(loadit){
    return <Loader/>
  }


  return (
    <>
      <Afterloginnavbar />

      <div className={style.mendivmain}>
        <div className={style.insidemen}>
          <div className={style.inside1}>
            <div className={style.prsidepa1}>
              <p className={style.sideclo}>Men's Clothing</p>
              <p className={style.sideclo2}>Men's T-Shirts &amp; Polos</p>
              <p className={style.sideclo2}>Polo T Shirt For Men</p>
              <p className={style.sideclo2}>T Shirt For Men</p>
              <p className={style.sideclo2}>Couple Combos</p>
            </div>

            <div className={style.ruller}></div>

            <div className={style.brand}>
              <p className={style.sideclo}>Brand</p>
              <p className={style.sideclo2}>3PIN</p>
              <p className={style.sideclo2}>98 Degree North</p>
              <p className={style.sideclo2}>A For F</p>
              <p className={style.sideclo2}>A-MAN</p>
              <p className={style.sideclo2}>ADORATE</p>
            </div>

            <div className={style.ruller}></div>

            <div className={style.color}>
              <p className={style.sideclo}>Color</p>

              <div className={style.colordiv}>
                <div className={style.colorfill1}></div>
                <p>Beige</p>
              </div>
              <div className={style.colordiv}>
                <div className={style.colorfill2}></div>
                <p>Black</p>
              </div>

              <div className={style.colordiv}>
                <div className={style.colorfill3}></div>
                <p>Blue</p>
              </div>

              <div className={style.colordiv}>
                <div className={style.colorfill4}></div>
                <p>Bronze</p>
              </div>

              <div className={style.colordiv}>
                <div className={style.colorfill5}></div>
                <p>Brown</p>
              </div>
            </div>
            <div className={style.ruller}></div>

            <div className={style.fit}></div>

            <div className={style.fit}>
              <p className={style.sideclo}>Fit</p>
              <p className={style.sideclo2}>Oversized Fit</p>
              <p className={style.sideclo2}>Regular Fit</p>
              <p className={style.sideclo2}>Relaxed Fit</p>
              <p className={style.sideclo2}>Slim Fit</p>
            </div>

            <div className={style.ruller}></div>
            <div className={style.fit}>
              <p className={style.sideclo}>Fabric</p>
              <p className={style.sideclo2}>100 Percent Cotton</p>
              <p className={style.sideclo2}>Cotton</p>
              <p className={style.sideclo2}>Cotton Blend</p>
              <p className={style.sideclo2}>Cotton Nylon</p>
              <p className={style.sideclo2}>Lycra</p>
            </div>

            <div className={style.ruller}></div>
            <div className={style.fit}>
              <p className={style.sideclo}>Sleeves Length</p>
              <p className={style.sideclo2}>3/4th Sleeves</p>
              <p className={style.sideclo2}>Full Sleeves</p>
              <p className={style.sideclo2}>Half Sleeves</p>
              <p className={style.sideclo2}>Cotton Nylon</p>
              <p className={style.sideclo2}>Sleeveless</p>
            </div>
            <div className={style.ruller}></div>

            <div className={style.fit}>
              <p className={style.sideclo}>Pattern</p>
              <p className={style.sideclo2}>Applique</p>
              <p className={style.sideclo2}>Checks</p>
              <p className={style.sideclo2}>Colorblock</p>
              <p className={style.sideclo2}>Cut Outs</p>
              <p className={style.sideclo2}>Dyed</p>
              <p className={style.sideclo2}>Embellished</p>
              <p className={style.sideclo2}>Printed</p>
              <p className={style.sideclo2}>Striped</p>
            </div>

            <div className={style.ruller}></div>
            <div className={style.fit}>
              <p className={style.sideclo}>Discount %</p>
              <p className={style.sideclo2}>0 - 10</p>
              <p className={style.sideclo2}>10 - 20</p>
              <p className={style.sideclo2}>20 - 30</p>
              <p className={style.sideclo2}>30 - 40</p>
              <p className={style.sideclo2}>40 - 50</p>
            </div>
          </div>

          <div className={style.inside2}>
            <div className={style.inpart1}>
              <p className={style.inp1}>Men's T-Shirts & Polos</p>
              <div
                className={style.inp2}
                onMouseOver={() => {
                  setShow(true);
                }}
                onMouseLeave={() => {
                  setShow(false);
                }}
              >
                Sort by : {wantto} <FaAngleDown className={style.indown} />
              </div>
            </div>

            <div className={style.parti}></div>

            <div className={style.prolist}>
              {mendata &&
                mendata.map((ele) => {
                  return (
                    <div
                      key={ele._id}
                      onClick={() => {
                        handleSingleproduct(ele);
                      }}
                    >
                      <img src={ele.bigimg} alt="" />
                      <p className={style.protit}>{ele.title}</p>
                      <span className={style.proprice2}>Rs. {ele.price}</span>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* price Type */}

          {show && (
            <div
              className={style.pricetype}
              onMouseOver={() => {
                setShow(true);
              }}
              onMouseLeave={() => {
                setShow(false);
              }}
            >
              <div
                onClick={(e) => {
                  handleAllProducts(e.target.innerText);
                }}
              >
                All Products
              </div>
              <div
                onClick={(e) => {
                  handleAllProducts(e.target.innerText);
                }}
              >
                Price High To Low
              </div>
              <div
                onClick={(e) => {
                  handleAllProducts(e.target.innerText);
                }}
              >
                Price Low To High
              </div>
            </div>
          )}
        </div>



      </div>

      <Footer />
    </>
  );
};

export default Men;
