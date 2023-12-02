import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Connect2ICProvider } from "@connect2ic/react";
import { MainPage } from "./Components/MainPage";
import { Loader } from "./Loader/Loader";
import { createClient } from "@connect2ic/core";
import { defaultProviders } from "@connect2ic/core/providers";
import * as Nuggets_backend from "../../declarations/Nuggets_backend";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/loader" element={<Loader />} />
      </Routes>
    </Router>
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
