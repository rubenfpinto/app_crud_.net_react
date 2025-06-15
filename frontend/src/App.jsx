import {Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

import './assets/styles/layout.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Employees from './pages/Employees'

export default function App() {
  return (
    <div>
      {/* <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/employees">Employees</Link>
      </nav> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        {/*<Route path="/add" element={<AddEmployee />} />
        <Route path="/edit/:id" element={<EditEmployee />} /> */}
      </Routes>
    </div>
  )
}