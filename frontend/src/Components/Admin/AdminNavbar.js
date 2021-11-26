import '../../Styles/navbar.scss'

function AdminNavbar (){
    return (
    <>
      <nav>
        <label class="logo">AirLine</label>
        <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="/admin/flights">Available Flights</a></li>
          <li><a href="/admin/create_flight">Create Flight</a></li>
          <li><a href="#">Contact us</a></li>
        </ul>
    </nav>
  </>
    )

}

export default AdminNavbar;