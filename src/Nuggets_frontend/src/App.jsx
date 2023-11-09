import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import { Nuggets_backend } from "../../declarations/Nuggets_backend";
import React, { useEffect, useState } from "react";
import logo from "../../Nuggets_frontend/assets/logo.png"
import { Login } from "./Login";
import {Loader} from "./Loader"

function App() {
  // const [showForm, setShowForm] = useState(false);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/loader" element={<Loader/>}/>
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
        {/* <FactForm /> */}
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
        <img src={logo} alt="NOKAP" />
        <h1>Nuggets of Knowledge</h1>
      </div>

      <button className="sharebtn" onClick={() => setShowForm((show) => !show)}>
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

function FactForm() {
  const nav = useNavigate();
  // const history = useHistory()
  const [fact, setFact] = useState("");
  var textLength = fact.length;
  //   const [counter] = useCanister("counter");
  const onSubmit = async () => {
    let a = document.getElementById("fact");
    let b = document.getElementById("source");

    await Nuggets_backend.addPost(a.value, b.value);
    nav("/main");
  };
  return (
    <form className="factform">
      <input
        id="fact"
        type="text"
        placeholder="Share a fact that you learned mate"
        onChange={(e) => setFact(e.target.value)}
      />
      <span>{400 - textLength}</span>
      <input id="source" type="text" placeholder="Trustworthy source" />
      <Link to="/loader">
        <button onClick={onSubmit} className="postbtn">
          Post
        </button>
      </Link>
    </form>
  );
}

function Facts() {
  //   const [counter] = useCanister("counter");
  const [data, setData] = useState([]);
  const [like, setLike] = useState();

  useEffect(() => {
    fetchData();
    onLike();
  }, []);

  const fetchData = async () => {
    try {
      const res = await Nuggets_backend.getPosts();
      setData(res);
    } catch (e) {
      console.log(e);
    }
  };

  const onLike = async () => {
    try {
      const res = await Nuggets_backend.like();
      console.log(res);
      setLike(res.toString());
    } catch (e) {
      console.log(e);
    }
  };

  const post = data.map((a) => (
    <>
      <li className="fact">
        <p>{a.fact}</p>
        <a className="source" href={"https://" + a.source} target="_blank">
          (source)
        </a>
        <div className="votebuttons">
          <button>
            👍 <strong>{like}</strong>
          </button>
          <button>
            🤯 <strong>2</strong>
          </button>
          <button>
            ⛔️ <strong>1</strong>
          </button>
        </div>
      </li>
    </>
  ));
  return (
    <main className="main">
      <section>
        <ul className="factslist">
          {post}
          {/* <li className="fact">
              <p>
                React is being develped by Meta (formerly Facebook).
                <a
                  className="source"
                  href="https://opensource.fb.com/"
                  target="_blank"
                >
                  (Source)
                </a>
              </p>
  
              <div className="votebuttons">
                <button>
                  👍 <strong>24</strong>
                </button>
                <button>
                  🤯 <strong>9</strong>
                </button>
                <button>
                  ⛔️ <strong>4</strong>
                </button>
              </div>
            </li> */}
          {/* <li className="fact">
              <p>
                Millenial dads spend 3 times as much time with their kids that
                their fathers spent with them. In 1992, 43% of fathers had never
                changed a diaper.Today the number is down to 3%.
                <a
                  className="source"
                  href="https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids"
                  target="_blank"
                >
                  (Source)
                </a>
              </p>
  
              <div className="votebuttons">
                <button>
                  👍 <strong>11</strong>
                </button>
                <button>
                  🤯 <strong>2</strong>
                </button>
                <button>
                  ⛔️ <strong>0</strong>
                </button>
              </div>
            </li> */}
        </ul>
      </section>
    </main>
  );
}
export default App;
