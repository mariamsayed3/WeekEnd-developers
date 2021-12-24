import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from '../../Context';
import { Input, Button, Form, Modal, message, Alert } from 'antd';
import  validator  from 'validator';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import '../../Styles/password.scss';

require('dotenv').config();

const ChangePassword = (props) => {
    const { Token } = useContext(UserContext);
    const [form] = Form.useForm();
    const [error, setError] = useState(null);

    const onFinish = async (values) => {
        try {
            const {data} = await axios.patch(`http://localhost:8000/change_password/${Token}`, values);
            if (data.length != 0) {
                message.loading('Action in progress..', 1.5)
                    .then(() => message.success('Password changed successfully!', 1.5)
                        .then(() => window.location.reload()));
            }
            setError(false);
        } catch {
            setError(true);
        }
    }
    console.log(error);

    const handleCancel = () => {
        props.handlePasswordModal(false);
    };

    if (error === false) {
        props.handlePasswordModal(false);
    }

    return (
        <>
            <div className="big-container">
            <Modal
                className="modal"
                visible={props.PasswordModal}
                onCancel={handleCancel}
                footer={false}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}>
                <br></br>
                <Form className="fm" name="changePass" form={form} onFinish={onFinish} scrollToFirstError>
                    <Form.Item
                        label="Old Password"
                        name="OldPassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your old Password!',
                            },
                        ]}
                    >
                        <Input.Password
                            className="input"
                            type="password"
                            placeholder="password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="New Password"
                        name="Password"
                        hasFeedback
                        dependencies={['OldPassword']}
                        rules={[
                            {
                                required: true,
                                message: 'Password must be at least 8 characters',
                                min: 8
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('OldPassword') != value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Your new password can not be the same as your old password!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            className="input"
                            type="password"
                            placeholder="New password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Confirm Password"
                        name="ConfirmPassword"
                        dependencies={['Password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your new password!',
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
                        <Input.Password
                            className="input"
                            type="password"
                            placeholder="Repeat New password"
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button className="button" type="primary" htmlType="submit">Save Changes</Button>
                    </Form.Item>
                </Form>
                {error ? <Alert closable message="Wrong Password!" type="error" showIcon /> : null}
            </Modal>
            </div>
        </>
    )
}

export default ChangePassword