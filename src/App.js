import React from "react";
import "./App.css";
import Header from "./components/Header.js";
import Search from "./components/Search.js";
import "semantic-ui-css/semantic.min.css";
import { Card } from "semantic-ui-react";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header title="Movie Search" />
      </header>
      <section>
        <Search />
      </section>
    </div>
  );
}

export default App;
