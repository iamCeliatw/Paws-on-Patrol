import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { loader } from "../assets/Loading_icon.gif";
import { pin } from "../assets/pin.png";
import { marker } from "../assets/marker.png";
import { search } from "../assets/search.png";
import { user } from "../assets/user.png";
import { paw } from "../assets/paw.png";
import { miao } from "../assets/miao.jpeg";
import { logout } from "../assets/logout.png";
import { profile } from "../assets/profile.png";
import { FcGoogle } from "react-icons/fc";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //   <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  //   {/* </React.StrictMode> */}
);
