const Seat = ({seat}) => {
    const markAsChosen = (e) => e.target.classList.toggle("selected")
    return (seat.reserved ? <div key={seat.number} className="seat occupied"></div> 
    : <div key={seat.number} className="seat" onClick={markAsChosen}></div>
    )
}
export default Seat

// const Seat = () => {
//     return (
//     <>
//     <div class="movie-container">
//         <label>Pick a movie:</label>
//         <select id="movie">
//             <option value="650">Parasite (₹650)</option>
//             <option value="850">Joker (₹850)</option>
//             <option value="550">Jumanji: Next Level (₹550)</option>
//             <option value="750">Dolittle (₹750)</option>
//         </select>
//     </div>

//     <ul class="showcase">
//         <li>
//             <div class="seat"></div>
//             <small>N/A</small>
//         </li>
//         <li>
//             <div class="seat selected"></div>
//             <small>Selected</small>
//         </li>
//         <li>
//             <div class="seat occupied"></div>
//             <small>Occupied</small>
//         </li>
//     </ul>

//     <div class="container">
//         <div class="movie-screen">
//             <img src='screen-thumb.png' alt='screen' />
//         </div>

//         <div class="row-container">
//             <div class="row">
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//             </div>
//             <div class="row">
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat occupied"></div>
//                 <div class="seat occupied"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//             </div>
//             <div class="row">
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat occupied"></div>
//                 <div class="seat occupied"></div>
//             </div>
//             <div class="row">
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//             </div>
//             <div class="row">
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat occupied"></div>
//                 <div class="seat occupied"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//             </div>
//             <h5 class='subtitle'>GOLD - ₹650</h5>
//             <div class="row">
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//             </div>
//             <div class="row">
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat"></div>
//                 <div class="seat occupied"></div>
//                 <div class="seat occupied"></div>
//                 <div class="seat occupied"></div>
//                 <div class="seat"></div>
//             </div>
//             <h5 class='subtitle'>DIAMOND - ₹850</h5>

//             <div class="text-wrapper">
//                 <p class="text">Selected Seats <span id='count'>0</span></p>
//                     <p class="text">Total Price ₹<span id="total">0</span></p>
//             </div>
//         </div>

//     </div>


//     <div class="text-wrapper">
//         <p class="text">Selected Seats <span id='count'>0</span></p>
//             <p class="text">Total Price ₹<span id="total">0</span></p>
//     </div> 


// </>
//     );
// }