//import axios from "axios"
import axios from "../services/axios"

const fetchAllUser = (page) => {
    return axios.get(`/users/${page}`);
}

const postCreateUser = (_email, _fname, _lname) =>{
    return axios.post('/user', {Email: _email, FirstName: _fname, LastName: _lname});
}

const fetchUserByID = (id) => {
    return axios.get(`/users/${id}`)[0];
}

const updateUser = (_id, _email, _fname, _lname) =>{
    return axios.patch('/user', {ID: _id, Email: _email, FirstName: _fname, LastName: _lname})
}

const deleteUser = (_id) =>{
    return axios.delete(`/user/${_id}`)
}

export {fetchAllUser,  postCreateUser, fetchUserByID, updateUser, deleteUser};