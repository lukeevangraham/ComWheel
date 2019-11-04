import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Route, Link } from "react-router-dom";
import logo from "../logo.svg";
import "../App.css";
import axios from "axios";

class Navbar extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    console.log("logging out");
    axios
      .post("/user/logout")
      .then(response => {
        console.log(response.data);
        if (response.status === 200) {
          this.props.updateUser({
            loggedIn: false,
            email: null
          });
        }
      })
      .catch(error => {
        console.log("Logout error");
      });
  }

  render() {
    const loggedIn = this.props.loggedIn;
    const currentOrg = this.props.orgName;
    console.log("navbar render, props: ");
    console.log(this.props);

    return (

        <nav
          className="navbar navbar-expand-lg navbar-dark bg-gradient-primary shadow"
          id="nav-container"
        >
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link className="navbar-brand" to="/">Request Wheel</Link>

            {loggedIn ? (
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to="/">
                      home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/people">people</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="#" onClick={this.logout}>
                      logout
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                  <li className="nav-item">
                    <Link to="/" className="nav-link">
                      home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/signup" className="nav-link">
                      sign up
                    </Link>
                  </li>
                </ul>
              </div>
            )}
        </nav>

    );
  }
}

export default Navbar;
