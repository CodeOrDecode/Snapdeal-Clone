import React from "react";
import Navbar from "../Allsimilar/Navbar";
import Footer from "../Allsimilar/Footer";
import style from "../Css/Loading.module.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Afterloginnavbar from "../Allsimilar/Afterloginnavbar"

const Loading = () => {
const navigate = useNavigate();
  useEffect(() => {
    document.title = "Snapdeal - Loading"
   setTimeout(() => {
    navigate("/conformation");
   }, 4000);
  }, [])
  
  return (
    <>
      <Afterloginnavbar />

      <div className={style.mainloading}>
        <div className={style.loader}>
          <img
            src="https://cdn.dribbble.com/users/583436/screenshots/1725368/out.gif"
            alt=""
          />
        </div>
        <p className={style.process}>Processing .........</p>
      </div>

      <Footer />
    </>
  );
};

export default Loading;
