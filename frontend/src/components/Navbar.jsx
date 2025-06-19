import {Link} from 'react-router-dom'

export default function Navbar(){
  return (
        <nav className='navmenu'>
          <div className='logoContainer'>
            <img className='logo' src="https://static.wixstatic.com/media/3f5be7_9355697b114f49d5abe03152c7cd561f~mv2.png/v1/fill/w_272,h_58,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/st_logos-16%20(2).png" alt="Company Logo" />
          </div>
          <Link to="/">Home</Link>
          <Link to="/employees">Employees</Link>
        </nav>
  )
}