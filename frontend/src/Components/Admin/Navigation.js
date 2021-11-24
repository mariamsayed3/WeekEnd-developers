import { useState, useEffect } from 'react';
import axios from 'axios';
import { Menu, PageHeader, Anchor, Input } from 'antd';
import { EllipsisOutlined, HomeOutlined, AppstoreOutlined, UserOutlined, DingtalkOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Link } = Anchor;
const { Search } = Input;

function Navigation() {
    const [current, setState] = useState('mail');
    const onSearch = value => console.log(value);

    const handleClick = e => {
        console.log('click ', e);
        setState({ current: e.key });
    };


    return (
        <PageHeader
            style={{ marginRight:"50px",WebkitTextFillColor: "white", border: "1px solid #2c394f", background: "#2c394f" }}
            onBack={() => null}
            title="AirlineName"
            subTitle="Where flights come true">
            <Menu style={{ WebkitTextFillColor: "#2c394f" }} onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="home" icon={<HomeOutlined />}>
                    Home
          </Menu.Item>
                <Menu.Item key="Register" icon={<AppstoreOutlined />}>
                    Register
          </Menu.Item>
                <Menu.Item key="Login" icon={<UserOutlined />}>
                    Login
          </Menu.Item>
                <SubMenu key="SubMenu" icon={<DingtalkOutlined />} title="Flights">
                    <Menu.Item key="setting:1">Reserved Tickets
                    {/* <Link href="/admin/get_current_flights"></Link> */}
                    </Menu.Item>
                    <Menu.Item key="setting:2">Option 2</Menu.Item>
                    <Menu.Item key="setting:3">Option 3</Menu.Item>
                    <Menu.Item key="setting:4">Option 4</Menu.Item>
                </SubMenu>
                <SubMenu key="more" icon={<EllipsisOutlined />}>
                    <Menu.Item key="setting:5">Option 1</Menu.Item>
                    <Menu.Item key="setting:6">Option 2</Menu.Item>
                    <Menu.Item key="setting:7">Option 3</Menu.Item>
                    <Menu.Item key="setting:8">Option 4</Menu.Item>
                </SubMenu>
                <Menu.Item style={{marginLeft:"580px",width:"30%"}}>
                <Search placeholder="input search text" style={{marginTop:"6px"}} onSearch={onSearch} enterButton />
                </Menu.Item>
            </Menu>
        </PageHeader>
    );
}



export default Navigation