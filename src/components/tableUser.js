import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import {fetchAllUser} from "../services/user";
import ReactPaginate from 'react-paginate'
import ModelAddNewUser from './ModelAddNewUSer';
import ModelUpdateAUser from './modelUpdateUser';
import ModelDeleteUser from "./ModelDeleteUser";

const TableUser = (props) => {

    const [listUsers, setListUsers] = useState([]);
    const [dataUpdateUser, setDataUpdateUser] = useState([]);
    const [dataDeleteUser, setDataDeleteUser] = useState([]);
    //const [totalUser, setTotalUser] = useState([]);
    const [totalPage, setTotalPage] = useState([]);
    const [isShowModalAddNewUser, setIsShowModalAddNewUSer] = useState(false);
    const [currenpage, setCurentPage] = useState(1)

    useEffect(() => {
        getUsers(currenpage);
    }, [currenpage])


    
    
    const clearUpdateData = () =>{
        setDataUpdateUser([])
    }

    const clearDeleteData = () =>{
        setDataDeleteUser([])
    }

    const handleClose = () =>{
        setIsShowModalAddNewUSer(false)
    }

    const  getUsers = async (page) => {
        let res =  await fetchAllUser(page);
        if(res && res.data && res.data.userInPageX)
        {
            setListUsers(res.data.userInPageX)
            setTotalPage(res.data.totalPage)
        }
    }

    const refreshPage = () => {
        getUsers(currenpage);
    }

    const handlePageClick = (event) => {
        setCurentPage(event.selected + 1);
    }


    const updateUserOnClick = (item) =>{
        setDataUpdateUser(item);
    }

    const deleteUserOnClick = (item) =>
    {
        setDataDeleteUser(item);
    }


    return (
        <>
        <div className='d-flex justify-content-between'>
          <span>List Users</span>
          <button className='btn btn-success' onClick={() => setIsShowModalAddNewUSer(true)}>Add New User</button>
        </div>
        <Table striped="columns">
            <thead>
                <tr>
                <th>ID</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    listUsers.map((item, index) => {
                        return (
                            <tr key = {item._id}>
                                <td>{item._id}</td>
                                <td>{item.Email}</td>
                                <td>{item.FirstName}</td>
                                <td>{item.LastName}</td>
                                <td>
                                    <button className="btn btn-warning mx-3" onClick={() => updateUserOnClick(item)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => deleteUserOnClick(item)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
                
                
            </tbody>
            
        </Table>
        <ReactPaginate
        breakLabel="..."
        nextLabel="next->"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={+totalPage}
        previousLabel="<-previous"

        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
        <ModelAddNewUser
        show = {isShowModalAddNewUser}
        handleClose = {handleClose}
        refreshPage = {refreshPage}
      />

      <ModelUpdateAUser
      clearUpdateData = {clearUpdateData}
      refreshPage = {refreshPage}
      data = {dataUpdateUser}
      />
      <ModelDeleteUser 
      clearDeleteData = {clearDeleteData}
      refreshPage = {refreshPage}
      data = {dataDeleteUser}
      />

        </>
    )
}

export default TableUser; 