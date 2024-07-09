// src/components/Navbar.js
import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../app/userSlice";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import Weather from "./Weather";
import { IoMdCreate } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { useState, useEffect } from "react";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import { FaChartSimple } from "react-icons/fa6";
import { IoCartSharp } from "react-icons/io5";

const themes = {
  winter: "winter",
  dracula: "dracula",
};

function darkMode() {
  return localStorage.getItem("mode") || themes.winter;
}

function Navbar() {
  const [theme, setTheme] = useState(darkMode);

  const handleClick = () => {
    const newTheme = theme === themes.winter ? themes.dracula : themes.winter;
    setTheme(newTheme);
    localStorage.setItem("mode", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const logOutProfile = async () => {
    try {
      await signOut(auth);
      toast.success("See you soon");
      dispatch(logout());
    } catch (error) {
      toast.error(error.message);
    }
  };

  const totalItemsInCart = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="bg-base-200">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to={"/"} className="btn btn-ghost text-xl">
            Kitchen App
          </Link>
        </div>

        <div className="flex-none gap-4 items-center capitalize">
          <p className="font-bold">{user?.displayName}</p>{" "}
          {/* Handle undefined user */}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src={
                    user?.photoURL ||
                    "https://static.thenounproject.com/png/363640-200.png"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Weather />
              </li>
              <li>
                <Link to="/cart">
                  <IoCartSharp />
                  Cart
                  <span className="badge badge-sm">{totalItemsInCart}</span>
                </Link>
              </li>
              <li>
                <a onClick={handleClick}>
                  {theme === themes.winter ? <IoMdSunny /> : <IoMdMoon />}
                  Theme
                </a>
              </li>
              <li>
                <Link to={"./create"}>
                  <IoMdCreate />
                  Create
                </Link>
              </li>
              <li>
                <Link to={"/piechart"}>
                  <FaChartSimple />
                  Chart
                </Link>
              </li>

              <li>
                <a onClick={logOutProfile}>
                  <BiLogOutCircle />
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
