import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import { update } from '../services/api.js';
import { getEmployees } from '../services/api.js';
import { toast } from 'react-toastify'

export default function Edit({id, employees, setEmployees, setPagination, filters, pagination, search, setTotalEmployees, setLoading}){
  const [show, setShow] = useState(false);
  
  const [editEmployee, setEditEmployee] = useState({
    Id: '',
    Name: '',
    Birthdate : '',
    YearsOfExperience: '',
    ExperiencedTech: ''
  });

  const handleClose = () => {
    setShow(false);
    setEditEmployee({
      Id: '',
      Name: '',
      Birthdate : '',
      YearsOfExperience: '',
      ExperiencedTech: ''
    });
  }
  const handleShow = () => {  
    const e = employees.find( e => e.id === id);
    if(e){
      setEditEmployee({
        Id: e.id,
        Name: e.name,
        Birthdate : e.birthdate.split('T')[0],
        YearsOfExperience: e.yearsOfExperience,
        ExperiencedTech: e.experiencedTech
      });
    }
    setShow(true);
  }

    const validateForm = () => {
    var check = true;
    setEditEmployee({
      Name: editEmployee.Name.trim(),
      Birthdate : editEmployee.Birthdate,
      YearsOfExperience: editEmployee.YearsOfExperience,
      ExperiencedTech: editEmployee.ExperiencedTech.trim()
    });

    if(editEmployee.Name.trim() === ''){
        toast.warning("It's necessary to fill the Name!");
        check = false;
    }

    const birthdateToCheck = new Date (editEmployee.Birthdate);
    const today = new Date();
    const limitDate = new Date ("1800-01-01");
    if(birthdateToCheck > today || birthdateToCheck < limitDate){
        toast.warning("It's necessary to fill the Birthdate correctly!");
        check = false;
    }

    if(editEmployee.YearsOfExperience === '' || editEmployee.YearsOfExperience <= 0){
        toast.warning("It's necessary to fill the Years of experience!");
        check = false;
    }
    
    if(editEmployee.ExperiencedTech.trim() === ''){
        toast.warning("It's necessary to fill the Experienced Tech!");
        check = false;
    }
    return check;
  }

  const employeeForm = async(e)=> {
    try {
      e.preventDefault();
      const check = validateForm();
      if(check){
        setLoading(true);
        const res = await update(editEmployee);
        if(res.data.success){
          handleClose();
          toast.success(res.data.message);
          const resfresh = await getEmployees(search, filters.orderByType, filters.orderBy, pagination, 10);
          setEmployees(resfresh.data.employees);
          setPagination(resfresh.data.page);
          setTotalEmployees(resfresh.data.employeesTotal);
          setLoading(false);
        }
        else {
          toast.error(res.data.message)
        }
      }
    } catch (err) {
      console.error('Something went wrong:', err);
    }
  }

  return(
    <>
      <Button 
        className='btn btn-success btnActions d-flex align-items-center justify-content-center' 
        onClick={handleShow}>
          <i className="bi bi-pencil-square"></i>
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
                value={editEmployee.Name} 
                placeholder="Name"
                onChange={(e) => setEditEmployee(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value.trimStart()
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
                value={editEmployee.Birthdate}
                placeholder="Birthdate" 
                onChange={(e) => setEditEmployee(prev => ({
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
                value={editEmployee.YearsOfExperience}
                placeholder="Years of Experience" 
                onChange={(e) => setEditEmployee(prev => ({
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
                value={editEmployee.ExperiencedTech}
                placeholder="Most experienced Tech" 
                onChange={(e) => setEditEmployee(prev => ({
                          ...prev,
                          [e.target.name]: e.target.value.trimStart()
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
              Edit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>

  )
}