import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import moment from "moment";
import Axios from "axios";

class WeekendPlanPrint extends Component {
  state = {
    annVideoRequests: [],
    connectionCardRequests: [],
    newsletterRequests: [],
    tvScreensRequests: [],
    otherRequests: []
  };

  componentDidMount() {
    console.log("WEEKEND PLAN PRINT PROPS: ", this.props);
    Promise.all([
      Axios.get(
        "/requests/annVid/" +
          moment(this.props.date).format("YYYY-MM-DD") +
          "&" +
          this.props.orgName
      ),
      Axios.get(
        "/requests/connectionCard/" +
          moment(this.props.date).format("YYYY-MM-DD") +
          "&" +
          this.props.orgName
      ),
      Axios.get(
        "/requests/tvScreens/" +
          moment(this.props.date).format("YYYY-MM-DD") +
          "&" +
          this.props.orgName
      ),
      Axios.get(
        "/requests/newsletter/" +
          moment(this.props.date).format("YYYY-MM-DD") +
          "&" +
          this.props.orgName
      ),
      Axios.get(
        "/requests/other/" +
          moment(this.props.date).format("YYYY-MM-DD") +
          "&" +
          this.props.orgName
      )
    ]).then(resultArray => {
      console.log("PROMISE RESULT: ", resultArray);
      this.setState({
        ...this.state,
        annVideoRequests: resultArray[0].data,
        connectionCardRequests: resultArray[1].data,
        tvScreensRequests: resultArray[2].data,
        newsletterRequests: resultArray[3].data,
        otherRequests: resultArray[4].data
      });
      // console.log("state: ");
      // console.log(this.state);
    });
    // this.getRequests(moment().day(0).format("YYYY-MM-DD"))
  }

  render() {
    return (
      <>
        <thead className="thead-dark">
          <th>Announcement Video</th>
        </thead>

        <tbody>
          {this.state.annVideoRequests.map(request => {
            console.log("REQUEST: ", request, request.eventName);
            if (request.forAnnVideo && request.approved) {
              return (
                <tr>
                  <th className="text-dark">{request.eventName}</th>
                </tr>
              );
            }
          })}
        </tbody>

        <thead className="thead-dark">
          <th>Connection Card</th>
        </thead>

        <tbody>
          {this.state.connectionCardRequests.map(request => {
            if (request.forConnectionCard && request.approved) {
              return (
                <tr>
                  <th className="text-dark">{request.eventName}</th>
                </tr>
              );
            }
          })}
        </tbody>

        <thead className="thead-dark">
          <th>Newsletter</th>
        </thead>

        <tbody>
          {this.state.newsletterRequests.map(request => {
            if (request.forNewsletter && request.approved) {
              return (
                <tr>
                  <th className="text-dark">{request.eventName}</th>
                </tr>
              );
            }
          })}
        </tbody>

        <thead className="thead-dark">
          <th>TV Screens</th>
        </thead>

        <tbody>
          {this.state.tvScreensRequests.map(request => {
            if (request.forTVScreens && request.approved) {
              return (
                <tr>
                  <th className="text-dark">{request.eventName}</th>
                </tr>
              );
            }
          })}
        </tbody>

        <thead className="thead-dark">
          <th>Other</th>
        </thead>

        <tbody>
          {this.state.otherRequests.map(request => {
            if (
              request.letterFlyer ||
              request.halfSheetFlyer ||
              request.quarterSheetFlyer ||
              request.tvGraphic ||
              request.tabloidPoster ||
              request.mediumPoster ||
              request.largePoster ||
              request.fourByEightBanner ||
              (request.otherDesignFormat && request.approved)
            ) {
              return (
<tr>
                  <th className="text-dark">{request.eventName}</th>

</tr>

              );
            }
          })}
        </tbody>
      </>
    );
  }
}

export default WeekendPlanPrint;
