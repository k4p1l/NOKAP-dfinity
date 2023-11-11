import React, { useState } from "react";
import lf from "./Login.module.css";
import { Nuggets_backend } from "../../declarations/Nuggets_backend";
import { useNavigate,Link } from "react-router-dom";
import { Loader } from "./Loader";

const Login = () => {
  const Nav = useNavigate();

  const onSubmit = async () => {
    let u = document.getElementById("username");
    let p = document.getElementById("password");

    var userNm = u.value;
    var userPass = p.value;
   
    const res = await Nuggets_backend.authUser(userNm, userPass);
    

    if (res === "exists") {
      Nav("/main");
    } else if (res === "not Exists") {
      alert("No user Found");
    }
  };
  return (
  <>
    <div className={lf.container}>
      <div className={lf.header}>
        <span className={lf.crm}>Nuggets Of Knowledge</span>
      </div>
      <div className={lf.main}>
        <span className={lf.user}>User Admin</span>
        <span className={lf.login}>Login</span>
      </div>
      <div className={lf.field}>
        <input
          className={lf.input}
          id="username"
          type="text"
          placeholder="🤵 Username"
        />
        <input
          className={lf.input}
          id="password"
          type="password"
          placeholder="🔒 Password"
          />
          <center>
          <Link to="./loader">
          <button className={lf.sign} onClick={onSubmit}>
          Sign In
            </button>
          </Link></center>
        
      </div>
    </div>
    </>
  );
};

export { Login };
