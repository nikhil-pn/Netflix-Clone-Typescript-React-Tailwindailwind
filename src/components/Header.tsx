import React from "react";
import { NavLink, Link } from "react-router-dom";
import netflix from "../assets/logo.png";

export default function Header() {
  function isActiveLink({ isActive }: { isActive: boolean }) {
    return isActive ? "font-semibold text-white" : "undefined";
  }

  return (
    <header className="border-b-2 py-2">
      <nav className="grid grid-cols-[200px_auto_200px] items-center gap-4">
        <section className="h-12">
          <Link to="/browse">
            <img
              className="h-full w-full object-contain"
              src={netflix}
              alt="netflix logo"
            />
          </Link>
        </section>
        <section className="text-sm text-gray-300 font-thin">
          <ul className="flex gap-4">
            <li>
              <NavLink className={isActiveLink} to="/browse">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={isActiveLink} to="/browse/genre">
                Tv Show
              </NavLink>
            </li>
            <li>
              <NavLink className={isActiveLink} to="/browse/genre/movies">
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink className={isActiveLink} to="/latest">
                New & Popular
              </NavLink>
            </li>
          </ul>
        </section>
        <section>
         Search Icon
          userInfo 
        </section>
      </nav>
    </header>
  );
}
