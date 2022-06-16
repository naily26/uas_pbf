import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import AddUsers from './addUsers';
import EditUsers from './editUsers';
export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Users: [],
            newUserData: {
                name: "",
                alamat_pengguna: "",
               no_hp: ""
            },
            isLoading: false,
            status: "",
            newUserModal: false,
            editUserData: {
                id: "",
                name: "",
                alamat_pengguna: "",
               no_hp: "",
            },
            editUserModal: false,
            noDataFound: "",
        };
    }
    componentDidMount() {
        this.getUsers();
    }
    getUsers() {
        axios.get("http://localhost:8000/api/pengguna_all").then((response) => {
            if (response.status === 200) {
                this.setState({
                    Users: response.data.data ? response.data.data : [],
                });
            }
            if (
                response.data.status === "failed" &&
                response.data.success === false
            ) {
                this.setState({
                    noDataFound: response.data.message,
                });
            }
        });
    }
    toggleNewUserModal = () => {
        this.setState({
            newUserModal: !this.state.newUserModal,
        });
    };
    onChangeAddUserHandler = (e) => {
        let { newUserData } = this.state;
        newUserData[e.target.name] = e.target.value;
        this.setState({ newUserData });
    };
    addUser = () => {
        axios
            .post(
                "http://localhost:8000/api/pengguna_insert",
                this.state.newUserData
            )
            .then((response) => {
                const { Users } = this.state;
                const newUsers = [...Users];
                newUsers.push(response.data);
                this.setState(
                    {
                        Users: newUsers,
                        newUserModal: false,
                        newUserData: {
                            name: "",
                            alamat_pengguna: "",
                           no_hp: "",
                        },
                    },
                    () => this.getUsers()
                );
            });
    };
    toggleEditUserModal = () => {
        this.setState({
            editUserModal: !this.state.editUserModal,
        });
    };
    onChangeEditUserHanler = (e) => {
        let { editUserData } = this.state;
        editUserData[e.target.name] = e.target.value;
        this.setState({ editUserData });
    };
    editUser = (id, name, alamat_pengguna,no_hp) => {
        this.setState({
            editUserData: { id, name, alamat_pengguna,no_hp},
            editUserModal: !this.state.editUserModal,
        });
    };

    updateUser = () => {
        let {
            id,
            name,
            alamat_pengguna,
           no_hp,
        } = this.state.editUserData;
        this.setState({
            isLoading: true,
        });
        axios
            .post("http://localhost:8000/api/pengguna_update", {
                name,
                alamat_pengguna,
               no_hp,
                id,
            })
            .then((response) => {
                this.getUsers();
                this.setState({
                    editUserModal: false,
                    editUserData: { name, alamat_pengguna,no_hp},
                    isLoading: false,
                });
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                console.log(error.response);
            });
    };

    deletUser = (id) => {
        this.setState({
            isLoading: true,
        });
        axios
            .delete("http://localhost:8000/api/pengguna_delete/" + id)
            .then((response) => {
                this.setState({
                    isLoading: false,
                });
                this.getUsers();
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
            });
    };

    render() {
        const { newUserData, editUserData, noDataFound, Users } =
            this.state;
        let UsersDetails = [];
        if (Users.length) {
            UsersDetails = Users.map((User) => {
                return (
                    <tr key={User.id}>
                        <td>{User.id}</td>
                        <td>{User.name}</td>
                        <td>{User.alamat_pengguna}</td>
                        <td>{User.no_hp}</td>
                        <td>
                            <Button
                                color="success"
                                className="mr-3"
                                size="sm"
                                onClick={() =>
                                    this.editUser(
                                        User.id,
                                        User.name,
                                        User.alamat_pengguna,
                                        User.no_hp,
                                    )
                                }
                            >
                                Edit
                            </Button>
                            <Button
                                color="danger"
                                size="sm"
                                onClick={() => this.deletUser(User.id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                );
            });
        }

        if (this.state.isLoading) {
            return <div className="spinner-border text-center" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        }
        return (
            <div className="App container mt-4">
                <h4 className="font-weight-bold">Users Registration</h4>
                {/* Model for Add Studnet Record */}
                <AddUsers
                    toggleNewUserModal={this.toggleNewUserModal}
                    newUserModal={this.state.newUserModal}
                    onChangeAddUserHandler={this.onChangeAddUserHandler}
                    addUser={this.addUser}
                    newUserData={newUserData}
                />
                {/* Model for Edit Studnet Record */}
                <EditUsers
                    toggleEditUserModal={this.toggleEditUserModal}
                    editUserModal={this.state.editUserModal}
                    onChangeEditUserHanler={this.onChangeEditUserHanler}
                    editUser={this.editUser}
                    editUserData={editUserData}
                    updateUser={this.updateUser}
                />
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>nama</th>
                            <th>alamaat pengguna</th>
                            <th>no hp</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {Users.length === 0 ? (
                        <tbody>
                            <h3>{noDataFound}</h3>
                        </tbody>
                    ) : (
                        <tbody>{UsersDetails}</tbody>
                    )}
                </Table>
            </div>
        );
    }
}