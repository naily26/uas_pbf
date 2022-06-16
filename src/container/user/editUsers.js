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
export default class editUsers extends Component {
    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.editUserModal}
                    toggle={this.props.toggleEditUserModal}
                >
                    <ModalHeader toggle={this.props.toggleEditUserModal}>
                        Update User
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">Nama User</Label>
                            <Input
                                id="name"
                                name="name"
                                value={this.props.editUserData.name}
                                onChange={this.props.onChangeEditUserHanler}
                            />
                        </FormGroup>
                        <FormGroup>
                             <Label for="alamat_pengguna">Alamat</Label>
                            <Input
                                id="alamat_pengguna"
                                name="alamat_pengguna"
                                value={this.props.editUserData.alamat_pengguna}
                                onChange={this.props.onChangeEditUserHanler}
                            />
                        </FormGroup>
                        <FormGroup>
                           <Label for="no_hp">No Hp</Label>
                            <Input
                                id="no_hp"
                                name="no_hp"
                                type="number"
                                value={this.props.editUserData.no_hp}
                                onChange={this.props.onChangeEditUserHanler}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={this.props.updateUser}
                        >
                            Update
                        </Button>
                        <Button
                            color="secondary"
                            onClick={this.props.toggleEditUserModal}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}