import { useEffect, useState } from "react";
import userService from "../services/userService";

import Pagination from "./Pagination";
import Search from "./Search";
import UserListItem from "./UserListItem";
import UserCreate from "./UserCreate";
import UserInfo from "./UserInfo";
import UserDelete from "./UserDelete";


export default function UserList() {
    const [users, setUsers] = useState([])
    const [showCreate, setShowCreate] = useState(false)
    const [userIdInfo, setUserIdInfo] = useState(null);
    const [userIdDelete, setUserIdDelete] = useState(null);
    const [userIdEdit, setUserIdEdit] = useState(null);

    useEffect(() => {
        userService.getAll()
            .then(result => {
                setUsers(result);
            })
    }, [])

    const createUserCkickHandler = () => {
        setShowCreate(true);
    };

    const closeCreateUserCkickHandler = () => {
        setShowCreate(false);
        setUserIdEdit(null);
    }

    const saveCreateUserClickHandler = async (e) => {
        // Stop default refresh behaviour
        e.preventDefault();

        // Get form data
        const formData = new FormData(e.target.parentElement.parentElement);
        const userData = Object.fromEntries(formData);

        // Create new user on server
        const newUser = await userService.create(userData)

        // Update local state
        setUsers(state => [...state, newUser])

        // close modal 
        setShowCreate(false);

    };

    const userInfoClickHandler = (userId) => {
        setUserIdInfo(userId);
    };

    const userInfoCloseHandler = () => {
        setUserIdInfo(null);
    };

    const userDeleteClickHandler = (userId) => {
        setUserIdDelete(userId)
    };

    const userDeleteCloseHandler = () => {
        setUserIdDelete(null);
    };

    const userDeleteHandler = async () => {
        // DELETE request from server
        await userService.delete(userIdDelete);

        // delete from local state
        setUsers(state => state.filter(user => user._id !== userIdDelete));

        // close modal
        setUserIdDelete(null);
    };

    const userEditClickHandler = (userId) => {
        setUserIdEdit(userId);
    };

    const saveEditUserClickHandler = async (e) => {
        const userId = userIdEdit;

        // Stop submit refresh
        e.preventDefault();

        // Get form data
        const formData = new FormData(e.target.parentElement.parentElement);
        const userData = Object.fromEntries(formData);

        // Update user on server
    const updatedUser = await userService.update(userId, userData);

        // Update local state
        setUsers(state => state.map(user => user._id === userId ? updatedUser : user))

        //Close modal
        setUserIdEdit(null);

    };

    return (
        <>
            <section className="card users-container">
                <Search />

                {showCreate && (
                    <UserCreate
                        onClose={closeCreateUserCkickHandler}
                        onSave={saveCreateUserClickHandler}
                        onEdit={saveEditUserClickHandler}

                    />)
                }

                {userIdInfo && (
                    <UserInfo
                        userId={userIdInfo}
                        onClose={userInfoCloseHandler}
                    />
                )}

                {userIdDelete &&
                    <UserDelete
                        onClose={userDeleteCloseHandler}
                        onDelete={userDeleteHandler}
                    />}

                {userIdEdit && (
                    <UserCreate
                        userId={userIdEdit}
                        onClose={closeCreateUserCkickHandler}
                        onSave={saveCreateUserClickHandler}
                        onEdit={saveEditUserClickHandler}
                    />
                )}

                {/* Table component */}
                <div className="table-wrapper">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>
                                    First name<svg aria-hidden="true" focusable="false" data-prefix="fas"
                                        data-icon="arrow-down" className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                        <path fill="currentColor"
                                            d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                        </path>
                                    </svg>
                                </th>
                                <th>
                                    Last name<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                        className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 384 512">
                                        <path fill="currentColor"
                                            d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                        </path>
                                    </svg>
                                </th>
                                <th>
                                    Email<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                        className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 384 512">
                                        <path fill="currentColor"
                                            d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                        </path>
                                    </svg>
                                </th>
                                <th>
                                    Phone<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-down"
                                        className="icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 384 512">
                                        <path fill="currentColor"
                                            d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                        </path>
                                    </svg>
                                </th>
                                <th>
                                    Created
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas"
                                        data-icon="arrow-down" className="icon active-icon svg-inline--fa fa-arrow-down Table_icon__+HHgn" role="img"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                        <path fill="currentColor"
                                            d="M374.6 310.6l-160 160C208.4 476.9 200.2 480 192 480s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 370.8V64c0-17.69 14.33-31.1 31.1-31.1S224 46.31 224 64v306.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0S387.1 298.1 374.6 310.6z">
                                        </path>
                                    </svg>
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Table row component */}
                            {users.map(user => <UserListItem
                                key={user._id}
                                onInfoClick={userInfoClickHandler}
                                onDeleteClick={userDeleteClickHandler}
                                onEditClick={userEditClickHandler}
                                {...user}
                            />)}

                        </tbody>
                    </table>
                </div>

                {/* New user button */}
                <button className="btn-add btn" onClick={createUserCkickHandler}>Add new user</button>

                <Pagination />
            </section>
        </>
    )
}