import { useState, useEffect } from "react";
import axios from "axios";
import "../../Styles/DropDown.scss";

function DropDown({
  component,
  term,
  selected,
  setSelected,
  setData,
  data,
}) {
  const [drop, setDrop] = useState([]);
  useEffect(() => {
    var options = {
      method: "GET",
      url: "https://www.air-port-codes.com/api/v1/multi",
      params: { term: `${term}`, limit: 5 },
      headers: {
        "APC-Auth": "e99b9d6c22",
        "APC-Auth-Secret": "31194b123da01c9",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        if (response.data.airports) setDrop(response.data.airports);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [term]);
  const clicked = (e) => {
    if (component === "origin") {
      setData({ ...data, origin: e });
      setSelected(true);
    }
    if (component === "destination") {
      setData({ ...data, destination: e });
      setSelected(true);
    }
  };
  return (
    <>
      {drop.length != 0 && (
        <>
          <div className={!selected ? "arrow-up" : "hidden"}>
            <div class="arrow-2nd"></div>
          </div>
          <ul className={!selected? "drop-down" : "hidden"}>
            {drop.map((item) => (
              <li onClick={(e) => clicked(e.target.innerHTML)}>
                {item.iata}, {item.name}, {item.city}, {item.country.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default DropDown;
