import { useState } from 'react'
import { Form, Input, Button, Checkbox, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Redirect } from 'react-router';

const Login = () => {
  const [error, setError] = useState(null)

  const onFinish = async (values) => {
    const {Password} = values
    const Username = values.Username.toLowerCase();
    try{
        const {data} = await axios.post(`${process.env.REACT_APP_BACKEND}/login`, {Username, Password})
        console.log(data.Token) // context
        setError(false)
    }catch{
        setError(true)
    }
  };

  if(error === false)
    return <Redirect to="/home" />

  return (
    <div style={{width: '50%'}}>  
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
            <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
            Forgot password
            </a>
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
            </Button>
            <br/><br/>
            You Don't have an account ? <a href="/register">Register now!</a>
        </Form.Item>
        
        </Form>

        {error ? <Alert closable message="Wrong Username or Password" type="error" showIcon /> : null}
    </div>
  );
};

export default Login
