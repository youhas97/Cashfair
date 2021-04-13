import React from "react";

import "../styling/Main.css"

import Dashboard from "./dashboard/Dashboard"

function Main() {
  function handleClick(e) {
    e.preventDefault();
    alert("hello world");
  }

  return (
    <main className="Main">
      <Dashboard />
    </main>
  )
}

export default Main