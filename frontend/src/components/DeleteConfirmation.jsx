import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react';
import { toast } from 'react-toastify'
import { getEmployees } from '../services/api.js';
import { remove } from '../services/api.js';

export default function DeleteConfirmation({id, setEmployees, setPagination, pagination, filters, search}) {
  const [showDelete, setShowDelete] = useState(false);
  const [employeeId, setEmployeeId] = useState(null);

  const handleShowDelete = () => {
    console.log('sss')
    setEmployeeId(id);
    setShowDelete(true);
  }
  const handleCloseDelete = () => setShowDelete(false);
  
  const deleteConfirmed = async (e)=> {
    try {
      e.preventDefault();
      const res = await remove(employeeId);
      if(res.data.success){
        handleCloseDelete();
        setEmployeeId(null);
        toast.success(res.data.message);
        const resfresh = await getEmployees(search, filters.orderByType, filters.orderBy, pagination, 10);
        setEmployees(resfresh.data.employees);
        setPagination(resfresh.data.page);
      }
      else {
        toast.error(res.data.message)
      }
    } catch (err) {
      console.error('Something went wrong:', err);
    }
  }

  return (
    <>
      <Button 
        className='btn btn-danger btnActions d-flex align-items-center justify-content-center' 
        onClick={handleShowDelete}>
          <i className="bi bi-trash3"></i>
      </Button>

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure You want to delete the Employee?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteConfirmed}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}