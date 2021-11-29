import axios from 'axios';
import { Form, Input, message, Button, Card } from 'antd';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../Context';
import '../../Styles/EditUser.scss';
// import $ from 'jquery';

require('dotenv').config()

function EditUser() {
    const { Token } = useContext(UserContext);
    const [form] = Form.useForm();

    const Edit = async () => {
        try {
            const values = await form.validateFields();
            await axios.patch(`http://localhost:8000/user/edit_user/${Token}`, values);
            message
                .loading('Action in progress..', 2.5)
                .then(() => message.success('Information Updated successfully!', 3));
        } catch (e) {
            message
                .loading('Action in progress..', 2.5)
                .then(() => message.error('Something went wrong.', 3));
        }
    }

    // useEffect(()=>{
    //     $('.form button').on('click',function(){
  
    //         $('.belt').addClass('transitioned-1');
    //         $('.progress-inner').addClass('loading');
            
    //         setTimeout(function(){
    //           $('.form-container').addClass('transitioned-3');
    //         },3000);
            
    //         setTimeout(function(){
              
    //           $('.belt').removeClass('transitioned-1');
    //           $('.belt').addClass('transitioned-2');
              
    //         },3300);
            
    //         $('.success button').on('click',function(){
              
    //           $('.progress-inner').removeClass('loading');
    //           $('.belt').removeClass('transitioned-2');
    //           $('.form-container').removeClass('transitioned-3');
              
    //         });
            
    //         // setTimeout(function(){
    //         //   $('.form-container').addClass('transitioned-3');
    //         // },6000);
    //         // $('.belt').removeClass('transitioned-2');
    //         // $('.form-container').removeClass('transitioned-3');
    //       });
    // },[]);

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
                            rules={[{ required: true }]}>
                            <Input className="input" placeholder='FirstName' />
                        </Form.Item>
                        <Form.Item
                            name="LastName"
                            label={<label className="label">Last Name</label>}
                            style={{ width: '50%' }}
                            rules={[{ required: true }]}>
                            <Input className="input" placeholder='LastName' />
                        </Form.Item>
                        <Form.Item
                            name="PassportNumber"
                            label={<label className="label">Passport Number</label>}
                            style={{ width: '50%' }}
                            rules={[{ required: true }]}>
                            <Input className="input" placeholder='passport number' />
                        </Form.Item>
                        <Form.Item
                            name="Email"
                            label={<label className="label">Email</label>}
                            style={{ width: '50%' }}
                            rules={[{ required: true }]}>
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