import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Authcontext = React.createContext();

const Authcontextprovider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  const [allpro, setAllpro] = useState([]);
  const [total, setTotal] = useState(0);
  const [checkall, setCheckall] = useState([]);
  const [checktotal, setChecktotal] = useState(0);
  const [ordergo, setOrdergo] = useState(null);
  const [cartno, setCartno] = useState(0);

  function handlesignupauth() {
    setAuth(true);
  }

  function handleloginauth() {
    setAuth(true);
  }

  function handlelogoutauth() {
    setAuth(false);
  }

  function handleorderid() {
    let rannum = Math.floor(Math.random() * 999999999999 + 9999999999);
    setOrdergo(rannum);
  }

  function handleProductAdd(val) {
    // console.log(val);
    let alldata = JSON.parse(localStorage.getItem("cartpro"));

    let updateIn = alldata.map((ele) => {
      if (ele.id == val) {
        ele.qty = ele.qty + 1;
        return ele;
      } else {
        return ele;
      }
    });

    let allPrice = 0;

    updateIn.forEach((ele) => {
      allPrice = allPrice + ele.price * ele.qty;
    });
    setTotal(allPrice);
    setAllpro(updateIn);
    localStorage.setItem("cartpro", JSON.stringify(updateIn));
  }

  function handleProductdecre(val, val2) {
    if (val2 == 1) {
      let alldata = JSON.parse(localStorage.getItem("cartpro"));

      let upcomplex = alldata.filter((ele) => {
        if (ele.id != val) {
          return ele;
        }
      });

      let allPrice = 0;

      upcomplex.forEach((ele) => {
        allPrice = allPrice + ele.price * ele.qty;
      });
      setTotal(allPrice);
      setCartno(cartno - 1);
      setAllpro(upcomplex);
      localStorage.setItem("cartpro", JSON.stringify(upcomplex));
    } else {
      let alldata = JSON.parse(localStorage.getItem("cartpro"));

      let updateIn = alldata.map((ele) => {
        if (ele.id == val) {
          ele.qty = ele.qty - 1;
          return ele;
        } else {
          return ele;
        }
      });

      let allPrice = 0;

      updateIn.forEach((ele) => {
        allPrice = allPrice + ele.price * ele.qty;
      });
      setTotal(allPrice);
      setAllpro(updateIn);
      localStorage.setItem("cartpro", JSON.stringify(updateIn));
    }
  }

  function removepro(val) {
    let alldata = JSON.parse(localStorage.getItem("cartpro"));

    let upcomplex2 = alldata.filter((ele) => {
      if (ele.id != val) {
        return ele;
      }
    });

    let allPrice = 0;

    upcomplex2.forEach((ele) => {
      allPrice = allPrice + ele.price * ele.qty;
    });
    setTotal(allPrice);
    setCartno(cartno - 1);
    setAllpro(upcomplex2);
    localStorage.setItem("cartpro", JSON.stringify(upcomplex2));
  }

  function handleCartStorage() {
    let alldata = JSON.parse(localStorage.getItem("cartpro"));
    if (alldata == null || alldata == []) {
      setAllpro([]);
    } else {
      setAllpro(alldata);

      let allPrice = 0;

      alldata.forEach((ele) => {
        allPrice = allPrice + ele.price * ele.qty;
      });
      // console.log(allPrice);
      setTotal(allPrice);
      setCartno(alldata.length);
    }
  }

  function purchaseIt(val1, val2) {
    let obj = {
      id: Math.random() + Date.now(),
      title: val1.title,
      img: val1.bigimg,
      price: val1.price,
      size: val2,
      qty: 1,
    };
    if (
      JSON.parse(localStorage.getItem("cartpro")) == null ||
      JSON.parse(localStorage.getItem("cartpro")) == []
    ) {
      localStorage.setItem("cartpro", JSON.stringify([obj]));
      setCartno(1);
    } else {
      let datapro = JSON.parse(localStorage.getItem("cartpro"));
      let depen = false;
      let notcome = datapro.map((ele) => {
        if (ele.title == val1.title && ele.size == val2) {
          ele.qty = ele.qty + 1;
          depen = true;
          return ele;
        } else {
          return ele;
        }
      });

      if (depen == true) {
        localStorage.setItem("cartpro", JSON.stringify(notcome));
      } else {
        localStorage.setItem("cartpro", JSON.stringify([...datapro, obj]));
        setCartno(cartno + 1);
      }
    }
  }

  function purchaseIt2(val1, val2) {
    let obj = {
      title: val1.title,
      img: val1.bigimg,
      price: val1.price,
      size: val2,
      qty: 1,
    };

    localStorage.setItem("cartpro", JSON.stringify([obj]));
    navigate("/checkout");
  }

  function handleCheckout() {
    let alldata = JSON.parse(localStorage.getItem("cartpro"));
    setCartno(alldata.length);
    setCheckall(alldata);
    let allPrice = 0;

    alldata.forEach((ele) => {
      allPrice = allPrice + ele.price * ele.qty;
    });
    // console.log(allPrice);
    setChecktotal(allPrice);
  }

  function handleproductPage() {
    if (
      JSON.parse(localStorage.getItem("cartpro")) == null ||
      JSON.parse(localStorage.getItem("cartpro")) == []
    ) {
      setCartno(0);
    } else {
      let alldata = JSON.parse(localStorage.getItem("cartpro"));
      setCartno(alldata.length);
    }
  }

  function handlecartno() {
    let nois = JSON.parse(localStorage.getItem("cartpro"));
    if (nois == null || nois == undefined || nois == []) {
      setCartno(0);
    } else {
      setCartno(nois.length);
    }
  }

  function handlecartalso() {
    setAllpro([]);
    localStorage.setItem("cartpro", JSON.stringify([]));
    setCartno(0);
  }

  return (
    <Authcontext.Provider
      value={{
        auth,
        handlesignupauth,
        handleloginauth,
        handlelogoutauth,
        purchaseIt,
        handleCartStorage,
        allpro,
        total,
        handleProductAdd,
        handleProductdecre,
        removepro,
        handleCheckout,
        checkall,
        checktotal,
        handleorderid,
        ordergo,
        purchaseIt2,
        cartno,
        handleproductPage,
        handlecartalso,
        handlecartno,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
};

export default Authcontextprovider;
