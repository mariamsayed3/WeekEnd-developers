import axios from 'axios';
import { Form, Input, message, Button, Card } from 'antd';
import { useContext } from 'react';
import { UserContext } from '../../Context';
import '../../Styles/EditUser.scss';

require('dotenv').config()

function EditUser() {
    const { Token } = useContext(UserContext);
    const [form] = Form.useForm();
    
    const Edit = async () => {
        try {
            const values = await form.validateFields();
            const res = await axios.patch(`http://localhost:8000/user/edit_user/${Token}`, values);
            
            if(res.data.message != "duplicate email")
                message
                    .loading('Action in progress..', 2.5)
                    .then(() => message.success('Information Updated successfully!', 3));
            else
            message
            .loading('Action in progress..', 2.5)
            .then(() => message.error('This email is associated with another account!', 3));
        } catch (e) {
            console.log(e)
            message
                .loading('Action in progress..', 2.5)
                .then(() => message.error('Something went wrong.', 3));
        }
    }
    return (
        <>
            <div>
                <Card className="container">
                    <div className="title">Edit Your Profile</div>
                    <Form form={form} name="Edit User">
                        <Form.Item
                            name="FirstName"
                            label={<label className="label">First Name</label>}
                            style={{ width: '50%' }}
                            >
                            <Input className="input" placeholder='FirstName' />
                        </Form.Item>
                        <Form.Item
                            name="LastName"
                            label={<label className="label">Last Name</label>}
                            style={{ width: '50%' }}
                            >
                            <Input className="input" placeholder='LastName' />
                        </Form.Item>
                        <Form.Item
                            name="PassportNumber"
                            label={<label className="label">Passport Number</label>}
                            style={{ width: '50%' }}
                            >
                            <Input className="input" placeholder='passport number' />
                        </Form.Item>
                        <Form.Item
                            name="Email"
                            label={<label className="label">Email</label>}
                            style={{ width: '50%' }}
                            rules={[{ type: 'email', message: 'Please enter a valid Email' }]}>
                            <Input className="input" placeholder='email' />
                        </Form.Item>
                        <div style={{ textAlign: 'center' }}>
                            <Button
                                className="button"
                                type="primary"
                                onClick={Edit}>
                                Save Changes
                      </Button>
                        </div>
                    </Form>
                </Card>
            </div>
        </>
    )
}

export default EditUser