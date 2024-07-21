import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/icons/logo.png";
import { RouteUrls } from "../../RouteUrls";
import { useAuthContext } from "../../contexts/AuthContext";

export function Navbar(): React.JSX.Element {
  const { currentUser } = useAuthContext();
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between flex-wrap bg-primary px-6 py-2">
      <div className="flex items-center flex-shrink-0 text-white">
        <NavLink
          to={RouteUrls.HOME}
          className="font-semibold text-xl tracking-tight"
        >
          <img src={logo} alt="logo" className="w-12 h-12 text-white" />
        </NavLink>
      </div>
      <div className="flex lg:items-center justify-center">
        <div className="flex gap-2 flex-wrap">
          {currentUser ? (
            <NavLink
              to={RouteUrls.LOGOUT}
              className="inline-block leading-none border rounded mt-4 lg:mt-0 px-4 py-2 text-red-700 border-red-700 hover:border-transparent hover:text-white hover:bg-red-700 text-base"
            >
              Logout
            </NavLink>
          ) : (
            <>
              <NavLink
                to={RouteUrls.LOGIN}
                className={`inline-block leading-none border rounded mt-4 lg:mt-0 px-4 py-2 text-white border-white hover:border-transparent hover:text-gray-500 hover:bg-white text-base ${
                  location.pathname === RouteUrls.LOGIN
                    ? "bg-white !text-gray-900"
                    : ""
                }`}
              >
                Login
              </NavLink>
              <NavLink
                to={RouteUrls.SIGNUP}
                className={`inline-block leading-none border rounded mt-4 lg:mt-0 px-4 py-2 text-white border-white hover:border-transparent hover:text-gray-500 hover:bg-white text-base ${
                  location.pathname === RouteUrls.SIGNUP
                    ? "bg-white !text-gray-900"
                    : ""
                }`}
              >
                Sign up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
