import React, { useState } from 'react';
import axios from 'axios';
import { Card, Input, Form, Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import "../../Styles/ForgotPassword.scss"

const ForgotPassword = () => {
  const [success, setSuccess] = useState(null)

  const submitForm = async ({email}) => {
    try {
      await axios.post('http://localhost:8000/user/resetPassword', { email });
      setSuccess(true)
    } catch (e) {
      setSuccess(false)
    }
  }
const form = 
<div className="forgot-password-container">

        <Form
          style={{ width: '90%' }}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={submitForm}
          autoComplete="off"
        >
        <Form.Item
          label="Email"
          name="email" 
          rules={[
            {
              required: true,
              message: 'Please enter a correct email!',
              type: 'email',
            },
          ]}
        >
          <Input />
      </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

      </div>
  
  return (
    <div className="forgot-password">
      {
    success ? 
     <Result
      status="success"
      title="An email has been sent. Please check your inbox"
      extra={[
        <Button type="primary" key="console">
          <Link to="/login">Back</Link>
        </Button>,
      ]}
    />
    : success === false ?
    <Result
      status="error"
      title="Invalid email address"
      extra={[
        <Button onClick={() => setSuccess(null)} type="primary" key="console">
          <Link to="/login">Back</Link>
        </Button>,
      ]}
    />
    :
    form
}
    </div>
  );
  
 
}

export default ForgotPassword;