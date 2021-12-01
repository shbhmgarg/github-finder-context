import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import "./App.css";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import axios from "axios";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  state = {
    user: {},
    users: [],
    loading: false,
    alert: null,
    repos: [],
  };
  async componentDidMount() {
    this.setState({ loading: true, alert: null });

    const { data } = await axios.get(
      `https://api.github.com/users?client_id?${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: data, loading: false });
  }

  searchUsers = async (text) => {
    this.setState({ loading: true, alert: null });

    const { data } = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id?${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ users: data.items, loading: false });
  };

  getUser = async (username) => {
    this.setState({ loading: true, alert: null });

    const { data } = await axios.get(
      `https://api.github.com/users/${username}?client_id?${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ user: data, loading: false });
  };

  getUserRepos = async (username) => {
    this.setState({ loading: true, alert: null });

    const { data } = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id?${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ repos: data, loading: false });
  };

  clearUsers = () => {
    this.setState({ users: [], alert: null });
  };

  setAlert = (msg, text) => {
    this.setState({ alert: { msg: msg, text: text } });

    setTimeout(() => this.setState({ alert: null }), 5000);
  };

  render() {
    const { users, loading, user, repos } = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </>
                )}
              />
              <Route path='/about' component={About} />
              <Route
                path='/user/:login'
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
