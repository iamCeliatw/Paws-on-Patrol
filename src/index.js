import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { loader } from "../assets/Loading_icon.gif";
import { marker } from "../assets/marker.png";
import { user } from "../assets/user.png";
import { paw } from "../assets/paw.png";
import { logout } from "../assets/logout.png";
import { profile } from "../assets/profile.png";
import { walkdog } from "../assets/walkdog.png";
import { FcGoogle } from "react-icons/fc";
import { save } from "../assets/save.png";
import { background } from "/assets/background.png";
import { kamudog } from "/assets/kamudog.png";
import { cat } from "/assets/cat.png";
import { gif1 } from "/assets/home.gif";
import { gif2 } from "/assets/gif2.gif";
import { gif3 } from "/assets/gif3.gif";
import { pin } from "/assets/pin.gif";
import { happydog } from "/assets/happydog.png";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //   <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  //   {/* </React.StrictMode> */}
);
