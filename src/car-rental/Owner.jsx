import React, { lazy, Suspense, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
// import OwnerRequestedTable from "../tables/OwnerRequestedTable";

// Lazy Loading for requested list --by earl
const OwnerVehiclesTable = lazy(() => import('../tables/OwnerVehiclesTable'));

function Owner() {
    const userDetails = useSelector((state) => state.user)
    const userId = useParams();
    const dispatch = useDispatch();
    const [showEditModal, setShowEditModal] = useState(false);
    const [newCar, setNewCar] = useState({});

    const handleAdd = () => {
        setShowEditModal(true);
    }
    
    const closeModal = () => {
        setShowEditModal(false);
    }

    const handleEditConfirm = () => {
        axios.post('http://localhost:3000/AgencyVehicles/', {
            ...newCar,
            Available: newCar.TotalQuantity
        })
        setShowEditModal(false);
        window.location.reload();
    }

    const onChangeAdd = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setNewCar({
            ...newCar,
            [name]: value
        })
    }

    console.log(newCar)
    return (
        <div className="App">
            <div className="m-5 row">
                <div className="mb-3 col-9" align='left'>
                    <h5>Welcome Owner</h5>
                </div>
                <div className="col-3" align='right'>
                    <Link to='/home' className="btn btn-secondary">Logout</Link>
                </div>
            </div>
            <div>
                <Suspense fallback={<h5>Loading.....</h5>}>
                    <OwnerVehiclesTable />
                </Suspense>
            </div>
            <div className="row m-5">
                <div className="col-6" align='left'>
                    <button className="btn btn-primary" onClick={handleAdd}>Add vehicle</button>
                </div>
                <div className="col-6" align='right'>
                    <Link to='/requestlist' className="btn btn-secondary">Go to Customer Requested List {">>"}</Link>
                </div>
            </div>
            {/* Modal for adding vehicles */}
            <Modal
                show={showEditModal}
                onHide={closeModal}
                backdrop="static"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                keyboard={false}
            >
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className='form-floating col-4' align='left'>
                        <select type="text" 
                            className='form-select'
                            placeholder='Vehicle Type'
                            name='VehicleType'
                            onChange={onChangeAdd}
                        >
                            <option defaultValue={''}>Please select</option>
                            <option value={'Car Type'}>Car</option>
                            <option value={'SUV Type'}>SUV</option>
                            <option value={'Mini-Van Type'}>Mini Van</option>
                            <option value={'Bus Type'}>Bus</option>
                        </select>
                        <label className="ms-3">Vehicle Type</label>
                    </div>
                    <div className='form-floating col-4 mb-3' align='left'>
                        <input type="text" 
                            className='form-control'
                            placeholder='Brand'
                            name='Brand'
                            onChange={onChangeAdd}
                        />
                        <label className="ms-3">Brand</label>
                    </div>
                    <div className='form-floating col-4 mb-3' align='left'>
                        <input type="number" 
                            className='form-control'
                            placeholder='Quantity'
                            name='TotalQuantity'
                            onChange={onChangeAdd}
                        />
                        <label className="ms-3">Quantity</label>
                    </div>
                    <div align='right'>
                        {/* <button className="btn btn-primary" onClick={() => dispatch({type: 'ADD', payload: newCar})}>Add Vehicle</button>&nbsp; */}
                        <button className="btn btn-primary" onClick={handleEditConfirm}>Add Vehicle</button>&nbsp;
                        <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </Modal.Body>
            </Modal>
            {/* Modal */}
        </div>
    )
}

export default Owner