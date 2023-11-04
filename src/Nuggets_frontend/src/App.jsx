import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Nuggets_backend } from "../../declarations/Nuggets_backend";
import React, { useEffect, useState } from "react"

function App() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="container">
      <Header showForm={showForm} setShowForm={setShowForm} />
      <FactForm />
      <Facts />
    </div>
  );
}

function Header({ showForm, setShowForm }) {
  return (
    <header className="header">
      <div className="logo">
        {/* <img src={logo} alt="NOKAP" /> */}
        <h1>Nuggets of Knowledge</h1>
      </div>

      <button className="sharebtn" onClick={() => setShowForm((show) => !show)}>
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}

function FactForm() {
//   const [counter] = useCanister("counter");
  const onSubmit = async () => {
    let a = document.getElementById("fact");
    let b = document.getElementById("source");

    await Nuggets_backend.addPost(a.value, b.value);

    setTimeout(() => {
      window.location.reload(false);
    }, 3000);
  };
  return (
    <form className="factform">
      <input
        id="fact"
        type="text"
        placeholder="Share a fact that you learned mate"
      />
      <span>400</span>
      <input id="source" type="text" placeholder="Trustworthy source" />
      <button onClick={onSubmit} className="postbtn">
        Post
      </button>
    </form>
  );
}

function Facts() {
//   const [counter] = useCanister("counter");
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
  const post = data.map((a) => (
    <>
      <li className="fact">
        <p>{a.fact}</p>
        <a className="source" href={"https://" + a.source} target="_blank">
          (source)
        </a>
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
