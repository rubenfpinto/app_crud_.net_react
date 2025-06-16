import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import { create } from '../services/api';
import { getEmployees } from '../services/api.js';

export default function AddEmployee(){
  const [show, setShow] = useState(false);
  const [createEmployee, setCreateEmployee] = useState({
    Name: '',
    Birthdate : '',
    YearsOfExperience: 0,
    ExperiencedTech: ''
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const employeeForm = async(e)=> {
    try {
      e.preventDefault();
      const res = await create(createEmployee);
      console.log('submit')
      setEmployees(res.data.employees);
      setPagination(res.data.page);
    } catch (err) {
      console.error('Something went wrong:', err);
    }
  }

  return(
    <>
      <Button className="btn btn-primary" onClick={handleShow}>
        <i className="bi bi-person-plus"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new employee</Modal.Title>
        </Modal.Header>
        <form onSubmit={employeeForm}>
          <Modal.Body>
            <div className="form-floating mb-3">
              <input 
                type="text" 
                className="form-control" 
                id="Name"
                name="Name"
                value={createEmployee.Name} 
                placeholder="Name"
                onChange={(e) => setCreateEmployee(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                          }))
                        }
                required/>
              <label htmlFor="Name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input 
                type="date" 
                className="form-control" 
                id="Birthdate" 
                name="Birthdate" 
                value={createEmployee.Birthdate}
                placeholder="Birthdate" 
                onChange={(e) => setCreateEmployee(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                          }))
                        }
                required/>
              <label htmlFor="Birthdate">Birthdate</label>
            </div>
            <div className="form-floating mb-3">
              <input 
                type="number" 
                className="form-control" 
                id="YearsOfExperience" 
                name="YearsOfExperience" 
                value={createEmployee.YearsOfExperience}
                placeholder="Years of Experience" 
                onChange={(e) => setCreateEmployee(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                          }))
                        }
                required/>
              <label htmlFor="YearsOfExperience">Years of Experience</label>
            </div>
            <div className="form-floating mb-3">
              <input 
                type="text" 
                className="form-control" 
                id="ExperiencedTech" 
                name="ExperiencedTech" 
                value={createEmployee.ExperiencedTech}
                placeholder="Most experienced Tech" 
                onChange={(e) => setCreateEmployee(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value
                          }))
                        }
                required/>
              <label htmlFor="ExperiencedTech">Most experienced Tech</label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type='submit'>
              create
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>

  )
}