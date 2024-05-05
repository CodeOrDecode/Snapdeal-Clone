import React from "react";
import style from "../Css/Afterloginnavbar.module.css";
import { IoSearch } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { BiSolidUser } from "react-icons/bi";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaFirstOrder } from "react-icons/fa6";
import { useState } from "react";
import ReactDOM from "react-dom";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { IoGiftOutline } from "react-icons/io5";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Authcontext } from "../Context/Authcontextprovider";

const Afterloginnavbar = () => {
  const { handlelogoutauth, cartno } = React.useContext(Authcontext);
  const navigate = useNavigate();

  const [flyit, setFlyit] = useState(false);
  const [who, setWho] = useState("Ritesh");
  const [title, setTitle] = useState("");

  function handleWho() {
    let getname = JSON.parse(localStorage.getItem("name"));
    setWho(getname);
  }

  function handleLogout() {
    toast.success("Logout Successful 😁", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    setTimeout(() => {
      localStorage.clear();
      handlelogoutauth();
      navigate("/");
    }, 2000);
  }

  function handleSingleproduct(pro) {
    localStorage.setItem("product", JSON.stringify(pro));
    navigate("/product");
  }

  async function handleSearch() {
    try {
      let res = await fetch(
        `https://snapdeal-backend-4.onrender.com/men/search?q=${title}`
      );
      let res2 = await res.json();
      if (res2 != null) {
        console.log(res2);
        handleSingleproduct(res2);
      } else {
        toast.error("Product not found", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTitle("");
      }
    } catch (error) {
      toast.error("Product not found", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTitle("");
    }
  }

  function handleCart() {
    navigate("/cart");
  }

  function handlego() {
    navigate("/afterlogin");
  }

  function handleOrder(){
    navigate("/order");
  }

  useEffect(() => {
    handleWho();
  }, []);

  return (
    <div className={style.navpri}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className={style.nav1}>
        <div className={style.navp1}>
          Brand Waali Quality, Bazaar Waali Deal!
        </div>
        <div className={style.nav2}>
          <div>Impact@Snapdeal</div>
          <div>Help Center</div>
          <div>Sell On Snapdeal</div>
          <div className={style.nav3}>
            <img
              className={style.navimg}
              src="https://i4.sdlcdn.com/img/platinum09/downloadappicon2ndsep.png"
              alt=""
            />
            <div>Download App</div>
          </div>
          <div>Donate for elderly</div>
        </div>
      </div>

      <div className={style.navpart2}>
        <div className={style.divlogo} onClick={handlego}>
          <img
            src="https://i3.sdlcdn.com/img/snapdeal/darwin/logo/sdLatestLogo.svg"
            alt=""
          />
        </div>
        <div className={style.inputone}>
          <input
            type="text"
            placeholder="Search products &amp; brands"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <button className={style.navbutton} onClick={handleSearch}>
            <IoSearch className={style.search1} />
            Search
          </button>
        </div>
        <div className={style.cart} onClick={handleCart}>
          <div className={style.cartp}>Cart</div>
          <IoCartOutline className={style.carticon} />
        </div>

        <div
          className={flyit ? style.signin2 : style.signin}
          onMouseOver={() => {
            setFlyit(true);
          }}
          onMouseLeave={() => {
            setFlyit(false);
          }}
        >
          <div className={style.signinp}>{who}</div>
          <div className={style.account}>
            <BiSolidUser className={style.accountsmall} />
          </div>
        </div>
      </div>

      {flyit && (
        <div
          className={style.blackfly}
          onMouseOver={() => {
            setFlyit(true);
          }}
          onMouseLeave={() => {
            setFlyit(false);
          }}
        >
          <div className={style.partfly}>
            <div onClick={handleOrder}>
              <FaFirstOrder className={style.iconfly} />
              <p className={style.flyp2}>Your Orders</p>
            </div>
            <div>
              <MdOutlineFavoriteBorder className={style.iconfly} />
              <p className={style.flyp2}>Shortlist</p>
            </div>

            <div>
              <IoGiftOutline className={style.iconfly} />
              <p className={style.flyp2}>E-Gift Voucher</p>
            </div>
          </div>

          <div className={style.rullerhome}></div>

          <button className={style.logouthome} onClick={handleLogout}>
            LOGOUT
          </button>
        </div>
      )}

      {/* cart product count */}
      <div className={style.cartcou1}>
        <p>{cartno}</p>
      </div>
    </div>
  );
};

export default Afterloginnavbar;
