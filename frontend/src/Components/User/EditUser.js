import axios from 'axios';
import { Form, Input, message, Button, Modal } from 'antd';
import { useContext } from 'react';
import { UserContext } from '../../Context';
import '../../Styles/EditUser.scss';

require('dotenv').config()

const EditUser = (props) => {
    const { Token, setFirstName, setLastName, setEmail } = useContext(UserContext);
    const [form] = Form.useForm();

    const handleCancel = () => {
        props.handleEditModal(false);
    };

    const Edit = async () => {
        try {
            const values = await form.validateFields();
            if (values.FirstName) {
                values.FirstName = values.FirstName.trim();
                if (values.FirstName === "") {
                    values.FirstName = undefined;
                }
            }
            if (values.FirstName === "") {
                values.FirstName = undefined;
            }
            if (values.LastName) {
                values.LastName = values.LastName.trim();
                if (values.LastName === "") {
                    values.LastName = undefined;
                }
            }
            if (values.LastName === "") {
                values.LastName = undefined;
            }
            if (values.Email) {
                values.Email = values.Email.trim();
            }
            if (values.PassportNumber) {
                values.PassportNumber = values.PassportNumber.trim();
                if (values.PassportNumber == - "") {
                    values.PassportNumber = undefined;
                }
            }
            if (values.PassportNumber == - "") {
                values.PassportNumber = undefined;
            }
            console.log(values)
            const res = await axios.patch(`http://localhost:8000/user/edit_user/${Token}`, values);
            const SessionStorage = sessionStorage.getItem('user')
            let userInfo = JSON.parse(SessionStorage)
            console.log(values.FirstName)
            if (values.FirstName == undefined
                && values.LastName == undefined
                && values.Email == undefined
                && values.PassportNumber == undefined) {
                message
                    .info('Insert any information to update..', 1.5);
            }
            else {
                if (res.data.message != "duplicate email") {
                    message
                        .loading('Action in progress..', 1.5)
                        .then(() => message.success('Information Updated successfully!', 1.5)
                            .then(() => window.location.reload()));
                    if (values.FirstName) {
                        setFirstName(values.FirstName)
                        userInfo.FirstName = values.FirstName
                    }
                    if (values.LastName) {
                        setLastName(values.LastName)
                        userInfo.LastName = values.LastName
                    }
                    if (values.Email) {
                        setEmail(values.Email)
                        userInfo.Email = values.Email
                    }
                    userInfo = JSON.stringify(userInfo)
                    sessionStorage.setItem('user', userInfo)
                }
                else
                    message
                        .loading('Action in progress..', 2.5)
                        .then(() => message.error('This email is associated with another account!', 3));
            }
        }
        catch (e) {
            console.log(e)
            message
                .loading('Action in progress..', 2.5)
                .then(() => message.error('Something went wrong.', 3));
        }
        
    }


    return (
        <>
                <Modal
                    className="container"
                    width={400}
                    visible={props.EditOpen}
                    onCancel={handleCancel}
                    footer={false}
                    okButtonProps={{ style: { display: 'none' } }}
                    cancelButtonProps={{ style: { display: 'none' } }}>
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
                </Modal>
        </>
    )
}

export default EditUser