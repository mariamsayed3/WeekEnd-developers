import "../../Styles/Filter.scss";
import { Slider } from "antd";

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
  return (
    <>
      <div className="filter-container">
      <h1 className='filter'>Filters</h1>
        <div>
          <div id="id1">
            <h2>Price Range</h2>
            <Slider
              range
              defaultValue={[0, 20000]}
              min={0}
              step={100}
              max={20000}
              onChange={(val) => setPrice(val)}
            />
          </div>

          <div id="id2">
            <h2>Depart Time</h2>

            <div class="inputGroup">
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
            <div class="inputGroup">
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
            <div class="inputGroup">
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
            <div class="inputGroup">
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
          <div id="id3">
            <h2>Available Cabin Class</h2>

            <div class="inputGroup">
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
            <div class="inputGroup">
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
            <div class="inputGroup">
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
          <div id="id4">
            <h2>Max Trip Duration</h2>
            <Slider
              defaultValue={24}
              min={0}
              max={24}
              onChange={(val) => setDuration(val)}
            />
          </div>
          <div id="id5">
            <h2>Terminals</h2>
            <section>
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
          <div id="id6">
            <h2>Max number of Children On Board</h2>
            <Slider
              defaultValue={100}
              min={0}
              max={100}
              onChange={(val) => setChildren(val)}
            />
          </div>
          <div id="id7">
            <h2>Max Number of Adults On Board</h2>
            <Slider
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
