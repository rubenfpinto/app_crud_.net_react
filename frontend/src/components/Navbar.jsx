import {Link} from 'react-router-dom'

export default function Navbar(){
  return (
        <nav className='navmenu'>
          <Link to="/">Home</Link>
          <Link to="/employees">Employees</Link>
        </nav>
  )
}