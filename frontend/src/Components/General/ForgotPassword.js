import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { Input, Form, Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import "../../Styles/ForgotPassword.scss"

const ForgotPassword = () => {
  const [success, setSuccess] = useState(null)

  const submitForm = async ({email}) => {
    try {
      await axios.post('http://localhost:8000/requestResetPassword', { email });
      setSuccess(true)
    } catch (e) {
      setSuccess(false)
    }
  }

  useEffect(() => {
    const body = document.querySelector('body')
    body.classList.add('forgot-password')
      return () => {
        const body = document.querySelector('body')
        body.classList.remove('forgot-password')
      }
  },[])

const form = 
<div className="forgot-password-container">
        <h3> Please enter your email to reset your password</h3>
        <Form
          style={{ width: '100%', marginRight: '18%' , marginTop: '5%'}}
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
              message: 'Please make sure your email is in the correct form. e.g "example@gmail.com"',
              type: 'email',
            },
          ]}
        >
          <Input />
      </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
             
            }}
          >
            <Button type="primary" htmlType="submit" style={{marginRight: '8px'}}>
              Submit
            </Button>
            
            <Button type="dashed" key="back">
              <Link to="/login">Back</Link>
            </Button>
            
          </Form.Item>
          
        
        </Form>

      </div>
  
  return (
    <div id="body">
      {
    success ? 
    <div style={{backgroundColor: 'white', marginLeft: '25%', marginRight: '25%'}}>
     <Result
      style={{marginTop: '10%'}}
      status="success"
      title="An email has been sent. Please check your inbox"
      extra={[
        <Button type="primary" key="console">
          <Link to="/login">Back</Link>
        </Button>,
      ]}
    />
    </div>
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