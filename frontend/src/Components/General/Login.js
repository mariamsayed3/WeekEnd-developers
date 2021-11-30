import { useState , useContext, useEffect} from 'react'
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Redirect } from 'react-router';
import  { UserContext } from '../../Context'
import {GiAirplaneDeparture} from "react-icons/gi";
import {useHistory} from 'react-router-dom'
import '../../Styles/login.scss'
import logo from '../../Assets/logo-blue.png'

const Login = () => {
    let history = useHistory();
    const [error, setError] = useState(null)
    const {FirstName, setAdmin,setFirstName,setLastName,setToken, setEmail} = useContext(UserContext)
    const onFinish = async (values) => {
    const {Password} = values
    const Username = values.Username.toLowerCase();
   
    try{
        const {data} = await axios.post(`http://localhost:8000/login`, {Username, Password})
        let user = {FirstName: data.FirstName, LastName: data.LastName, Token: data.Token, Email: data.Email, Admin: data.Admin }
        sessionStorage.setItem("user", JSON.stringify(user));
        setFirstName(data.FirstName)
        setLastName(data.LastName)
        setToken(data.Token)
        setEmail(data.Email)
        setAdmin(data.Admin)
        setError(false)    
    }catch(err){
        setError(true)
    }
  };

  useEffect(() => {
    const body = document.querySelector('body')
    body.classList.add('login')
      return () => {
        const body = document.querySelector('body')
        body.classList.remove('login')
      }
  },[])

  if(error === false){
   
   return  <Redirect to="/" />

    
  }
    
  return (
    <div id="body">
    <div className="login-container">  
        <div className="logo1">
           <img src={logo}/> 
           
        </div>
        <div className="form">  
            <Form
            name="normal_login"
            className="login-form"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            >
            <Form.Item
                name="Username"
                rules={[
                {
                    required: true,
                    message: 'Please input your Username or Email!',
                },
                ]}
            >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username/Email" />
            </Form.Item>
            <Form.Item
                name="Password"
                rules={[
                {
                    required: true,
                    message: 'Please input your Password!',
                },
                ]}
            >
                <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                />
            </Form.Item>
            <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox><span className="text">Remember me</span></Checkbox>
                </Form.Item>
                <a className="login-links" href="">
                Forgot password ?
                </a>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                <span className="text">Log in</span>
                </Button>
                <br/><br/>
                <span className="text">You Don't have an account ?</span> <a className="login-links" href="/register">Register now!</a>
            </Form.Item>
            
            </Form>
            {error ? <Alert closable message="Wrong Username or Password" type="error" showIcon /> : null}
        </div>
    </div>
    </div>
    
  );
};

export default Login
