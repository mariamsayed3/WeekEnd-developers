import axios from 'axios';
import 'antd/dist/antd.css';
import { Modal} from 'antd';
import '../Admin/Admin.css';
import '../../Styles/Profile.scss';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../Context';
import { ImProfile } from "react-icons/im";

require('dotenv').config()

const Profile = (props) => {
    const { Token } = useContext(UserContext);
    const [Information, setInformation] = useState(false);

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

    return (
        <>
            <Modal
            visible={props.modalOpen}
                width={600}
                footer={false}
                bodyStyle={{ height: "380px" }}
                onCancel={handleCancel}
                okButtonProps={{ style: { display: 'none' } }}
                cancelButtonProps={{ style: { display: 'none' } }}>
                <div class="Card1">
                    <div class="photo"></div>
                    <ul class="details">
                        <h4>Welcome {Information.FirstName}!</h4>
                    </ul>
                    <div class="description">
                        <div class="line">
                            <h2 class="my_profile"><ImProfile class="my_profile" size="20" />  My Profile</h2>
                        </div>
                        {/* <h2>Jet Away Profile</h2> */}
                        <ul class="summary">
                            <h4><weak>First Name: </weak><b>{Information.FirstName}</b>
                                <br></br>
                                <weak>Last Name: </weak><b>{Information.LastName}</b>
                                <br></br>
                                <weak>Email: </weak><b>{Information.Email}</b>
                                <br></br>
                                <weak>Passport Number: </weak><b>{Information.PassportNumber}</b></h4>
                        </ul>
                        <a href="/edit_info">Edit</a>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Profile