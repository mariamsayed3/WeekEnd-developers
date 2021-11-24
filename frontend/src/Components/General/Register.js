import React, {useState} from 'react';
import { Form, Input, Button, Select, Alert } from 'antd';
import  validator  from 'validator';
import axios from 'axios';
import { Redirect } from 'react-router';
const {Option} = Select
const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
};
 
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const prefixSelector = (
    <Form.Item name="CountryCode" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="20">+20</Option>
        <Option value="59">+59</Option>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

const Register = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState(null)

  const onFinish = async (values) => {
      values.Admin = false
      values.Username = values.Username.toLowerCase()
      values.Email = values.Email.toLowerCase()
      try{
        await axios.post(`http://localhost:8000/register`, values)
        setError(false)
      }catch{
        setError(true)
      }
  };

  if(error === false)
    return <Redirect to="/home" />

  return (
    <div>
    <Form
      style={{width: '50%'}}
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
    <Form.Item
    name="FirstName"
    label="First Name"
    rules={[
        {
        message: 'First name must be at least 2 characters',
        min: 2
        },
        {
        required: true,
        message: 'Please input your fist name!',
        },
    ]}
    >
        <Input />
    </Form.Item>

    <Form.Item
    name="LastName"
    label="Last Name"
    rules={[
        {
        message: 'Last name must be at least 2 characters',
        min: 2
        },
        {
        required: true,
        message: 'Please input your last name!',
        },
    ]}
    >
        <Input />
    </Form.Item>

    <Form.Item
    name="Email"
    label="E-mail"
    rules={[
        {
        type: 'email',
        message: 'The input is not valid E-mail!',
        },
        {
        required: true,
        message: 'Please input your E-mail!',
        },
    ]}
    >
    <Input />
    
    
    </Form.Item>
      <Form.Item
        name="Password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Password must be at least 8 characters',
            min: 8
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['Password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('Password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="Username"
        label="Username"
        tooltip="Username must be unique and can be used to login."
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="HomeAddress"
        label="Home Address"
        rules={[
          {
            required: true,
            message: 'Please enter your home address!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        name="TelephoneNumbers"
        label="Phone Number"
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (validator.isNumeric(value)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Phone number must contain digits only!'));
            },
          }),
        ]}
      >
        <Input addonBefore={prefixSelector}/>
      </Form.Item>

      <Form.Item
        name="PassportNumber"
        label="Passport Number"
        rules={[
          {
            required: true,
            message: 'Please enter passport number!',
          },
        ]}
      >
        <Input/>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
      {error ? <Alert closable message="Username/Email is taken. Try another Username/Email" type="error" showIcon /> : null}
    </Form>
    
    </div>
  );
};

export default Register