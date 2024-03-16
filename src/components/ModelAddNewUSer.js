import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import {postCreateUser} from '../services/user';
import { toast } from 'react-toastify';


const ModelAddNewUser = (props) => {
    const {show, handleClose, refreshPage} = props;
    const [email, setEmail] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');

    const saveOnclick = async () =>
    {
        let res = await postCreateUser(email, firstname, lastname);
        if(res.status === 200)
        {
            handleClose();
            setEmail('');
            setFirstName('');
            setLastName('');
            toast.success('add new user succed');
            refreshPage();
        }
        else{
            toast.error('something wrong')
        }
    }
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={(Event) => setEmail(Event.target.value)} type="text" placeholder="input your Email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="FirstName">
                    <Form.Label>FirstName</Form.Label>
                    <Form.Control type="text" onChange={(Event) => setFirstName(Event.target.value)} placeholder="input your firstname"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="LastName">
                    <Form.Label>LastName</Form.Label>
                    <Form.Control type="text" onChange={(Event) => setLastName(Event.target.value)} placeholder="input your lastname"/>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={saveOnclick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ModelAddNewUser;