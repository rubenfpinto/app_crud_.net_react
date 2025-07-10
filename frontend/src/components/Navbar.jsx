import {Link} from 'react-router-dom'

export default function Navbar(){
  return (
        <nav className='navmenu'>
          {/* <div className='logoContainer'>
            <img className='logo' src="" alt="Company Logo" />
          </div> */}
          <Link to="/">Home</Link>
          <Link to="/employees">Employees</Link>
        </nav>
  )
}