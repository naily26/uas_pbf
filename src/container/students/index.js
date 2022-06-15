import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import AddBarangs from './addBarangs';
import EditBarangs from './editBarangs';
export default class Barang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Barangs: [],
            newBarangData: {
                name: "",
                harga_barang: "",
               stock: ""
            },
            isLoading: false,
            status: "",
            newBarangModal: false,
            editBarangData: {
                id: "",
                name: "",
                harga_barang: "",
               stock: "",
            },
            editBarangModal: false,
            noDataFound: "",
        };
    }
    componentDidMount() {
        this.getBarangs();
    }
    getBarangs() {
        axios.get("http://localhost:8000/api/barang_all").then((response) => {
            if (response.status === 200) {
                this.setState({
                    Barangs: response.data.data ? response.data.data : [],
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
    toggleNewBarangModal = () => {
        this.setState({
            newBarangModal: !this.state.newBarangModal,
        });
    };
    onChangeAddBarangHandler = (e) => {
        let { newBarangData } = this.state;
        newBarangData[e.target.name] = e.target.value;
        this.setState({ newBarangData });
    };
    addBarang = () => {
        axios
            .post(
                "http://localhost:8000/api/barang_insert",
                this.state.newBarangData
            )
            .then((response) => {
                const { Barangs } = this.state;
                const newBarangs = [...Barangs];
                newBarangs.push(response.data);
                this.setState(
                    {
                        Barangs: newBarangs,
                        newBarangModal: false,
                        newBarangData: {
                            name: "",
                            harga_barang: "",
                           stock: "",
                        },
                    },
                    () => this.getBarangs()
                );
            });
    };
    toggleEditBarangModal = () => {
        this.setState({
            editBarangModal: !this.state.editBarangModal,
        });
    };
    onChangeEditBarangHanler = (e) => {
        let { editBarangData } = this.state;
        editBarangData[e.target.name] = e.target.value;
        this.setState({ editBarangData });
    };
    editBarang = (id, name, harga_barang,stock) => {
        this.setState({
            editBarangData: { id, name, harga_barang,stock},
            editBarangModal: !this.state.editBarangModal,
        });
    };

    updateBarang = () => {
        let {
            id,
            name,
            harga_barang,
           stock,
        } = this.state.editBarangData;
        this.setState({
            isLoading: true,
        });
        axios
            .post("http://localhost:8000/api/barang_update", {
                name,
                harga_barang,
               stock,
                id,
            })
            .then((response) => {
                this.getBarangs();
                this.setState({
                    editBarangModal: false,
                    editBarangData: { name, harga_barang,stock},
                    isLoading: false,
                });
            })
            .catch((error) => {
                this.setState({ isLoading: false })
                console.log(error.response);
            });
    };

    deletBarang = (id) => {
        this.setState({
            isLoading: true,
        });
        axios
            .delete("http://localhost:8000/api/Barang/" + id)
            .then((response) => {
                this.setState({
                    isLoading: false,
                });
                this.getBarangs();
            })
            .catch((error) => {
                this.setState({
                    isLoading: false,
                });
            });
    };

    render() {
        const { newBarangData, editBarangData, noDataFound, Barangs } =
            this.state;
        let BarangsDetails = [];
        if (Barangs.length) {
            BarangsDetails = Barangs.map((Barang) => {
                return (
                    <tr key={Barang.id}>
                        <td>{Barang.id}</td>
                        <td>{Barang.name}</td>
                        <td>{Barang.harga_barang}</td>
                        <td>{Barang.stock}</td>
                        <td>
                            <Button
                                color="success"
                                className="mr-3"
                                size="sm"
                                onClick={() =>
                                    this.editBarang(
                                        Barang.id,
                                        Barang.name,
                                        Barang.harga_barang,
                                        Barang.stock,
                                    )
                                }
                            >
                                Edit
                            </Button>
                            <Button
                                color="danger"
                                size="sm"
                                onClick={() => this.deletBarang(Barang.id)}
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
                <h4 className="font-weight-bold">Barangs Registration</h4>
                {/* Model for Add Studnet Record */}
                <AddBarangs
                    toggleNewBarangModal={this.toggleNewBarangModal}
                    newBarangModal={this.state.newBarangModal}
                    onChangeAddBarangHandler={this.onChangeAddBarangHandler}
                    addBarang={this.addBarang}
                    newBarangData={newBarangData}
                />
                {/* Model for Edit Studnet Record */}
                <EditBarangs
                    toggleEditBarangModal={this.toggleEditBarangModal}
                    editBarangModal={this.state.editBarangModal}
                    onChangeEditBarangHanler={this.onChangeEditBarangHanler}
                    editBarang={this.editBarang}
                    editBarangData={editBarangData}
                    updateBarang={this.updateBarang}
                />
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>nama</th>
                            <th>harga barang</th>
                            <th>stok</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {Barangs.length === 0 ? (
                        <tbody>
                            <h3>{noDataFound}</h3>
                        </tbody>
                    ) : (
                        <tbody>{BarangsDetails}</tbody>
                    )}
                </Table>
            </div>
        );
    }
}