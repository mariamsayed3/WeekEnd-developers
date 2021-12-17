import "../../Styles/Filter.scss";
import { Slider } from "antd";
import downArrow from "../../Assets/down-arrow.svg";
import upArrow from "../../Assets/up-arrow.svg";
import { useState } from "react";

function UserFilter({
  setPrice,
  setDuration,
  setDepartureTerminal,
  setArrivalTerminal,
  setChildren,
  setAdults,
  departureTime,
  setDepartureTime,
  cabinClass,
  setCabinClass,
}) {
  const [hide1, setHide1] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  const [hide4, setHide4] = useState(false);
  const [hide5, setHide5] = useState(false);
  const [hide6, setHide6] = useState(false);
  const [hide7, setHide7] = useState(false);

  return (
    <>
      <div className="filter-container">
        <h1 className="filter">Filters</h1>
        <div>
          <div id="id1" className='main'>
            <div className="title">
              <h2>Price Range</h2>
              <img
                alt="down arrow"
                src={hide1 ? downArrow : upArrow}
                onClick={() => setHide1(!hide1)}
              />
            </div>
            <Slider
              className={hide1 ? "none" : ""}
              range
              defaultValue={[0, 20000]}
              min={0}
              step={100}
              max={20000}
              onChange={(val) => setPrice(val)}
            />
          </div>

          <div id="id2" className='main'>
            <div className="title">
              <h2>Depart Time</h2>
              <img
                alt="down arrow"
                src={hide2 ? downArrow : upArrow}
                onClick={() => setHide2(!hide2)}
              />
            </div>
            <div className={hide2 ? "none" : ""}>
              <div className="inputGroup">
                <input
                  id="option1"
                  name="option1"
                  type="checkbox"
                  checked={departureTime.midnight}
                  onClick={() => {
                    setDepartureTime({
                      ...departureTime,
                      midnight: !departureTime.midnight,
                    });
                  }}
                />
                <label for="option1">12:00 am - 05:59am</label>
              </div>
              <div className="inputGroup">
                <input
                  id="option2"
                  name="option2"
                  type="checkbox"
                  checked={departureTime.morning}
                  onClick={() => {
                    setDepartureTime({
                      ...departureTime,
                      morning: !departureTime.morning,
                    });
                  }}
                />
                <label for="option2">06:00 am - 11:59 am</label>
              </div>
              <div className="inputGroup">
                <input
                  id="option3"
                  name="option3"
                  type="checkbox"
                  checked={departureTime.noon}
                  onClick={() => {
                    setDepartureTime({
                      ...departureTime,
                      noon: !departureTime.noon,
                    });
                  }}
                />
                <label for="option3">12:00 pm - 05:59 pm</label>
              </div>
              <div className="inputGroup">
                <input
                  id="option4"
                  name="option4"
                  type="checkbox"
                  checked={departureTime.night}
                  onClick={() => {
                    setDepartureTime({
                      ...departureTime,
                      night: !departureTime.night,
                    });
                  }}
                />
                <label for="option4">06:00 pm - 11:59 pm</label>
              </div>
            </div>
          </div>
          <div id="id3" className='main'>
            <div className="title">
              <h2>Available Cabin Class</h2>
              <img
                alt="down arrow"
                src={hide3 ? downArrow : upArrow}
                onClick={() => setHide3(!hide3)}
              />
            </div>
            <div className={hide3 ? "none" : ""}>
              <div className="inputGroup">
                <input
                  id="option5"
                  name="option5"
                  type="checkbox"
                  checked={cabinClass.first}
                  onClick={() => {
                    setCabinClass({ ...cabinClass, first: !cabinClass.first });
                  }}
                />
                <label for="option5">First Class</label>
              </div>
              <div className="inputGroup">
                <input
                  id="option6"
                  name="option6"
                  type="checkbox"
                  checked={cabinClass.business}
                  onClick={() => {
                    setCabinClass({
                      ...cabinClass,
                      business: !cabinClass.business,
                    });
                  }}
                />
                <label for="option6">Business</label>
              </div>
              <div className="inputGroup">
                <input
                  id="option7"
                  name="option7"
                  type="checkbox"
                  checked={cabinClass.economy}
                  onClick={() => {
                    setCabinClass({
                      ...cabinClass,
                      economy: !cabinClass.economy,
                    });
                  }}
                />
                <label for="option7">Economy</label>
              </div>
            </div>
          </div>
          <div id="id4" className='main'>
            <div className="title">
              <h2>Max Trip Duration</h2>
              <img
                alt="down arrow"
                src={hide4 ? downArrow : upArrow}
                onClick={() => setHide4(!hide4)}
              />
            </div>
            <Slider
              className={hide4 ? "none" : ""}
              defaultValue={24}
              min={0}
              max={24}
              onChange={(val) => setDuration(val)}
            />
          </div>
          <div id="id5" className='main'>
            <div className="title">
              <h2>Terminals</h2>
              <img
                alt="down arrow"
                src={hide5 ? downArrow : upArrow}
                onClick={() => setHide5(!hide5)}
              />
            </div>
            <section className={hide5 ? "none" : "sectionStyle"}>
              <p>Departure Terminal:</p>
              <input
                type="text"
                onChange={(e) => setDepartureTerminal(e.target.value)}
                placeholder="Enter Departure Terminal"
              />
              <p>Arrival Terminal:</p>
              <input
                type="text"
                onChange={(e) => setArrivalTerminal(e.target.value)}
                placeholder="Enter Arrival Terminal"
              />
            </section>
          </div>
          <div id="id6" className='main'>
            <div className="title">
              <h2>Max number of Children On Board</h2>
              <img
                alt="down arrow"
                src={hide6 ? downArrow : upArrow}
                onClick={() => setHide6(!hide6)}
              />
            </div>
            <Slider
              className={hide6 ? "none" : ""}
              defaultValue={100}
              min={0}
              max={100}
              onChange={(val) => setChildren(val)}
            />
          </div>
          <div id="id7" className='main'>
            <div className="title">
              <h2>Max Number of Adults On Board</h2>
              <img
                alt="down arrow"
                src={hide7 ? downArrow : upArrow}
                onClick={() => setHide7(!hide7)}
              />
            </div>
            <Slider
              className={hide7 ? "none" : ""}
              defaultValue={1000}
              min={0}
              max={1000}
              onChange={(val) => setAdults(val)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserFilter;
