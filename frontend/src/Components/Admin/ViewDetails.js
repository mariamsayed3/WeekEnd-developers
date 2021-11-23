import { Component } from "react";
import "antd/dist/antd.css";
import { Card, Row, Col, Divider } from "antd";
import "./Admin.css";

class ViewDetails extends Component {
  render() {
    const { flight } = this.props.location.state;
    return (
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              title="Flight Details"
              bordered={true}
              style={{ left: "80%", width: "700px", padding: "0px" }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                className="spanstyle"
              >
                <span>FlightNumber: {flight.FlightNumber} </span>
                <Divider type="horizontal" />
                <span>DepartureDate: {flight.DepartureDate} </span>
                <Divider type="horizontal" />
                <span>ArrivalDate: {flight.ArrivalDate} </span>
                <Divider type="horizontal" />
                <span>DepartureTime: {flight.DepartureTime} </span>
                <Divider type="horizontal" />
                <span>ArrivalTime: {flight.ArrivalTime} </span>
                <Divider type="horizontal" />
                <span>TripDuration: {flight.TripDuration} </span>
                <Divider type="horizontal" />
                <span>DepartureAirport: {flight.DepartureAirport} </span>
                <Divider type="horizontal" />
                <span>ArrivalAirport: {flight.ArrivalAirport} </span>
                <Divider type="horizontal" />
                <span>DepatureTerminal: {flight.DepartureTerminal} </span>
                <Divider type="horizontal" />
                <span>ArrivalTerminal: {flight.ArrivalTerminal} </span>
                <Divider type="horizontal" />
                <span>EconomyTotalSeats: {flight.EconomySeats.length} </span>
                <Divider type="horizontal" />
                <span>
                  EconomyAvailableSeats: {flight.EconomyAvailableSeats}
                </span>
                <Divider type="horizontal" />
                <span>EconomyPrice: {flight.EconomyPrice} </span>
                <Divider type="horizontal" />
                <span>BusinessTotalSeats: {flight.BusinessSeats.length} </span>
                <Divider type="horizontal" />
                <span>
                  BusinessAvailableSeats: {flight.BusinessAvailableSeats}
                </span>
                <Divider type="horizontal" />
                <span>BusinessPrice: {flight.BusinessPrice} </span>
                <Divider type="horizontal" />
                <span>First Class Total Seats: {flight.FirstClassSeats.length} </span>
                <Divider type="horizontal" />
                <span>
                First Class Available Seats: {flight.FirstClassAvailableSeats}
                </span>
                <Divider type="horizontal" />
                <span>First Class Price: {flight.FirstClassPrice} </span>
                <Divider type="horizontal" />
                <span>AllowedBaggage: {flight.AllowedBaggage} </span>
                <Divider type="horizontal" />
                <span>NumberOfPassengers : {flight.NumberOfPassengers} </span>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default ViewDetails;
