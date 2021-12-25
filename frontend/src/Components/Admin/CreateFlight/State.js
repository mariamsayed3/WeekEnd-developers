import React, { Component } from "react";

import "../../../Styles/state.scss";

class State extends Component {
  render() {
    const { decide } = this.props;
    return (
      <div>
        <div className="navigation_menu" id="navigation_menu">
          <ul className="navigation_tabs" id="navigation_tabs">
            <li
              className={
                (decide.first && `tab_inactive `) ||
                (decide.nowFI && `tab_active`) ||
                `tab_disabled`
              }
            >
              <a>Fill Flight Information</a>
            </li>
            <li
              className={
                (decide.second && `tab_inactive `) ||
                (decide.nowS && `tab_active`) ||
                `tab_disabled`
              }
            >
              <a>Fill Departure Information</a>
            </li>
            <li
              className={
                (decide.third && `tab_inactive `) ||
                (decide.nowT && `tab_active`) ||
                `tab_disabled`
              }
            >
              <a>Fill Arrival Information</a>
            </li>
            <li
              className={
                (decide.fourth && `tab_inactive`) ||
                (decide.nowFO && `tab_active`) ||
                `tab_disabled`
              }
            >
              <a>Fill Seats Information</a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default State;
