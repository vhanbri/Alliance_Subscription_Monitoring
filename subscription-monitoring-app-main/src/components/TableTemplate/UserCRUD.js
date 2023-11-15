import { useEffect, useState } from "react";

import { UserContext } from '../../providers/UserProvider';
import { useContext } from 'react'; 
import UserCrudServices from "../../services/UserCrudServices";
import {toast} from 'react-toastify'; 
import UserModal from "./UserModal";
import MyUserBoostrapTable from "./MyUserBoostrapTable";

const UserCRUD = () => {
    const { user } = useContext(UserContext);  

    const [Users, setUsers] = useState([]);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [role,setRole] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [idToDelete, setIdToDelete] = useState(null);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    
    const date = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    
    const handleEditUser = async (users) => {
      try {
          await UserCrudServices.update({ users });
          const index = Users.findIndex((u) => (u.id=Users.id));
          const newUsers = [...Users];
          newUsers[index] = {
            ...newUsers[index],
            viewed: true,
            
          };
          setUsers(newUsers);
      } catch (error) {
        
        toast.error(error.message);
      }
    };

    const handleAddUser = async (e) => {
      e.preventDefault();
      try {
          const response = await UserCrudServices.adduser({  firstName, lastName, email, password, confirmPassword,role });
          setUsers([...Users, response.data.data]);
      }catch (error) {
         toast.error(error.message);
      }
    };

    const handleDeleteUser = async (e,users) =>{
      e.stopPropagation();
      try{
        await UserCrudServices.delete({ id: users.id }); 
        const newUsers = Users.filter((u) => u.id !== users.id);
        setUsers(newUsers);

      } catch (error) {
        toast.error(error.message);
      }
    };

    useEffect(() => {
      (() => fetchUser())();
    }, []);

  const fetchUser = async () => {
      try{
            const response = await UserCrudServices.list({
              userId: user.uid,
              
            }); const users = response.data.data.map(user => ({
              id: user.id,
              name: `${user.firstName} ${user.lastName}`,
              email: user.email,
              role: user.role,
              firstName: user.firstName,
              lastName: user.lastName,
            }));
            setUsers(users);
            
     // fetch the notifications every 30 seconds}
    
      } catch (error) {
        toast.error(error.message);
      }

    };


    const userToShow = Users.filter(
      (user) =>
        searchTerm === "" ||
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const editUser = async (users) => {
    setId(users.id);
    setFirstName(users.firstName);
    setLastName(users.lastName);
    setEmail(users.email);
    setPassword(users.password);
  
    setRole(users.role);
   
  };

    const handleEditClick = (users) => {
      editUser(users);
      setIsEdit(true);
      
    }  
    const clearFields = async () => {
      // setUserId("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("");

    };
  
    const handleAddClick = () => {
      clearFields();
      setIsEdit(false);
    };
  
    const handleDeleteButtonClick = (id) => {
      setIdToDelete(id);
      setOpen(true);
    };
  
    const handleCancelDelete = () => {
      setIdToDelete(null);
      setOpen(false);
    };
  
    const handleConfirmDelete = () => {
      handleDeleteUser( idToDelete);
      setOpen(false);                         
    };


  return (
    <>
       <UserModal 
        id={id}
        setId={setId}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName} 
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        role={role}   
        setRole={setRole}
        handleAdd={handleAddUser}
        isEdit={isEdit}
        handleAddClick={handleAddClick}
        handleUpdate={handleEditUser}
        ></UserModal>
          <div className="card shadow">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h6 className="m-0 pl-3 font-weight-bold text-danger mr-4">
          All Users
          </h6>
          <button
            type="button"
            className="btn btn-primary mt-2 mr-4"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={handleAddClick}
          >
            Add
          </button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
           <MyUserBoostrapTable
              subs={Users}
              setSubs={setUsers}
              handleEditClick={handleEditClick}
              handleDeleteButtonClick={handleDeleteButtonClick}
              handleCancelDelete={handleCancelDelete}
              handleConfirmDelete={handleConfirmDelete}
              open={open}
              idToDelete={idToDelete}
              fetchData={fetchUser}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              itemsToShow={userToShow}
            ></MyUserBoostrapTable>

            {/* <SubTable
              itemsToShow={itemsToShow}
              date={date}
              handleEditClick={handleEditClick}
              handleDeleteButtonClick={handleDeleteButtonClick}
              idToDelete={idToDelete}
              handleCancelDelete={handleCancelDelete}
              handleConfirmDelete={handleConfirmDelete}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              open={open}
            ></SubTable> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCRUD
