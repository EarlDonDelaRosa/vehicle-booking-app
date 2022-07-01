import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { Form, Field } from 'formik';
import UserTable from "../tables/UserTable";

function Customer({errors, touched, isValid, dirty}) {
    const dispatch = useDispatch();
    const [booking, setBooking] = useState({});


    // To disable previous date --by earl
    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    return (
        <div className="App">
            <div className="m-5 row">
                <div className="mb-3 col-9" align='left'>
                    <h5>Welcome Customer</h5>
                </div>
                <div className="col-3" align='right'>
                    <Link to='/home' className="btn btn-secondary">Logout</Link>
                </div>
            </div>
            <Form className="m-5">
                <div className="mb-3" align='left'>
                    <h4>Book a vehicle</h4>
                </div>
                <div className="row">
                    <div className='form-floating col-4 mb-3' align='left'>
                        <Field as="select"
                            className='form-select'
                            placeholder='Vehicle Type'
                            name='VehicleType'
                            // onChange={onChangeBooking}
                        >
                            <option defaultValue={''}>Please select</option>
                            <option value={'Car Type'}>Car</option>
                            <option value={'SUV Type'}>SUV</option>
                            <option value={'Mini-Van Type'}>Mini Van</option>
                            <option value={'Bus Type'}>Bus</option>
                        </Field>
                        <label className="ms-3">Vehicle Type</label>
                        {
                            touched.VehicleType && 
                            errors.VehicleType &&
                            <small className="ms-2 txt-danger">{ errors.VehicleType }</small>
                        }
                    </div>
                    <div className='form-floating col-4' align='left'>
                        <Field type="text" 
                            className='form-control'
                            placeholder='Brand'
                            name='Brand'
                            // onChange={onChangeBooking}
                        />
                        <label className="ms-3">Brand</label>
                        {
                            touched.Brand && 
                            errors.Brand &&
                            <small className="ms-2 txt-danger">{ errors.Brand }</small>
                        }
                    </div>
                    <div className='form-floating col-4' align='left'>
                        <Field type="number" 
                            className='form-control'
                            placeholder='Quantity'
                            name='VehicleRented'
                            // onChange={onChangeBooking}
                        />
                        <label className="ms-3">Quantity</label>
                        {
                            touched.VehicleRented && 
                            errors.VehicleRented &&
                            <small className="ms-2 txt-danger">{ errors.VehicleRented }</small>
                        }
                    </div>
                </div>
                <div className="row mb-3">
                    <div className='form-floating col-4 mb-3' align='left'>
                        <Field type="date" 
                            className='form-control'
                            placeholder='Start Date'
                            name='StartDate'
                            // onChange={onChangeBooking}
                            // min={disablePastDate()}
                        />
                        <label className="ms-3">Start Date</label>
                        {
                            touched.StartDate && 
                            errors.StartDate &&
                            <small className="ms-2 txt-danger">{ errors.StartDate }</small>
                        }
                    </div>
                    <div className='form-floating col-4 mb-3' align='left'>
                        <Field type="date" 
                            className='form-control'
                            placeholder='End Date'
                            name='EndDate'
                            // onChange={onChangeBooking}
                            // min={disablePastDate()}
                        />
                        <label className="ms-3">Start Date</label>
                        {
                            touched.EndDate && 
                            errors.EndDate &&
                            <small className="ms-2 txt-danger">{ errors.EndDate }</small>
                        }
                    </div>
                    <div align='left'>
                        <button className="btn btn-primary" 
                            disabled={!isValid || !dirty}
                        >Request Car Booking
                        </button>
                        {/* <button className="btn btn-primary" 
                            onClick={() => dispatch({type: 'BOOK', payload: booking})}
                        >Request Car Booking
                        </button> */}
                    </div>
                </div>
            </Form>
            <div>
                <UserTable />
            </div>
        </div>
    )
}

export default Customer