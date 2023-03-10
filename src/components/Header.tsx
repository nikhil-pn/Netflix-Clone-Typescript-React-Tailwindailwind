import React from "react";

import netflix from "../assets/logo.png"

export default function Header() {
  return (
    <header className="border-b-2 py-2">
      <nav className="grid grid-cols-[200px_auto_200px] gap-4">
        <section>
          <img className="h-10" src={netflix} alt="" />
        </section>
        <section>Primary</section>
        <section>Secondary</section>
      </nav>
    </header>
  );
}
