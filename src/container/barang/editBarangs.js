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
export default class editBarangs extends Component {
    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.editBarangModal}
                    toggle={this.props.toggleEditBarangModal}
                >
                    <ModalHeader toggle={this.props.toggleEditBarangModal}>
                        Update Barang
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">nama</Label>
                            <Input
                                id="name"
                                name="name"
                                value={this.props.editBarangData.name}
                                onChange={this.props.onChangeEditBarangHanler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="harga_barang">harga</Label>
                            <Input
                                id="harga_barang"
                                name="harga_barang"
                                value={this.props.editBarangData.harga_barang}
                                onChange={this.props.onChangeEditBarangHanler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="stock">stock</Label>
                            <Input
                                id="stock"
                                name="stock"
                                value={this.props.editBarangData.stock}
                                onChange={this.props.onChangeEditBarangHanler}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={this.props.updateBarang}
                        >
                            Update
                        </Button>
                        <Button
                            color="secondary"
                            onClick={this.props.toggleEditBarangModal}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}