import React, { useState, useEffect } from "react";
import { ConnectButton, ConnectDialog } from "@connect2ic/react";
import { motion } from "framer-motion";
import "../Styles/connect2ic.css"
function Header({ showForm, setShowForm }) {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 12,
      y: mousePosition.y - 12,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "yellow",
      mixBlendMode: "difference",
    },
  };

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  return (
    <header className="header">
      <div className="logo">
        <h1 onMouseEnter={textEnter} onMouseLeave={textLeave}>
          Nuggets of Knowledge
        </h1>
      </div>
      <div
        onMouseEnter={textEnter}
        onMouseLeave={textLeave}
        className="auth-section"
      >
        <ConnectButton />
      </div>
      <ConnectDialog />
      <button
        onMouseEnter={textEnter}
        onMouseLeave={textLeave}
        className="sharebtn"
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "Close" : "Share a fact"}
      </button>
      <motion.div
        className="cursor"
        variants={variants}
        animate={cursorVariant}
        transition={{ type: "tween", ease: "backOut" }}
      />
    </header>
  );
}

export default Header;
