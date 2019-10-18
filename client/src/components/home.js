import React, { Component } from "react";
import { Link } from "react-router-dom";
import ActiveCard from "./activeCard";
import Axios from "axios";

class Home extends Component {
  state = {
    requests: []
  };
  constructor() {
    super();
  }

  componentDidMount() {
    this.getRequests(this.props.email);
  }
  componentWillReceiveProps(props) {
    this.getRequests(props.email);
  }

  getRequests(email) {
    console.log(email);

    Axios.get("/requests/" + email).then(response => {
      console.log("response: ");
      console.log(response);
      this.setState({
        ...this.state,
        requests: response.data
      });
      console.log(this.state.requests);
    });
  }

  handleDeleteClick = id => {
    console.log("It's delete time!", id);

    Axios.delete("/requests/" + id).then(response => {
      console.log("response: ", response);
      this.getRequests(this.props.email);
    });
  };

  render() {
    const imageStyle = {
      width: 400
    };

    const loggedIn = this.props.loggedIn;
    console.log("home render, props: ");
    console.log(this.props.loggedIn);

    return (
      <div className="container pt-4" style={{ backgroundColor: "#f8f9fc" }}>
        {loggedIn ? (
          <div>
            <div className="row mt-4 mb-5">
              <div className="col text-center">
                <Link
                  role="button"
                  className="btn btn-primary"
                  to="/submit-request"
                >
                  Submit A New Request
                </Link>
              </div>
            </div>

            <div className="row mt-3 card-deck">
              <div className="card border-left-primary shadow h-100 py-2 col-sm-6 p-0">
                <div className="card-header py-3">
                  <h4 className="m-0 font-weight-bold text-primary text-center">
                    Active Requests
                  </h4>
                </div>

                <ul className="list-group list-group-flush">
                  {this.state.requests.map(request => {
                    return (
                      <ActiveCard
                        eventName={request.eventName}
                        requests={this.state.requests}
                        onClick={this.handleDeleteClick}
                        id={request.id}
                      />
                    );
                  })}
                </ul>
              </div>

              <div className="card border-left-primary shadow h-100 py-2 col-sm-6 p-0">
                <div className="card-header py-3">
                  <h4 className="m-0 font-weight-bold text-primary text-center">Processed Requests</h4>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="card col-sm-12">
                <div className="card-header text-center">Upcoming Communication Plans</div>
                <div className="card-body">
                  <div className="col-3">
                    This Week
                  </div>
                  <div className="col-3">
                    Next Week
                  </div>
                  <div className="col-3">
                    Next Next Week
                  </div>

                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row mt-3">
            <div className="col">
              <p>It's good to be home</p>
              <img
                style={imageStyle}
                src="https://i.ytimg.com/vi/N1icEHtgb3g/maxresdefault.jpg"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default Home;
