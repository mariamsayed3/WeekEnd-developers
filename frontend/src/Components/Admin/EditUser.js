import axios from 'axios';
import 'antd/dist/antd.css';
import { Button, Form, Input, DatePicker, Card, Row, Col } from 'antd';
import './Admin.css';


require('dotenv').config()

function EditUser() {
    const id = "617ae39d75f5e23f35fe57c6"
    const [form] = Form.useForm();

    const Edit = async () => {
        try {
            const values = await form.validateFields();
            await axios.patch (`http://localhost:8000/admin/edit_user/${id}`, values);
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <Card style={{width:'40%'}} className='updateCard'>
                <div>
                    <Form form={form} name="Edit User">
                        {/* <Row gutter={16, 8}>
                            <Col span={8}> */}
                                <Form.Item
                                    name="FirstName"
                                    label="First Name"
                                    style={{width:'50%'}}
                                    rules={[{ required: true }]}>
                                    <Input placeholder='FirstName'/>
                                </Form.Item>
                            {/* </Col>
                            <Col span={8}> */}
                                <Form.Item
                                    name="LastName"
                                    label="Last Name"
                                    style={{width:'50%'}}
                                    rules={[{ required: true }]}>
                                    <Input placeholder='LastName'/>
                                </Form.Item>
                            {/* </Col>
                        </Row> */}
                        <Form.Item
                                    name="PassportNumber"
                                    label="Passport Number"
                                    style={{width:'50%'}}
                                    rules={[{ required: true }]}>
                                    <Input placeholder='passport number' />
                                </Form.Item>
                                <Form.Item
                                    name="Email"
                                    label="Email"
                                    style={{width:'50%'}}
                                    rules={[{ required: true }]}>
                                    <Input placeholder='email' />
                                </Form.Item>
                                <div style={{textAlign:'center'}}>
                      <Button type="primary" onClick={Edit} style={{ marginTop: '40px', width: '150px'}}>
                        Update
                      </Button>
                      </div>
                    </Form>
                </div>
            </Card>
        </div>
    )
}

export default EditUser