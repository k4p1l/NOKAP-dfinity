import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import * as Nuggets_backend from "../../declarations/Nuggets_backend";
import React, { useEffect, useState } from "react";
import logo from "../../Nuggets_frontend/assets/logo.png";
import { Login } from "./Login";
import { Loader } from "./Loader";
import { createClient } from "@connect2ic/core";
import { defaultProviders } from "@connect2ic/core/providers";
import { useCanister } from "@connect2ic/react";
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
} from "@connect2ic/react";
import "./connect2ic.css";

function App() {
  const [showForm, setShowForm] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/main" element={<MainPage />} /> */}
        <Route path="/loader" element={<Loader />} />
      </Routes>
    </Router>
  );
}

function MainPage() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <div className="container">
        <Header showForm={showForm} setShowForm={setShowForm} />
        {!showForm ? "" : <FactForm />}
        <Facts />
      </div>
    </>
  );
}

function Header({ showForm, setShowForm }) {
  return (
    <header className="header">
      <div className="logo">
        {/* <img src={logo} alt="NOKAP" /> */}
        <h1>Nuggets of Knowledge</h1>
      </div>
      {/* Difference 2 */}
      <div className="auth-section">
        <ConnectButton />
      </div>
      <ConnectDialog />
      <button className="sharebtn" onClick={() => setShowForm((show) => !show)}>
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

function FactForm() {
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
      />
      <span>{1000 - textLength}</span>
      <textarea
        className="source-textarea"
        rows={fact.split("\n").length || 1}
        type="text"
        style={{ whiteSpace: "pre-line" }}
        id="source"
        placeholder="Trustworthy source"
      />
      <Link to="/loader">
        <button onClick={onSubmit} className="postbtn">
          Post
        </button>
      </Link>
    </form>
  );
}

function Facts() {
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
    <>
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
            🤯
          </button>
          <button id="revoke" className="revoke c" data-type="revoke">
            👎
          </button>
        </div>
      </li>
    </>
  ));
  return (
    <main className="main">
      <section>
        <ul className="factslist">{post}</ul>
      </section>
    </main>
  );
}

const client = createClient({
  canisters: {
    Nuggets_backend,
  },
  providers: defaultProviders,
});

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
);
