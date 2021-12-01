import React, { useState } from "react";
import Navbar from "./components/layout/Navbar";
import "./App.css";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import axios from "axios";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = () => {

  const [users, setUsers] = useState([]);
  const[user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  // async componentDidMount() {
  //   this.setState({ loading: true, alert: null });

  //   const { data } = await axios.get(
  //     `https://api.github.com/users?client_id?${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );

  //   this.setState({ users: data, loading: false });
  // }

  const searchUsers = async (text) => {
    setLoading(true);
    setAlert(null);

    const { data } = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id?${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    
    setLoading(false);
    setUsers(data.items);
  };

  const getUser = async (username) => {
    setLoading(true);
    setAlert(null);

    const { data } = await axios.get(
      `https://api.github.com/users/${username}?client_id?${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setLoading(false);
    setUser(data);
  };

  const getUserRepos = async (username) => {
    setLoading(true);
    setAlert(null);

    const { data } = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id?${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setLoading(false);
    setRepos(data);
  };

  const clearUsers = () => {
    setUsers([]);
    setAlert(null);
  };

  const showAlert = (msg, text) => {
    setAlert({ msg: msg, text: text });
    setTimeout(() => setAlert(null), 5000);
  };

    

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={(props) => (
                <>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
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
                  getUser={getUser}
                  getUserRepos={getUserRepos}
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

export default App;
