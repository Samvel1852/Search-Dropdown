import React, { Component } from "react";
import styles from "./App.module.css";

class App extends Component {
  state = {
    data: null,
    results: [],
  };

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((d) => {
        let names = d.map((item) => item.name);
        this.setState({ data: names });
      });
  }

  inputHandler = (e) => {
    if (e.target.value === "") {
      return;
    }
    let txt = e.target.value[0].toUpperCase() + e.target.value.slice(1);
    let filtered = this.state.data.filter((item) => item.startsWith(txt));
    this.setState({ results: filtered });
  };

  render() {
    return this.state.data ? (
      <div className={styles.App}>
        <input onChange={(e) => this.inputHandler(e)} />
        <div
          hidden={this.state.results.length ? false : true}
          className={styles.results}
        >
          {this.state.results.length
            ? this.state.results.map((item) => {
                return <p key={item}>{item}</p>;
              })
            : null}
        </div>
      </div>
    ) : (
      <h3>Loading...</h3>
    );
  }
}

export default App;
