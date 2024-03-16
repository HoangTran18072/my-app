import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import {updateUser} from '../services/user';
import { toast } from 'react-toastify';


const ModelUpdateAUser = (props) => {
    const {clearUpdateData, refreshPage, data} = props;
    const [id, setID] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [show, setShow] = useState(false);
    useEffect(() =>{
        if(data.length !== 0){
          setID(data._id);
          setEmail(data.Email);
          setFirstName(data.FirstName);
          setLastName(data.LastName);
          setShow(true);
        }
    }, [data])

    const handleClose = () =>{
      setShow(false)
      clearUpdateData();
    }
    const saveOnclick = async() =>{
        let res = await updateUser(id, email, firstname, lastname);
        if(res.status === 200)
        {
            handleClose();
            setID('')
            setEmail('');
            setFirstName('');
            setLastName('');
            toast.success('update a user succed');
            refreshPage();
        }
        else{
            toast.error('something wrong')
        }
    }
    
    
  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={(Event) => setEmail(Event.target.value)} type="text" placeholder="input your Email" defaultValue={email} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="FirstName">
                    <Form.Label>FirstName</Form.Label>
                    <Form.Control type="text" onChange={(Event) => setFirstName(Event.target.value)} placeholder="input your firstname" defaultValue={firstname}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="LastName">
                    <Form.Label>LastName</Form.Label>
                    <Form.Control type="text" onChange={(Event) => setLastName(Event.target.value)} placeholder="input your lastname" defaultValue={lastname}/>
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

export default ModelUpdateAUser;