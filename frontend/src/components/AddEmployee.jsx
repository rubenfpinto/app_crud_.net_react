import { Modal, Button } from 'react-bootstrap'
import { useState } from 'react'

export default function(){
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
      <Button className="btn btn-primary" onClick={handleShow}>
        <i className="bi bi-person-plus"></i>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={() => alert('Salvar')}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>

  )
}