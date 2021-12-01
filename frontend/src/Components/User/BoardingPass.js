import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "antd/dist/antd.css";
import { Modal, Tag } from "antd";
import { DingtalkOutlined } from "@ant-design/icons";
import "../../Styles/Boardingstyle.scss";
import { Popconfirm, Button, Result } from "antd";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context";
import Loader from '../General/Loader'
import EmptyList from './EmptyList'

function BoardingPass() {
  const { Token, FirstName, LastName, Email } = useContext(UserContext);
  const [Reservation, setReservation] = useState(false);
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFlights = async () => {
      const { data } = await axios.get(
        `http://localhost:8000/user/get_current_flights/${Token}`
      );
      setReservation(data);
      setLoading(false);
    };
    getFlights();
  }, []);

  const cancel_reservation = async (ReservationNumber) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:8000/user/cancel_reservation/${ReservationNumber}`
      );
      const post = await axios({
        method: "post",
        url: "http://localhost:8000/user/email_cancellation",
        data: {
          email: Email,
          ...data[0],
        },
      });
      showModal();
      
  
    } catch (error) {
      setSuccess(false);
      setErrorMsg(null);
      showModal();
    }
  };

  const getBoardingTime = (x) => {
    if (parseInt(x[0]) == 0) {
      let z = 30 - parseInt(x[1]);
      return `23:${60 - z}`;
    }
    let b = parseInt(x[0]) * 60 + parseInt(x[1]);
    b = b - 30;
    const hrs = parseInt(b / 60);
    const mins = b % 60;
    x[0] = "0" + hrs;
    x[1] = mins;
    return `${x[0]}:${x[1]}`;
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
    window.location.reload();
  };

  if(loading){
      return <Loader />
  }
  if(Reservation.length==0){
    return <EmptyList msg={`You do not have any current reservations with Jet Away . Would you like to reserve a flight?`} buttonText={`Yes!`} path={'/available_flights'} />
   }

  return Reservation ? (
    
    <div style={{display:'flex', alignItems:"center", justifyContent:"center",flexWrap:'wrap', marginTop:'5%'}}>
    <>
      {Reservation.map(({ Booking, Flight }) => {
        return (
         
          <div className="boarding-pass">
            <header>
              <svg class="logo">
              </svg>
              <div className="logo">
                <Tag color={"transparent"} icon={<DingtalkOutlined style={{fontSize:"25px"}}/>}>
                  <b>Jet Away</b>
                </Tag>
              </div>
              <div className="flight">
                <small>flight</small>
                <strong>{Booking.FlightNumber}</strong>
              </div>
            </header>
            <section className="cities">
              <div className="city">
                <small>{Flight.DepartureAirport}</small>
                <strong>{Flight.DepartureAirport.substring(0, 3)}</strong>{" "}
                {/*add short name for the airport*/}
              </div>
              <div className="city">
                <small>{Flight.ArrivalAirport}</small>

                <strong>{Flight.ArrivalAirport.substring(0, 3)}</strong>
              </div>
              <svg className="airplane">
                <use href="#airplane"></use>
              </svg>
            </section>
            <section className="infos">
              <div className="places">
                <div className="box">
                  <small>Departure Terminal</small>
                  <strong>{Flight.DepartureTerminal}</strong>
                </div>
                <div className="box">
                  <small>Arrival Terminal</small>
                  <strong>{Flight.ArrivalTerminal}</strong>
                </div>
                
                  <small>Seat/s</small>
                  <div className="box width">
                  <strong className="seats">
                    {Booking.Seats.map((item) => {
                      return <span>{item} </span>;
                    })}
                  </strong>
                </div>
              </div>
              <div className="times">
                <div className="box">
                  <small>Boarding</small>
                  <strong>
                    {getBoardingTime(Flight.DepartureTime.split(":"))}
                  </strong>
                </div>
                <div className="box">
                  <small>Departure</small>
                  <strong>{Flight.DepartureTime}</strong>
                </div>
                <div className="box">
                  <small>Duration</small>
                  <strong>{Flight.TripDuration}</strong>
                </div>
                <div className="box">
                  <small>Arrival</small>
                  <strong>{Flight.ArrivalTime}</strong>
                </div>
                <div className="date">
                  <small>Date</small>
                  <strong>{Flight.DepartureDate.substring(0, 10)}</strong>
                </div>
              </div>
            </section>
            <section className="strap">
              <div className="box">
                <div className="passenger">
                  <small>passenger</small>
                  <strong>
                    <p>
                      {FirstName} {LastName}
                    </p>
                  </strong>
                </div>
                <Popconfirm
                  title="Are you sure you want to cancel your reservation？"
                  onConfirm={() =>
                    cancel_reservation(Booking.ReservationNumber)
                  }
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="danger" style={{border:"#f7d0d1",background:"#f7d0d1"}}> Cancel Reservation </Button>
                </Popconfirm>
              </div>

              <svg className="qrcode">
                <use href="#qrcode"></use>
              </svg>
            </section>
          </div>
         
        );
      })}

      <Modal
        visible={visible}
        onOk={handleOk}
        onCancel={() => {
          setVisible(false);
          window.location.reload();
        }}
        footer={[<Button onClick={handleOk}>Ok</Button>]}
      >
        {success ? (
          <Result
            status="success"
            title="Successfully Cancelled Registeration"
            subTitle="Would you like to reserve another flight?"
            extra={[
              <Link to="/available_flights">
                <Button type="primary">Reserve another flight</Button>
              </Link>,
            ]}
          />
        ) : (
          <Result
            status="error"
            title="Ooops. We couldn't cancel your reservation"
            subTitle={errorMsg}
          />
        )}
      </Modal>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0"
        height="0"
        display="none"
      >
        <symbol id="airplane" viewBox="243.5 245.183 25 21.633">
          <g>
            <path
              fill="#265c69"
              d="M251.966,266.816h1.242l6.11-8.784l5.711,0.2c2.995-0.102,3.472-2.027,3.472-2.308
                              c0-0.281-0.63-2.184-3.472-2.157l-5.711,0.2l-6.11-8.785h-1.242l1.67,8.983l-6.535,0.229l-2.281-3.28h-0.561v3.566
                              c-0.437,0.257-0.738,0.724-0.757,1.266c-0.02,0.583,0.288,1.101,0.757,1.376v3.563h0.561l2.281-3.279l6.535,0.229L251.966,266.816z
                              "
            />
          </g>
        </symbol>
        <symbol id="qrcode" viewBox="0 0 130 130">
          <g>
            <path
              fill="#265c69"
              d="M123,3h-5h-5h-5h-5h-5h-5v5v5v5v5v5v5v5h5h5h5h5h5h5h5v-5v-5v-5v-5v-5V8V3H123z M123,13v5v5v5v5h-5h-5h-5
		h-5h-5v-5v-5v-5v-5V8h5h5h5h5h5V13z"
            />
            <polygon
              fill="#265c69"
              points="88,13 88,8 88,3 83,3 78,3 78,8 78,13 83,13 	"
            />
            <polygon
              fill="#265c69"
              points="63,13 68,13 73,13 73,8 73,3 68,3 68,8 63,8 58,8 58,13 53,13 53,8 53,3 48,3 48,8 43,8 43,13 
		48,13 48,18 43,18 43,23 48,23 53,23 53,18 58,18 58,23 63,23 63,18 	"
            />
            <polygon
              fill="#265c69"
              points="108,13 103,13 103,18 103,23 103,28 108,28 113,28 118,28 118,23 118,18 118,13 113,13 	"
            />
            <polygon
              fill="#265c69"
              points="78,18 73,18 73,23 78,23 83,23 83,18 	"
            />
            <polygon
              fill="#265c69"
              points="23,28 28,28 28,23 28,18 28,13 23,13 18,13 13,13 13,18 13,23 13,28 18,28 	"
            />
            <polygon
              fill="#265c69"
              points="53,28 53,33 53,38 58,38 58,33 58,28 58,23 53,23 	"
            />
            <rect x="63" y="23" fill="#265c69" width="5" height="5" />
            <rect x="68" y="28" fill="#265c69" width="5" height="5" />
            <path
              fill="#265c69"
              d="M13,38h5h5h5h5h5v-5v-5v-5v-5v-5V8V3h-5h-5h-5h-5h-5H8H3v5v5v5v5v5v5v5h5H13z M8,28v-5v-5v-5V8h5h5h5h5h5v5
		v5v5v5v5h-5h-5h-5h-5H8V28z"
            />
            <polygon
              fill="#265c69"
              points="48,33 48,28 43,28 43,33 43,38 48,38 	"
            />
            <polygon
              fill="#265c69"
              points="83,38 88,38 88,33 88,28 88,23 83,23 83,28 78,28 78,33 83,33 	"
            />
            <polygon
              fill="#265c69"
              points="23,43 18,43 13,43 8,43 3,43 3,48 8,48 13,48 18,48 23,48 28,48 28,43 	"
            />
            <rect x="108" y="43" fill="#265c69" width="5" height="5" />
            <rect x="28" y="48" fill="#265c69" width="5" height="5" />
            <polygon
              fill="#265c69"
              points="88,53 93,53 93,48 93,43 88,43 88,48 83,48 83,53 	"
            />
            <polygon
              fill="#265c69"
              points="123,48 123,43 118,43 118,48 118,53 118,58 123,58 123,63 118,63 113,63 113,68 118,68 118,73 
		118,78 123,78 123,83 128,83 128,78 128,73 123,73 123,68 128,68 128,63 128,58 128,53 123,53 	"
            />
            <polygon
              fill="#265c69"
              points="98,58 98,63 103,63 103,68 108,68 108,63 108,58 103,58 103,53 103,48 103,43 98,43 98,48 98,53 
		93,53 93,58 	"
            />
            <rect x="108" y="53" fill="#265c69" width="5" height="5" />
            <rect x="78" y="63" fill="#265c69" width="5" height="5" />
            <rect x="93" y="63" fill="#265c69" width="5" height="5" />
            <rect x="53" y="68" fill="#265c69" width="5" height="5" />
            <polygon
              fill="#265c69"
              points="108,73 108,78 108,83 113,83 113,78 113,73 113,68 108,68 	"
            />
            <rect x="13" y="73" fill="#265c69" width="5" height="5" />
            <rect x="98" y="73" fill="#265c69" width="5" height="5" />
            <polygon
              fill="#265c69"
              points="18,83 18,88 23,88 28,88 28,83 23,83 23,78 18,78 	"
            />
            <polygon
              fill="#265c69"
              points="8,83 8,78 8,73 8,68 13,68 13,63 13,58 13,53 8,53 3,53 3,58 3,63 3,68 3,73 3,78 3,83 3,88 8,88 	
		"
            />
            <rect x="53" y="83" fill="#265c69" width="5" height="5" />
            <rect x="73" y="83" fill="#265c69" width="5" height="5" />
            <path
              fill="#265c69"
              d="M108,88v-5h-5h-5h-5h-5v-5h5v-5h-5v-5h-5v5h-5h-5v-5h-5h-5v5h5v5h-5v5v5h5v-5h5v-5h5h5v5v5h-5v5h5v5h-5h-5
		v5h5v5h5v5v5h-5v5h5h5h5v5h5h5h5h5h5h5h5v-5v-5v-5v-5v-5v-5v-5h-5h-5v-5v-5h-5v5H108z M98,118h-5v-5h5V118z M98,103h-5h-5v-5v-5v-5
		h5h5h5v5v5v5H98z M123,118v5h-5h-5v-5h-5h-5v-5h5v-5h5v5v5h5v-5h5V118z M118,98h5v5h-5h-5v-5H118z"
            />
            <path
              fill="#265c69"
              d="M28,93h-5h-5h-5H8H3v5v5v5v5v5v5v5h5h5h5h5h5h5h5v-5v-5v-5v-5v-5v-5v-5h-5H28z M33,103v5v5v5v5h-5h-5h-5h-5
		H8v-5v-5v-5v-5v-5h5h5h5h5h5V103z"
            />
            <rect x="93" y="93" fill="#265c69" width="5" height="5" />
            <polygon
              fill="#265c69"
              points="63,98 68,98 68,93 63,93 58,93 53,93 53,88 48,88 48,83 43,83 43,78 48,78 48,73 43,73 43,68 
		48,68 53,68 53,63 58,63 58,68 63,68 63,63 63,58 68,58 73,58 73,63 78,63 78,58 83,58 83,53 78,53 78,48 83,48 83,43 83,38 78,38 
		78,33 73,33 73,38 73,43 68,43 68,38 68,33 63,33 63,38 63,43 63,48 68,48 73,48 73,53 68,53 63,53 58,53 58,58 53,58 53,53 53,48 
		58,48 58,43 53,43 48,43 43,43 38,43 33,43 33,48 38,48 38,53 33,53 33,58 38,58 43,58 43,63 38,63 33,63 33,68 38,68 38,73 33,73 
		28,73 28,68 28,63 33,63 33,58 28,58 23,58 18,58 18,63 23,63 23,68 18,68 18,73 23,73 23,78 28,78 33,78 38,78 38,83 33,83 33,88 
		38,88 43,88 43,93 43,98 48,98 48,103 53,103 53,98 58,98 58,103 58,108 63,108 63,103 	"
            />
            <polygon
              fill="#265c69"
              points="18,103 13,103 13,108 13,113 13,118 18,118 23,118 28,118 28,113 28,108 28,103 23,103 	"
            />
            <polygon
              fill="#265c69"
              points="48,108 48,103 43,103 43,108 43,113 43,118 43,123 43,128 48,128 53,128 53,123 48,123 48,118 
		48,113 53,113 58,113 58,108 53,108 	"
            />
            <polygon
              fill="#265c69"
              points="78,118 78,113 78,108 73,108 68,108 63,108 63,113 68,113 68,118 63,118 63,123 63,128 68,128 
		68,123 73,123 73,118 	"
            />
            <rect x="73" y="123" fill="#265c69" width="5" height="5" />
          </g>
        </symbol>
      </svg>
      
    </>
    </div>
  ) : (
    <>
      <Result
        title="You have no Reservations"
        extra={
          <Button
            type="link"
            key="home"
            href="/home"
            style={{ color: "#f7d0d1" }}
          >
            Go Home
          </Button>
        }
      />
    </>
  );
}

export default BoardingPass;
