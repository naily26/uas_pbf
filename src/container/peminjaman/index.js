import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import AddPeminjamans from './addPeminjamans';
import EditPeminjamans from './editPeminjamans';
export default class Peminjaman extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Peminjamans: [],
            newPeminjamanData: {
                user_id:"",
                barang_id:"",
                start_date: "",
                end_date: ""
            },
            isLoading: false,
            status: "",
            newPeminjamanModal: false,
            editPeminjamanData: {
                id: "",
                user_id:"",
                barang_id:"",
                start_date: "",
               end_date: "",
            },
            editPeminjamanModal: false,
            noDataFound: "",
        };
    }
    componentDidMount() {
        this.getPeminjamans();
    }
    getPeminjamans() {
        axios.get("http://localhost:8000/api/peminjaman_all").then((response) => {
            if (response.status === 200) {
                this.setState({
                    Peminjamans: response.data.data ? response.data.data : [],
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
    toggleNewPeminjamanModal = () => {
        this.setState({
            newPeminjamanModal: !this.state.newPeminjamanModal,
        });
    };
    onChangeAddPeminjamanHandler = (e) => {
        let { newPeminjamanData } = this.state;
        newPeminjamanData[e.target.name] = e.target.value;
        this.setState({ newPeminjamanData });
    };
    addPeminjaman = () => {
        axios
            .post(
                "http://localhost:8000/api/peminjaman_insert",
                this.state.newPeminjamanData
            )
            .then((response) => {
                if (response.data.status === "failed" && response.data.success === false) {
                    alert(response.data.message);
                }
                const { Peminjamans } = this.state;
                const newPeminjamans = [...Peminjamans];
                newPeminjamans.push(response.data);
                this.setState(
                    {
                        Peminjamans: newPeminjamans,
                        newPeminjamanModal: false,
                        newPeminjamanData: {
                            user_id:"",
                            barang_id:"",
                            start_date: "",
                            end_date: "",
                        },
                    },
                    () => this.getPeminjamans()
                );
            });
    };
    toggleEditPeminjamanModal = () => {
        this.setState({
            editPeminjamanModal: !this.state.editPeminjamanModal,
        });
    };
    onChangeEditPeminjamanHanler = (e) => {
        let { editPeminjamanData } = this.state;
        editPeminjamanData[e.target.name] = e.target.value;
        this.setState({ editPeminjamanData });
    };
    editPeminjaman = (id,user_id,barang_id,start_date,end_date) => {
        this.setState({
            editPeminjamanData: { id,user_id,barang_id,start_date,end_date},
            editPeminjamanModal: !this.state.editPeminjamanModal,
        });
    };

    updatePeminjaman = () => {
        let {
            id,
            barang_id,
            user_id,
            start_date,
            end_date,
        } = this.state.editPeminjamanData;
        this.setState({
            isLoading: true,
        });
        axios
            .post("http://localhost:8000/api/peminjaman_update", {
                start_date,
               end_date,
                barang_id,
                user_id,
                id,
            })
            .then((response) => {
                this.getPeminjamans();
                this.setState({
                    editPeminjamanModal: false,
                    editPeminjamanData: { barang_id,user_id, start_date,end_date},
                    isLoading: false,
                });
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                console.log(error.response);
            });
    };

    deletPeminjaman = (id) => {
        this.setState({
            isLoading: true,
        });
        axios
            .delete("http://localhost:8000/api/peminjaman_delete/" + id)
            .then((response) => {
                this.setState({
                    isLoading: false,
                });
                this.getPeminjamans();
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
            });
    };

    updateKembaliBeh = (id) => {
        this.setState({
            isLoading: true,
        });
        axios
            .get("http://localhost:8000/api/trans_peminjaman_update_kembali/" + id)
            .then((response) => {
                this.setState({
                    isLoading: false,
                });
                this.getPeminjamans();
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
            });
    };

    render() {
        const { newPeminjamanData, editPeminjamanData, noDataFound, Peminjamans } =
            this.state;
        let PeminjamansDetails = [];
        if (Peminjamans.length) {
            PeminjamansDetails = Peminjamans.map((Peminjaman) => {
                return (
                    <tr key={Peminjaman.id}>
                        <td>{Peminjaman.id}</td>
                        <td>{Peminjaman.nama_barang}</td>
                        <td>{Peminjaman.start_date}</td>
                        <td>{Peminjaman.end_date}</td>
                        <td>{Peminjaman.hari}</td>
                        <td>{Peminjaman.grandtotal}</td>
                        <td>{Peminjaman.status}</td>
                        <td>
                            <Button
                                color="success"
                                className="mr-3"
                                size="sm"
                               onClick={() => this.updateKembaliBeh(Peminjaman.id)}
                            >
                                Konfirmasi Kembali
                            </Button>
                            &nbsp;
                            <Button
                                color="danger"
                                size="sm"
                                onClick={() => this.deletPeminjaman(Peminjaman.id)}
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
                <h4 className="font-weight-bold">Peminjamans Registration</h4>
                {/* Model for Add Studnet Record */}
                <AddPeminjamans
                    toggleNewPeminjamanModal={this.toggleNewPeminjamanModal}
                    newPeminjamanModal={this.state.newPeminjamanModal}
                    onChangeAddPeminjamanHandler={this.onChangeAddPeminjamanHandler}
                    addPeminjaman={this.addPeminjaman}
                    newPeminjamanData={newPeminjamanData}
                />
                {/* Model for Edit Studnet Record */}
                <EditPeminjamans
                    toggleEditPeminjamanModal={this.toggleEditPeminjamanModal}
                    editPeminjamanModal={this.state.editPeminjamanModal}
                    onChangeEditPeminjamanHanler={this.onChangeEditPeminjamanHanler}
                    editPeminjaman={this.editPeminjaman}
                    editPeminjamanData={editPeminjamanData}
                    updatePeminjaman={this.updatePeminjaman}
                />
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>nama barang</th>
                            <th>tanggal mulai</th>
                            <th>tanggal akhir</th>
                            <th>Lama Hari</th>
                            <th>Grandtotal</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {Peminjamans.length === 0 ? (
                        <tbody>
                            <h3>{noDataFound}</h3>
                        </tbody>
                    ) : (
                        <tbody>{PeminjamansDetails}</tbody>
                    )}
                </Table>
            </div>
        );
    }
}