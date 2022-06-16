import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
} from "reactstrap";
export default class addUsers extends Component {
    render() {
        return (
            <div>
                <Button
                    className="float-right mb-4"
                    color="primary"
                    onClick={this.props.toggleNewUserModal}
                >
                    Add User
                </Button>
                <Modal
                    isOpen={this.props.newUserModal}
                    toggle={this.props.toggleNewUserModal}
                >
                    <ModalHeader toggle={this.props.toggleNewUserModal}>
                        Add new User
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Nama User</Label>
                            <Input
                                id="name"
                                name="name"
                                value={this.props.newUserData.name}
                                onChange={this.props.onChangeAddUserHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="alamat_pengguna">Alamat</Label>
                            <Input
                                id="alamat_pengguna"
                                name="alamat_pengguna"
                                value={this.props.newUserData.alamat_pengguna}
                                onChange={this.props.onChangeAddUserHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="no_hp">No Hp</Label>
                            <Input
                                id="no_hp"
                                name="no_hp"
                                type="number"
                                value={this.props.newUserData.no_hp}
                                onChange={this.props.onChangeAddUserHandler}
                            />
                        </FormGroup>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() =>
                            this.props.addUser()}>
                            Add
                        </Button>{" "}
                        <Button color="secondary"
                            onClick={this.props.toggleNewUserModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}