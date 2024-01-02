import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCanister } from "@connect2ic/react";
import { motion } from "framer-motion";

function FactForm() {
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
      x: mousePosition.x - 5,
      y: mousePosition.y - 5,
    },
    text: {
      height: 50,
      width: 50,
      x: mousePosition.x - 25,
      y: mousePosition.y - 25,
      backgroundColor: "yellow",
      mixBlendMode: "difference",
    },
  };

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  const [Nuggets_backend] = useCanister("Nuggets_backend");
  const nav = useNavigate();
  const [fact, setFact] = useState("");
  var textLength = fact.length;

  const onSubmit = async () => {
    let a = document.getElementById("fact");
    let b = document.getElementById("source");

    await Nuggets_backend.addPost(a.value, b.value);
    nav("/");
  };

  return (
    <form className="factform">
      <textarea
        id="fact"
        className="fact-textarea"
        rows={fact.split("\n").length || 1}
        type="text"
        style={{ whiteSpace: "pre-line" }}
        placeholder="Share a fact that you learned mate"
        onChange={(e) => setFact(e.target.value)}
        onMouseEnter={textEnter}
        onMouseLeave={textLeave}
      />
      <span>{1000 - textLength}</span>
      <textarea
        className="source-textarea"
        rows={fact.split("\n").length || 1}
        type="text"
        style={{ whiteSpace: "pre-line" }}
        id="source"
        placeholder="Trustworthy source"
        onMouseEnter={textEnter}
        onMouseLeave={textLeave}
      />
      <Link to="/loader">
        <button
          onMouseEnter={textEnter}
          onMouseLeave={textLeave}
          onClick={onSubmit}
          className="postbtn"
        >
          Post
        </button>
        <motion.div
          className="cursor"
          variants={variants}
          animate={cursorVariant}
          transition={{ type: "tween", ease: "backOut" }}
        />
      </Link>
    </form>
  );
}

export default FactForm;
