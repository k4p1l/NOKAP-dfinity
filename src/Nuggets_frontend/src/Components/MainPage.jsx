import React, { useState } from "react";
import Header from "./Header";
import FactForm from "./FactForm";
import Facts from "./Facts";

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

export { MainPage };
