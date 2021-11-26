import { Menu} from 'antd';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import { HomeOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import '../../Styles/navbar.scss'
import { useEffect } from 'react';


function EmployeeNavbar (){
   
    return (
    <>
      <nav>
        <label class="logo">AirLine</label>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="">Available Flights</a></li>
          <li><a href="#">My Reservations</a></li>
          <li><a href="#">Contact us</a></li>
        </ul>
    </nav>
  </>
    )

}

export default EmployeeNavbar;