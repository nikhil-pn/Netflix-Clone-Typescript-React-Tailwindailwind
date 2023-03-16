import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
export default function Layout() {
  return (
    <>
      <Header></Header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
}
