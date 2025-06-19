import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import { create } from '../services/api.js';
import { getEmployees } from '../services/api.js';
import { toast } from 'react-toastify'

export default function Create({setEmployees, setPagination, filters, pagination, setTotalEmployees, setLoading}){
  const [show, setShow] = useState(false);
  
  const [createEmployee, setCreateEmployee] = useState({
    Name: '',
    Birthdate : '',
    YearsOfExperience: '',
    ExperiencedTech: ''
  });

  const handleClose = () => {
    setShow(false);
    setCreateEmployee({
      Name: '',
      Birthdate : '',
      YearsOfExperience: '',
      ExperiencedTech: ''
    });
  }
  const handleShow = () => setShow(true);

  const validateForm = () => {
    var check = true;
    setCreateEmployee({
      Name: createEmployee.Name.trim(),
      Birthdate : createEmployee.Birthdate,
      YearsOfExperience: createEmployee.YearsOfExperience,
      ExperiencedTech: createEmployee.ExperiencedTech.trim()
    });

    if(createEmployee.Name.trim() === ''){
        toast.warning("It's necessary to fill the Name!");
        check = false;
    }
    if (createEmployee.Name.trim().length < 3 || createEmployee.Name.trim().length > 50) {
       toast.warning("The name must be between 3 and 50 characters.");
    }
    const birthdateToCheck = new Date (createEmployee.Birthdate);
    const today = new Date();
    const limitDate = new Date ("1800-01-01");
    if(birthdateToCheck > today || birthdateToCheck < limitDate){
        toast.warning("It's necessary to fill the Birthdate correctly!");
        check = false;
    }

    if(createEmployee.YearsOfExperience === '' || createEmployee.YearsOfExperience <= 0){
        toast.warning("It's necessary to fill the Years of experience!");
        check = false;
    }

    if(createEmployee.ExperiencedTech.trim() === ''){
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
        const res = await create(createEmployee);
        if(res.data.success){
          handleClose();
          toast.success(res.data.message);
          const resfresh = await getEmployees('', filters.orderByType, filters.orderBy, pagination, 10);
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
              Create
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>

  )
}