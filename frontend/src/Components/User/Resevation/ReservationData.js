import '../../../Styles/ReservationData.scss'
const ReservationData = ({totalSeats, price}) => {

    return (
        <>

    <div class='flight-card--details body1'>
        <div>
            <div class='bc-from'>
                <span class='detail-code'>
                    Barcelona
                </span>
            </div>
            <div class='bc-plane'>
                <img src='https://cdn.onlinewebfonts.com/svg/img_537856.svg'/>
            </div>
            <div class='bc-to'>
                <span class='detail-code'>
                    California
                </span>
            </div>
        </div>
        <div>
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
        </div>
    
  </div>

        </>
    )



}

export default ReservationData