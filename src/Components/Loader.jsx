import React from "react";
import style from "../Css/Loader.module.css"

const Loader = () => {
  return (
    <div className={style.loaderdiv}>
      <img
        src="https://cdn.dribbble.com/users/583436/screenshots/1725368/out.gif"
        alt=""
      />
    </div>
  );
};

export default Loader;
