import '../../Styles/AvailableFlights.css'

const DepartureCard = () => {

   return(
       <div>
    <div class="section">
    <div class="tpd-plan">
     <div class="tp-flight-plan">
      <div class="container-fluid">
     
      <div class="crop depart">
    <div class="context collapsed" data-toggle="collapse" data-target="#demo">
        <a role="button" tabindex="0" class="tog-cal itin-det-btn">
            <i class="fa fa-chevron-up"></i>
            <i class="fa fa-chevron-down"></i>
        </a>
        <div class="item it-1">
            <label class="trip-type depart">Departure</label>
            <div class="airline-image">
                <div class="df-text">8 Hours</div>
                <span class="img-wrapper">
                    <svg class="anime-airplane">
                        <svg dangerouslySetInnerHTML={{__html: '<use xlink:href="#airplane"/>' }} />
                    </svg>
                    <span class="top-label">Direct</span>
                </span>
            </div>

            <div class="port-seg">
                <div class="flight-seg origin">
                    <div class="time">02:00</div>
                    <div class="port">IST</div>
                    <div class="name">Istanbul</div>
                </div>
                <div class="flight-seg destination">
                    <div class="time">10:20</div>
                    <div class="port">ESB</div>
                    <div class="name">Ankara</div>
                </div>
            </div>
        </div>
        <div class="item it-2">
            <div class="dr-row">
                <span class="al-name">Etihad</span>
                <img class="airline-logo" src="https://images.ucuzabilet.com/resources/img/flights-logo/logo25x19/25px-EY.png" />
            </div>
            <div class="take-tim">Wed, Jan 23, 2019</div>
        </div>
    </div>
    <div id="demo" class="fly-wrap collapse">
        <div class="fly-det">
            <div class="f-item">
                <div class="airway-title">
                    <img class="airline-logo" src="https://www.turkishairlines.com/theme/img/carrierairlines/carriercode_tk.png" /> <span>Turkish Airlines</span>
                </div>
                <div class="root-de">
                    <div class="times"> 4 Hour </div>
                    <div class="directs">
                        <div class="itin-time">
                            <div class="itin-lines"></div>
                        </div>

                        <div class="hour-sm">
                            <div class="hour-time-sm">02:10</div>

                            <div class="hour-time-sm">05:55</div>
                        </div>
                    </div>

                    <div class="itin-target">
                        <div class="tar-label">IST İstanbul Atatürk</div>
                        <div class="tar-label">BAH Bahreyn</div>
                    </div>
                </div>

            </div>
        </div>
        <div class="arrival-info">
            <span class="sub-span">
                <strong>Arrives:</strong>
                Wed, Jan 23, 2019
            </span>

            <span class="sub-span duration-info">
                <strong>Journey duration:</strong>
                28h 35m
            </span>
        </div>
    </div>

</div>

</div>
</div>
    </div>
    </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" display="none">
      <symbol  id="airplane" viewBox="243.5 245.183 25 21.633">
        <g>
          <path d="M251.966,266.816h1.242l6.11-8.784l5.711,0.2c2.995-0.102,3.472-2.027,3.472-2.308
                                  c0-0.281-0.63-2.184-3.472-2.157l-5.711,0.2l-6.11-8.785h-1.242l1.67,8.983l-6.535,0.229l-2.281-3.28h-0.561v3.566
                                  c-0.437,0.257-0.738,0.724-0.757,1.266c-0.02,0.583,0.288,1.101,0.757,1.376v3.563h0.561l2.281-3.279l6.535,0.229L251.966,266.816z
                                  "/>
        </g>
      </symbol>
    </svg>
    </div>
   )






} 

export default DepartureCard