import React, { useState, useEffect } from "react";
import { useCanister } from "@connect2ic/react";
import { motion } from "framer-motion";
import { FaBookmark } from "react-icons/fa6";
import { IconContext } from "react-icons";

function Facts() {
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
      height: 20,
      width: 20,
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      backgroundColor: "yellow",
      mixBlendMode: "difference",
    },
  };

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  const [Nuggets_backend] = useCanister("Nuggets_backend");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await Nuggets_backend.getPosts();
      setData(res);
    } catch (e) {
      console.log(e);
    }
  };

  const handleButtonClick = (event) => {
    const button = event.target;
    const buttonType = button.getAttribute("data-type");

    if (
      buttonType === "like" ||
      buttonType === "mind" ||
      buttonType === "revoke"
    ) {
      const post = button.closest(".votebuttons");
      const activeButton = post.querySelector(`.${buttonType}Active`);

      if (activeButton) {
        activeButton.classList.remove(`${buttonType}Active`);
        activeButton.classList.add(`${buttonType}`);
      } else {
        button.classList.add(`${buttonType}Active`);
        button.classList.remove(`${buttonType}`);
      }

      if (buttonType === "like") {
        post.querySelector(".b").classList.add("mind");
        post.querySelector(".c").classList.add("revoke");
        post.querySelector(".b").classList.remove("mindActive");
        post.querySelector(".c").classList.remove("revokeActive");
      } else if (buttonType === "mind") {
        post.querySelector(".a").classList.add("like");
        post.querySelector(".c").classList.add("revoke");
        post.querySelector(".a").classList.remove("likeActive");
        post.querySelector(".c").classList.remove("revokeActive");
      } else if (buttonType === "revoke") {
        post.querySelector(".a").classList.add("like");
        post.querySelector(".b").classList.add("mind");
        post.querySelector(".a").classList.remove("likeActive");
        post.querySelector(".b").classList.remove("mindActive");
      }
    }
  };

  const post = data.map((a) => (
    <li className="fact" key={a.id}>
      <p style={{ whiteSpace: "pre-line" }}>{a.fact}</p>
      <a className="source" href={a.source} target="_blank">
        (source)
      </a>
      <div onClick={handleButtonClick} className="votebuttons">
        <button id="like" className="like a" data-type="like">
          👍
        </button>
        <button id="mind" className="mind b" data-type="mind">
          <IconContext.Provider
            value={{ color: "blue", className: "bookmark-icon" }}
          >
            <div>
              <FaBookmark />
            </div>
          </IconContext.Provider>
        </button>
        <button id="revoke" className="revoke c" data-type="revoke">
          👎
        </button>
      </div>
    </li>
  ));

  return (
    <main className="main">
      <section>
        <ul
          onMouseEnter={textEnter}
          onMouseLeave={textLeave}
          className="factslist"
        >
          {post}
        </ul>
        <motion.div
          className="cursor"
          variants={variants}
          animate={cursorVariant}
          transition={{ type: "tween", ease: "backOut" }}
        />
      </section>
    </main>
  );
}

export default Facts;
