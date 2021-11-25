import axios from 'axios';
import 'antd/dist/antd.css';
import { Button, Form, Input, Card, message } from 'antd';
import './Admin.css';
import '../../Styles/background.scss';
import Navigation from '../Admin/Navigation.js'

require('dotenv').config()

function EditUser() {
    const id = "617ae39d75f5e23f35fe57c6"
    const [form] = Form.useForm();

    const Edit = async () => {
        try {
            const values = await form.validateFields();
            await axios.patch(`http://localhost:8000/admin/edit_user/${id}`, values);
            message
                .loading('Action in progress..', 2.5)
                .then(() => message.success('Information Updated successfully!', 3));
        } catch (e) {
            message
                .loading('Action in progress..', 2.5)
                .then(() => message.error('Something went wrong.', 3));
        }
    }

    return (
        <>
        <Navigation/>
        <div>
            {/* <img src={Airplane} alt='val' /> */}
            <Card style={{ width: '60%' }} 
            className='updateCard' 
            hoverable='true'
            title="Edit Your Information"
            headStyle={{fontSize: '20px',color:'white',background:'#034f84'}}
            bodyStyle={{backgroundColor: 'transparent'}}>
                <div>
                    <Form form={form} name="Edit User">
                        {/* <Row gutter={16, 8}>
                            <Col span={8}> */}
                        <Form.Item
                            name="FirstName"
                            label="First Name"
                            style={{ width: '50%' }}
                            rules={[{ required: true }]}>
                            <Input placeholder='FirstName' />
                        </Form.Item>
                        {/* </Col>
                            <Col span={8}> */}
                        <Form.Item
                            name="LastName"
                            label="Last Name"
                            style={{ width: '50%' }}
                            rules={[{ required: true }]}>
                            <Input placeholder='LastName' />
                        </Form.Item>
                        {/* </Col>
                        </Row> */}
                        <Form.Item
                            name="PassportNumber"
                            label="Passport Number"
                            style={{ width: '50%' }}
                            rules={[{ required: true }]}>
                            <Input placeholder='passport number' />
                        </Form.Item>
                        <Form.Item
                            name="Email"
                            label="Email"
                            style={{ width: '50%' }}
                            rules={[{ required: true }]}>
                            <Input placeholder='email' />
                        </Form.Item>
                        <div style={{ textAlign: 'center' }}>
                            <Button type="primary" 
                            onClick={Edit} 
                            style={{ background: '#034f84', borderColor: '#034f84', marginTop: '40px', width: '150px' }}>
                                Update
                      </Button>
                        </div>
                    </Form>
                </div>
            </Card>
        </div>
        </>
    )
}

export default EditUser