import { Form, Input, Button, Result } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams , Link} from 'react-router-dom';
import '../../Styles/ResetPassword.scss'

const ResetPassword = () => {

  const { token } = useParams();
  const [success, setSuccess] = useState(null)

  const submit = async ({ newPassword }) => {
    try{
      await axios.post('http://localhost:8000/resetPassword', {
        "newPassword": newPassword,
        "token": token,
      });
      setSuccess(true)
    } catch{
      setSuccess(false)
    }
  };
  useEffect(() => {
    const body = document.querySelector('body')
    body.classList.add('reset-password')
      return () => {
        const body = document.querySelector('body')
        body.classList.remove('reset-password')
      }
  },[])

  
const form = 
<div className="reset-password-container">
        <h3> Please enter your new password</h3>
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
          onFinish={submit}
          autoComplete="off"
        >
        <Form.Item
          label="New Password"
          name="newPassword" 
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            },
          ]}
        >
          <Input.Password type="password" placeholder="New password" />
      </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>

      </div>
  
  return (
    <div id="body">
      {
    success ? 
     <Result
      status="success"
      title="Your Password Has Been Successfully Resetted"
      extra={[
        <Button type="primary" key="console">
          <Link to="/login">Login</Link>
        </Button>,
      ]}
    />
    : success === false ?
    <Result
      status="error"
      title="Your request to reset the password failed"
      subTitle="The link could have been expired. You can try resetting your password again."
      extra={[
        <Button onClick={() => setSuccess(null)} type="primary" key="console">
          <Link to="/reset-password-request"> Reset Password</Link>
        </Button>,
      ]}
    />
    :
    form
}
    </div>
  );
  
 
}
export default ResetPassword;