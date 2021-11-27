import { Button, Popconfirm } from 'antd'
import '../../../Styles/ReservationData.scss'
import { CheckOutlined } from '@ant-design/icons'
import { useHistory } from 'react-router-dom'
import ConfirmReservation from './ConfirmReservation'
const ReservationData = ({from, to ,totalSeats, price, returnFlight}) => {
    let history = useHistory()
    const confirm = () => {
       history.push('/new path')
    }
    return (
    <>
    <div class='flight-card--details body1'>
        <div>
            <div class='bc-from'>
                <span class='detail-code'>
                    {from}
                </span>
            </div>
            <div class='bc-plane'>
                <img src='https://cdn.onlinewebfonts.com/svg/img_537856.svg'/>
            </div>
            <div class='bc-to'>
                <span class='detail-code'>
                    {to}
                </span>
            </div>
        </div>
        
            <div class='flight-card-details--text layout2'>
                <div class="margin">
                    <span class='text-hline'>
                    Chosen seats
                    </span>
                    <span class='text-actual'>
                    {totalSeats}
                    </span>
                </div>
                <div class="margin">
                    <span class='text-hline'>
                    Total Price
                    </span>
                    <span class='text-actual'>
                    {price} L.E
                    </span>
                </div>
            </div>
        
        <div>
            {
            !returnFlight ?
            
                <Button disabled={totalSeats === 0} style={{marginTop: '15px'}} type="primary" shape="round" icon={<CheckOutlined />} size="middle">
                    <a style={{color: 'white'}} href="/reserve_return">Confirm and reserve return flight</a>
                </Button>
           
            :
            <ConfirmReservation totalSeats={totalSeats}/>
            }
        </div>
    
  </div>

        </>
    )



}

export default ReservationData