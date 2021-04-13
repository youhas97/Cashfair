import React from "react";

import "../styling/Main.css"

function Main() {
  function handleClick(e) {
    e.preventDefault();
    alert("get fucked");
  }

  return (
    <main className="Main">
      <button onClick={handleClick}>Click me!</button>
    </main>
  )
}

export default Main