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
export default class addBarangs extends Component {
    render() {
        return (
            <div>
                <Button
                    className="float-right mb-4"
                    color="primary"
                    onClick={this.props.toggleNewBarangModal}
                >
                    Add Barang
                </Button>
                <Modal
                    isOpen={this.props.newBarangModal}
                    toggle={this.props.toggleNewBarangModal}
                >
                    <ModalHeader toggle={this.props.toggleNewBarangModal}>
                        Add new Barang
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="name">NAma BArang</Label>
                            <Input
                                id="name"
                                name="name"
                                value={this.props.newBarangData.name}
                                onChange={this.props.onChangeAddBarangHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="harga_barang">Harga</Label>
                            <Input
                                id="harga_barang"
                                name="harga_barang"
                                value={this.props.newBarangData.harga_barang}
                                onChange={this.props.onChangeAddBarangHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="stock">stock</Label>
                            <Input
                                id="stock"
                                name="stock"
                                value={this.props.newBarangData.stock}
                                onChange={this.props.onChangeAddBarangHandler}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="gambar">gambar</Label>
                            <Input
                                id="gambar"
                                name="gambar"
                                value={this.props.newBarangData.gambar}
                                onChange={this.props.onChangeAddBarangHandler}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() =>
                            this.props.addBarang()}>
                            Add
                        </Button>{" "}
                        <Button color="secondary"
                            onClick={this.props.toggleNewBarangModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}