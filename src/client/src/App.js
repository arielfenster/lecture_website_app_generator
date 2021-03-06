import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from './routes/CreateUserPage/components/navbar.components';
import CreateUser from './routes/CreateUserPage/components/create-user.component';

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;