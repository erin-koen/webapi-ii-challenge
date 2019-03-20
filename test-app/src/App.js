import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import PostList from "./PostList";

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8000/api/posts")
      .then(response => {
        this.setState(() => ({ posts: response.data }));
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="App">
        <PostList posts={this.state.posts}/>
      </div>
    );
  }
}

export default App;
