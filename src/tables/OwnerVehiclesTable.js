import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { allVehicles } from "../redux/actions/actions";
import { Modal, Button } from "react-bootstrap";
import useHooks from "../hooks/useHooks";

const OwnerVehiclesTable = () => {
    const URL = 'http://localhost:3000/AgencyVehicles/'
    const vehicles = useSelector((state) => state.cars.cars);
    const car = useSelector((state) => state.selectedcar);
    const dispatch = useDispatch();
    const [showEditModal, setShowEditModal] = useState(false);
    const [field, setField] = useState({});
    const [carId, setcarId] = useState('');
    const [cars, setCars] = useState({});
    const [show, setShow] = useState(false);
    const {
        search,
        onChangeSearch,
        showRemoveModal
    } = useHooks();
    console.log(car)

    // Fetching requested car list from data.json --by earl
    const fetchVehicles = async () => {
        const response = await axios
        .get('http://localhost:3000/AgencyVehicles/')
        .catch((error) => {
            console.error(error);
        })
        dispatch(allVehicles(response.data));
        setCars(response.data)
        
        setShow(true)
    }

    useEffect(() => {
        fetchVehicles();
    }, [])

    const handleEditModal = (item) => {
        console.log(item)
        setShowEditModal(true);
        setField(item)
    }
    console.log(carId)

    const closeModal = () => {
        setShowEditModal(false);
    }

    const handleEditConfirm = () => {
        axios.patch(`${URL}${field.id}`, {
            ...field
        })
        setShowEditModal(false);
        window.location.reload();
    }

    const onChangeEdit = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setField({
            ...field,
            [name]: value
        })
    }

    console.log(field)
    return (
        <div className="App">
            <div className="form-floating m-3 mx-5">
                <input type="text" 
                    className="form-control col-8"
                    placeholder="Search for products"
                    name="search"
                    value={search}
                    onChange={onChangeSearch}
                    autoComplete='off'
                />
                <label align='left'>Search for vehicles</label>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="p-3 txt-ctr">Vehicle Types</th>
                        <th className="p-3 txt-ctr">Brands</th>
                        <th className="p-3 txt-ctr">Total Owned</th>
                        <th className="p-3 txt-ctr">Available Cars</th>
                        <th className="p-3 txt-ctr">Actions</th>
                    </tr>
                </thead>
                <tbody>
                { show ? 
                    (<>
                    {
                        cars.filter((item) => {
                            if (search == '') {
                                return item
                            } else if (item.Brand.toLowerCase().includes(search.toLowerCase())) {
                                return item
                            } else if (item.VehicleType.toLowerCase().includes(search.toLowerCase())) {
                                return item
                            }
                        }).map((item, idx) => (
                            <tr key={idx}>
                                <td className="p-3 txt-ctr">{ item.VehicleType }</td>
                                <td className="p-3 txt-ctr">{ item.Brand }</td>
                                <td className="p-3 txt-ctr">{ item.TotalQuantity }</td>
                                <td className="p-3 txt-ctr">{ item.Available }</td>
                                <td className="txt-ctr">
                                    <button className="btn btn-primary"
                                        onClick={() => handleEditModal(item)}
                                        >Edit
                                    </button>&nbsp;
                                    <button className="btn btn-danger"
                                        onClick={() => dispatch({type: 'REMOVE', payload: item})}
                                        >Remove
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </>)
                    :
                    (
                        null
                    )
                }
                </tbody>
            </table>
            {/* Modal for editing cars */}
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
                            onChange={onChangeEdit}
                            value={field.VehicleType}
                        >
                            <option defaultValue={''}>Please select</option>
                            <option value='Car Type'>Car</option>
                            <option value='SUV Type'>SUV</option>
                            <option value='Mini-Van Type'>Mini Van</option>
                            <option value='Bus Type'>Bus</option>
                        </select>
                        <label className="ms-3">Vehicle Type</label>
                    </div>
                    <div className='form-floating col-4 mb-3' align='left'>
                        <input type="text" 
                            className='form-control'
                            placeholder='Brand'
                            name='Brand'
                            onChange={onChangeEdit}
                            value={field.Brand}
                        />
                        <label className="ms-3">Brand</label>
                    </div>
                    <div className='form-floating col-4 mb-3' align='left'>
                        <input type="number" 
                            className='form-control'
                            placeholder='Quantity'
                            name='TotalQuantity'
                            onChange={onChangeEdit}
                            value={field.TotalQuantity}
                        />
                        <label className="ms-3">Quantity</label>
                    </div>
                    <div align='right'>
                        <button className="btn btn-primary" onClick={handleEditConfirm}>Register</button>&nbsp;
                        <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </Modal.Body>
            </Modal>
            {/* Modal */}
        </div>
    )
}

export default OwnerVehiclesTable