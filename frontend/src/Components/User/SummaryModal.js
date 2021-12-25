import { useState, useEffect } from "react";
import SmallCard from './ResSummary/SmallCard';
import { Button,  Modal} from "antd";

const SummaryModal= ({Departure, Return}) =>{
    console.log(Departure)
    console.log(Return)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [departuretrip, setDeparture] = useState({});
    const [returntrip, setReturn] = useState({});
    
    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };

    useEffect (()=>{
      setDeparture(Departure);
      setReturn(Return);
    },[])
    console.log(departuretrip);
    console.log(returntrip);

    if(departuretrip != {} || returntrip != {}){
    return(
        <>
        
        <Button style={{marginLeft:'5%'}} onClick={showModal}> View Summary</Button>

        <Modal width='1200px' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} >
            <div style={{width:'500px'}}>
                <SmallCard DepartureFlight={departuretrip.Flight} ReturnFlight={returntrip.Flight}  FirstBooking ={departuretrip.Booking}  SecondBooking={returntrip.Booking} />
            </div>
        </Modal>
        </>
  

    )
    }
    else return <> </>
}

export default SummaryModal;