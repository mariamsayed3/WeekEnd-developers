import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import FlightDetails from "./FlightDetails";
import "antd/dist/antd.css";
import "../../Styles/search.scss";
import {
  Form,
  Input,
  DatePicker,
  Card,
  Row,
  Col,
} from "antd";

export default function AdminEdits() {
  const [flightNumber, setFlightNumber] = useState("");
  const [depDate, setDepDate] = useState("");
  const [arrDate, setArrDate] = useState("");
  const [economySeats] = useState(1);
  const [businessSeats] = useState(1);
  const [firstSeats] = useState(1);
  const [baggage] = useState(10);
  const [price] = useState(10000);
  const [depAirport, setDepAirport] = useState("");
  const [depTerminal, setDepTerminal] = useState("");
  const [arrAirport, setArrAirport] = useState("");
  const [arrTerminal, setArrTerminal] = useState("");
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);

  useEffect(() => {
    const getFlights = async () => {
      const { data } = await axios.get(
        "http://localhost:8000/admin/get_all_flights"
      );
      setFlights(data);
    };
    getFlights();
  }, []);
  useEffect(() => {
    setFilteredFlights(flights);
    let arr;
    if (filteredFlights.length === 0) arr = flights;
    else arr = filteredFlights;
    if (flightNumber !== "") {
      setFilteredFlights(
        arr.filter((flight) => {
        return flight.FlightNumber.toLowerCase().includes(flightNumber.toLowerCase())}
        )
      );
    }
    if (depDate !== "") {
      setFilteredFlights(
        arr.filter((flight) =>
          flight.DepartureDate.substring(0,10).includes(depDate)
        )
      );
    }
    if (arrDate !== "") {
      setFilteredFlights(
        arr.filter((flight) =>
          flight.ArrivalDate.substring(0,10).includes(arrDate)
        )
      );
    }
    if (depAirport !== "") {
      setFilteredFlights(
        arr.filter((flight) => flight.DepartureAirport.toLowerCase().includes(depAirport.toLowerCase()))
      );
    }
    if (arrAirport !== "") {
      setFilteredFlights(
        arr.filter((flight) => flight.ArrivalAirport.toLowerCase().includes(arrAirport.toLowerCase()))
      );
    }
    if (depTerminal !== "") {
      setFilteredFlights(
        arr.filter((flight) => flight.DepartureTerminal.toLowerCase().includes(depTerminal.toLowerCase()))
      );
    }
    if (arrTerminal !== "") {
      setFilteredFlights(
        arr.filter((flight) => flight.ArrivalTerminal.toLowerCase().includes(arrTerminal.toLowerCase()))
      );
    }


    // setFilteredFlights(
    //   arr.filter((flight) => {
    //     return flight.AllowedBaggage >= baggage
    //   })
    //   );

    // setFilteredFlights(
    // arr.filter((flight) =>{ 
    //  return flight.BusinessPrice <= price || 
    //  flight.EconomyPrice <= price || 
    //  flight.FirstClassPrice <= price 
    // }) );

   
  }, [
    flights,
    flightNumber,
    depDate,
    arrDate,
    economySeats,
    businessSeats,
    firstSeats,
    baggage,
    price,
    depAirport,
    arrAirport,
    depTerminal,
    arrTerminal,
  ]);

  return (
    <div className='container'>
      <Card className="admin-search">
        <div className="">
          <Form name="Search Flights">
            <Row gutter={(16, 8)}>
              <Col span={25}>
                <Form.Item name="FlightNumber" label="Flight Number">
                  <Input
                    onChange={(e) => {
                      e.target.value !== ""
                        ? setFlightNumber(e.target.value)
                        : setFlightNumber("");
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={25}>
                <Form.Item name="DepartureDate" label="Departure Date">
                  <DatePicker
                    onChange={(date, dateString) => {
                      dateString !== ""
                        ? setDepDate(dateString)
                        : setDepDate("");
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={25}>
                <Form.Item name="ArrivalDate" label="Arrival Date">
                  <DatePicker
                    onChange={(date, dateString) => {
                      dateString != ""
                        ? setArrDate(dateString)
                        : setArrDate("");
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            {/* <Row> */}
              {/* <Col span={15}>
                <Form.Item name="baggage" label="Baggage">
                  <Slider
                    defaultValue={10}
                    min={1}
                    max={10}
                    onChange={(value) => {
                      setBaggage(value);
                    }}
                    value={typeof baggage === "number" ? baggage : 0}
                  />
                </Form.Item>
              </Col> */}
              {/* <Col span={2}>
                <InputNumber
                  min={1}
                  max={20}
                  style={{ margin: "0 10px", width: "50px" }}
                  value={baggage}
                  onChange={(value) => {
                    setBaggage(value);
                  }}
                />
              </Col>
            </Row> */}
            {/* <Row>
              <Col span={20}>
                <Form.Item name="price" label="Price">
                  <Slider
                    ي
                    defaultValue={10000}
                    min={0}
                    max={10000} //max
                    onChange={(value) => {
                      setPrice(value);
                    }}
                    value={typeof price === "number" ? price :0}
                  />
                </Form.Item>
              </Col>
              <Col span={2}>
                <InputNumber
                  min={0}
                  max={10000} //max
                  style={{margin: "0 10px", width: "50px"}}
                  value={price}
                  onChange={(value) => {
                    setPrice(value);
                  }}
                />
              </Col>
            </Row> */}
            <Row gutter={(16, 8)}>
              <Col span={25}>
                <Form.Item name="DepartureAirport" label="Departure Airport">
                  <Input
                    onChange={(e) => {
                      e.target.value != ""
                        ? setDepAirport(e.target.value)
                        : setDepAirport("");
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={25}>
                <Form.Item name="ArrivalAirport" label="Arrival Airport">
                  <Input
                    onChange={(e) => {
                      e.target.value != ""
                        ? setArrAirport(e.target.value)
                        : setArrAirport("");
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={25}>
                <Form.Item name="DepartureTerminal" label="Departure Terminal">
                  <Input
                    onChange={(e) => {
                      e.target.value != ""
                        ? setDepTerminal(e.target.value)
                        : setDepTerminal("");
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={25}>
                <Form.Item name="ArrivalTerminal" label="Arrival Terminal">
                  <Input
                    onChange={(e) => {
                      e.target.value != ""
                        ? setArrTerminal(e.target.value)
                        : setArrTerminal("");
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Card>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {filteredFlights.map((flight) => {
          let id = flight._id;
          return <FlightDetails idkey={id} myFlight={flight} key={id} />;
        })}
      </div>
    </div>
  );
}
