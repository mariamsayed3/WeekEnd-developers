import { Component } from "react";
import "antd/dist/antd.css";
import { Popconfirm, message } from "antd";
import axios from "axios";
import "../../styles/flightcard.scss";
import { BrowserRouter as Router, Link } from "react-router-dom";

class FlightDetails extends Component {
  refreshPage() {
    window.location.reload(false);
  }
  handleClick(key) {
    try {
      let res = async () => {
        await axios.delete(
          `http://localhost:8000/admin/delete_flight/${key}`,
          key
        );
      };
      res();
      this.refreshPage();
    } catch (err) {
      console.log(err);
    }
  }
  cancel(e) {
    console.log(e);
    message.error("Click on No");
  }
  render() {
    const { myFlight, idkey } = this.props;
    return (
      <div id="cards">
        <figure className="card card--normal">
          <figcaption className="card__caption">
            <table className="card__stats">
              <tbody>
                <tr>
                  <th>Flight Number</th>
                  <td>{myFlight.FlightNumber}</td>
                </tr>
                <tr>
                  <th>Departure Time</th>
                  <td>{myFlight.DepartureDate}</td>
                </tr>

                <tr>
                  <th>Arrival Time</th>
                  <td>{myFlight.ArrivalDate}</td>
                </tr>
              </tbody>
            </table>

            <div className="card__abilities">
              <Link className="active" to="">
                Update
              </Link>
              <Link
                className="active"
                to={{
                  pathname: `/ViewDetails`,
                  state: { flight: myFlight },
                }}
              >
                View
              </Link>
              <Popconfirm
                title="Are you sure to delete this flight?"
                onConfirm={() => {
                  this.handleClick(idkey);
                }}
                onCancel={this.cancel}
                cancelText="No"
                okText="Yes"
              >
                <a href="#">Delete</a>
              </Popconfirm>
            </div>
          </figcaption>
        </figure>
      </div>
    );
  }
}

export default FlightDetails;
