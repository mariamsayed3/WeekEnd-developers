import { Menu} from 'antd';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import { HomeOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import './Admin.css'

function AdminNavbar (){
    return(
        <div>
             <div className="logo" />
        <Menu id="menu" theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
             <Menu.Item key="1" icon={<HomeOutlined  />}>
             <Link to={"/home"}>Home</Link>
            </Menu.Item>

             <Menu.Item key="2" icon={<FaPlaneDeparture />}>
             <Link to={"/admin/flights"}>Flights</Link>
            </Menu.Item>

            <Menu.Item key="3" icon={<FaPlaneArrival />}>
            <Link to={"/admin/create_flight"}>Create Flight</Link>
            </Menu.Item>
        </Menu>
        </div>
    )

}

export default AdminNavbar;