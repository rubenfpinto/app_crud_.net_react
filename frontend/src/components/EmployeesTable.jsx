import { useEffect, useState } from 'react';
import { getEmployees } from '../services/api.js';
import DeleteConfirmation from '../components/DeleteConfirmation.jsx'
import { Modal, Button } from 'react-bootstrap'

export default function EmployeesTable({employees, setEmployees, pagination, setPagination, totalPages, setTotalPages}){
 
    useEffect(() => {
      async function fetchData() {
        try {
          const res = await getEmployees('', 0, 1, 1, 10);
          setEmployees(res.data.employees);
          setPagination(res.data.page);
          setTotalPages(res.data.totalPages);
        } catch (err) {
          console.error('Something went wrong:', err);
        }
      }
      fetchData();
    }, []);

    const jumpToPage = (page) => {
      try {
          const res = getEmployees('', '', '', 0, '', page, 10);
          setEmployees(res.data.employees);
          setPagination(res.data.page);
        } catch (err) {
          console.error('Something went wrong:', err);
        }
    }
    const [showDelete, setShowDelete] = useState(false);
    const handleShowDelete = () => {
      //document.getElementById('delId').value = 1;
      setShowDelete(true);
    }
    const handleCloseDelete = () => setShowDelete(false);
      
    const deleteConfirmed = (e)=> {
      try {
        e.preventDefault();
        const id = document.getElementById("delId").value;
        const res = remove(id);
        setEmployees(res.data.employees);
        setPagination(res.data.page);
      } catch (err) {
        console.error('Something went wrong:', err);
      }
    }

  return (
    <>
      <table className="table table-hover border">
        <thead className="table-dark">
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Birthdate</th>
            <th className="border px-4 py-2">Years of experience</th>
            <th className="border px-4 py-2">Experieced Tech</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border px-4 py-2">{employee.name}</td>
              <td className="border px-4 py-2">{new Date(employee.birthdate).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{employee.yearsOfExperience}</td>
              <td className="border px-4 py-2">{employee.experiencedTech}</td>
              <td className="border px-4 py-1 d-flex justify-content-evenly">
                <Button className='btn btn-success btnActions'><i className="bi bi-pencil-square"></i></Button>
                <Button className='btn btn-danger btnActions' onClick={(e)=> {e.preventDefault(); handleShowDelete(employee.id)}}><i className="bi bi-trash3"></i></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <DeleteConfirmation 
        showDelete={showDelete} setShowDelete={setShowDelete}
      /> */}
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center">
          {pagination == 1 ? (
              <li className="page-item disabled">
                <a className="page-link">Previous</a>
              </li>
            ) : (
              <li className="page-item">
                <a className="page-link">Previous</a>
              </li>
            )
          }
          {Array.from({length: totalPages}, (_, index) => (
            <li key={index} className={`page-item ${index == pagination ? 'active' : ''}`}>
              <a className="page-link" 
                onClick={index == pagination ? '' : (e) => {
                          e.preventDefault();
                          jumpToPage(page);
                        }
              }>{index+1}</a>
            </li>
          ))}
          {pagination == 1 ? (
            <li className="page-item">
                <a className="page-link disabled" >Next</a>
            </li>
          ) : (
            <li className="page-item">
                <a className="page-link" onClick={(e) => {
                  e.preventDefault();
                  jumpToPagePage(pagination+1);
                }} >Next</a>
            </li>
          )}
        </ul>
      </nav>

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="hidden" id="delId" value=""/>
          Are you sure You want to delete the Employee?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="primary" onClick={deleteConfirmed}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}