import React, { useContext , useState} from "react";
import axios from "axios";
import "../../../Styles/summary.scss";
import { Badge, Button , Modal, Result} from "antd";
import { UserContext } from "../../../Context";
const PassengerSum = ({FirstBooking, SecondBooking}) => {
  const {Token, Email, FirstName, LastName} = useContext(UserContext)
  const [visible, setVisible] = useState(false);
  const [success, setSuccess] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const sendByEmail = async () =>{
    try{
    await axios.post(`/user/email_reservation`, {Token, Email , FirstName, LastName, FirstBooking, SecondBooking})
    setSuccess(true);
    setVisible(true);
    }catch (err){
      setSuccess(false);
      setErrorMsg(err)
      setVisible(true);
    }
  }
  return (
    <div className="small-card">
      <div className="wrapper">
        <div className="qr_code">
          <img src="https://i.imgur.com/vMisPqv.png" alt="QR_code" />
        </div>
        <div className="content">
          <div className="info">
            <div className="item">
              <h4>passenger</h4>
              <h4>{`${FirstName}  ${LastName}`}</h4>
              <p>Refundable</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10%",
              width: "50%",
              float: "right",
            }}
          >
            <Button onClick={sendByEmail} type="primary">Send by Email</Button>
          </div>
        </div>
        <Badge.Ribbon
          text="Lowest Price"
          style={{ float: "right", right: "5%" }}
          color="green"
        />
      </div>
      <Modal
                  visible={visible}
                  onOk={()=>{setVisible(false)}}
                  onCancel={() => {
                    setVisible(false);
                  }}
                  footer={[<Button onClick={()=>{setVisible(false)}}>Ok</Button>]}
                >
                  {success ? (
                    <Result
                      status="success"
                      title="Successfully Sent Email"
                      
                    />
                  ) : (
                    <Result
                      status="error"
                      title="Ooops. We couldn't send the email"
                      subTitle={errorMsg}
                    />
                  )}
                </Modal>
    </div>
  );
}
export default PassengerSum;
