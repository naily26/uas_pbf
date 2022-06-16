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
export default class editPeminjamans extends Component {
    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.editPeminjamanModal}
                    toggle={this.props.toggleEditPeminjamanModal}
                >
                    <ModalHeader toggle={this.props.toggleEditPeminjamanModal}>
                        Update Peminjaman
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">ID Peminjam</Label>
                            <Input
                                id="user_id"
                                name="user_id"
                                value={this.props.editPeminjamanData.user_id}
                                onChange={this.props.onChangeEditPeminjamanHanler}
                            />
                        </FormGroup>
                         <FormGroup>
                            <Label for="name">ID Barang yang di pinjam</Label>
                            <Input
                                id="barang_id"
                                name="barang_id"
                                value={this.props.editPeminjamanData.barang_id}
                                onChange={this.props.onChangeEditPeminjamanHanler}
                            />
                        </FormGroup>
                        <FormGroup>
                             <Label for="start_date">Tanggal Mulai</Label>
                            <Input
                                id="start_date"
                                name="start_date"
                                type="date"
                                value={this.props.editPeminjamanData.start_date}
                                onChange={this.props.onChangeEditPeminjamanHanler}
                            />
                        </FormGroup>
                        <FormGroup>
                           <Label for="end_date">Tanggal Akhir</Label>
                            <Input
                                id="end_date"
                                name="end_date"
                                type="date"
                                value={this.props.editPeminjamanData.end_date}
                                onChange={this.props.onChangeEditPeminjamanHanler}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={this.props.updatePeminjaman}
                        >
                            Update
                        </Button>
                        <Button
                            color="secondary"
                            onClick={this.props.toggleEditPeminjamanModal}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}