import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../services/user';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ModelDeleteUser = (props) => {
    //lấy thuộc tính được truyền xuống từ component cha (tableUser)
    const {clearDeleteData, refreshPage, data} = props;
    
    //khởi tạo state
    const [id, setID] = useState('');
    const [email, setEmail] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [show, setShow] = useState(false);

    //mỗi khi data thay đổi và khác rỗng cập nhật lại state
    useEffect(() =>{
        if(data.length !== 0){
            setID(data._id);
            setEmail(data.Email);
            setFirstName(data.FirstName);
            setLastName(data.LastName);
            setShow(true);
          }
    }, [data])

    //khi ấn nút đóng ẩn của sổ và xóa data
    const handleClose = () =>{
        setShow(false)
        clearDeleteData();
    }
    // xóa user
    const _deleteUser = async () =>{
        let res = await deleteUser(id)
        if(res.status === 200)
        {
            handleClose();
            setID('')
            setEmail('');
            setFirstName('');
            setLastName('');
            toast.error('One user deleted');
            refreshPage();
        }
        else{
            toast.error('something wrong')
        }
    }

  return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete A User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>ID: {id}</p>
            <p>Email: {email}</p>
            <p>FName: {firstname}</p>
            <p>LastName: {lastname}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={_deleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default ModelDeleteUser;