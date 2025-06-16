import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react'
import { remove } from '../services/api';

export default function DeleteConfirmation(showDelete, setShowDelete) {

  const handleCloseDelete = () => setShowDelete(false);
  
  const deleteConfirmed = async (e)=> {
    try {
      e.preventDefault();
      const id = document.getElementById("delId").value;
      const res = await remove(id);
      setEmployees(res.data.employees);
      setPagination(res.data.page);
    } catch (err) {
      console.error('Something went wrong:', err);
    }
  }

  return (
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
  )
}