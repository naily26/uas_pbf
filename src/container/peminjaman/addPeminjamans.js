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
export default class addPeminjamans extends Component {
    render() {
        return (
            <div>
                <Button
                    className="float-right mb-4"
                    color="primary"
                    onClick={this.props.toggleNewPeminjamanModal}
                >
                    Add Peminjaman
                </Button>
                <Modal
                    isOpen={this.props.newPeminjamanModal}
                    toggle={this.props.toggleNewPeminjamanModal}
                >
                    <ModalHeader toggle={this.props.toggleNewPeminjamanModal}>
                        Add new Peminjaman
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">ID Peminjam</Label>
                            <Input
                                id="user_id"
                                name="user_id"
                                value={this.props.newPeminjamanData.user_id}
                                onChange={this.props.onChangeAddPeminjamanHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="name">ID Barang yang di pinjam</Label>
                            <Input
                                id="barang_id"
                                name="barang_id"
                                value={this.props.newPeminjamanData.barang_id}
                                onChange={this.props.onChangeAddPeminjamanHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="start_date">Tanggal Mulai</Label>
                            <Input
                                id="start_date"
                                name="start_date"
                                type="date"
                                value={this.props.newPeminjamanData.start_date}
                                onChange={this.props.onChangeAddPeminjamanHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="end_date">Tanggal Akhir</Label>
                            <Input
                                id="end_date"
                                name="end_date"
                                type="date"
                                value={this.props.newPeminjamanData.end_date}
                                onChange={this.props.onChangeAddPeminjamanHandler}
                            />
                        </FormGroup>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() =>
                            this.props.addPeminjaman()}>
                            Add
                        </Button>{" "}
                        <Button color="secondary"
                            onClick={this.props.toggleNewPeminjamanModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}