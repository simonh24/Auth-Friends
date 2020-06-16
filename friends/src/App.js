import React from 'react';
import './App.css';
import { Route } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import FriendsList from "./components/FriendsList";
import FriendsForm from "./components/FriendsForm";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <LoginForm />
      </Route>
      <PrivateRoute exact path="/friends" component={FriendsForm}/>
      <PrivateRoute exact path="/friends" component={FriendsList}/>
    </div>
  );
}

export default App;
