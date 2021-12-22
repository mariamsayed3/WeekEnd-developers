import axios from 'axios';
import 'antd/dist/antd.css';
import { Modal } from 'antd';
import '../Admin/Admin.css';
import '../../Styles/Profile.scss';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../Context';
import { ImProfile } from "react-icons/im";
import EditUser from './EditUser';
import ChangePassword from './ChangePassword';

require('dotenv').config()

const Profile = (props) => {
    const { Token } = useContext(UserContext);
    const [Information, setInformation] = useState(false);
    const [EditOpen, setEditOpen] = useState(false);
    const [PasswordModal, setPasswordModal] = useState(false);

    useEffect(() => {
        const getInfo = async () => {
            const { data } = await axios.get(`http://localhost:8000/user/get_user/${Token}`);
            setInformation(data);
        };
        getInfo();
    }, []);

    const handleCancel = () => {
        props.handleModalOpen(false);
    };

    const handleEditModal = () => {
        setEditOpen(true);
        props.handleModalOpen(false);
    };

    const handlePasswordModal = () => {
        setPasswordModal(true);
        props.handleModalOpen(false);
    }


    return (
        <>
            <div className="modaldiv">
                <Modal
                    className="modal"
                    visible={props.modalOpen}
                    width={700}
                    footer={false}
                    bodyStyle={{ height: "380px" }}
                    onCancel={handleCancel}
                    okButtonProps={{ style: { display: 'none' } }}
                    cancelButtonProps={{ style: { display: 'none' } }}>
                    <div className="Card1">
                        <div className="photo"></div>
                        <ul className="details">
                            <h4>Welcome {Information.FirstName}!</h4>
                        </ul>
                        <div className="description">
                            <div className="line">
                                <h2 className="my_profile"><ImProfile className="my_profile" size="20" />  My Profile</h2>
                            </div>
                            {/* <h2>Jet Away Profile</h2> */}
                            <ul className="summary">
                                <h4><weak>First Name: </weak><b>{Information.FirstName}</b>
                                    <br></br>
                                    <weak>Last Name: </weak><b>{Information.LastName}</b>
                                    <br></br>
                                    <weak>Email: </weak><b>{Information.Email}</b>
                                    <br></br>
                                    <weak>Passport Number: </weak><b>{Information.PassportNumber}</b></h4>
                            </ul>
                            <a onClick={handlePasswordModal}>Change Password</a>
                            <a onClick={handleEditModal}>Edit</a>
                        </div>
                    </div>
                </Modal>
                <EditUser
                    EditOpen={EditOpen}
                    handleEditModal={setEditOpen}
                />
                <ChangePassword
                PasswordModal={PasswordModal}
                handlePasswordModal={setPasswordModal}
                />
            </div>
        </>
    )
}

export default Profile