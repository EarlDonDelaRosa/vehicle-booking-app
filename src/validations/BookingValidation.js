import React, { useState } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import Customer from "../car-rental/Customer";
import { useSelector } from "react-redux";

function BookingValidation() {
    const URL = 'http://localhost:3000/Requested/';
    const userBookings = useSelector((state) => state.cars.cars)
    const [bookings, setBookings] = useState({});
    console.log(userBookings)

    // Errors for incorrect input --by earl
    const ErrorSchema = Yup.object().shape({
        VehicleType: Yup.string()
            .required('VehicleType is required'),
        StartDate: Yup.date()
            .min(new Date(), 'No more slots for today')
            .required('StartDate is required'),
        EndDate: Yup.string()
            .required('EndDate is required'),
        Brand: Yup.string()
            .required('Brand is required'),
        VehicleRented: Yup.string()
            .required('Quantity is required')
    })

    // console.log(value)

    // Handle request a vehicle booking --by earl
    const handleBook = (value) => {
        let userId = localStorage.getItem('userId');
        axios.post(URL, {
            ...value,
            Status: 'Pending',
            userId: userId,
            requestId: userBookings.length + 1,
        })
        .then((res) => console.log(res))

        axios.post(`http://localhost:3000/userId${userId}/`, {
            ...value,
            Status: 'Pending',
            id: userBookings.length + 1,
            userId: userId,
            requestId: userBookings.length + 1,
        })
        .then((res) => console.log(res))
        document.location.reload()
    }

    // Formik validation --by earl
    return (
        <div>
            <Formik 
                initialValues={{
                    VehicleType: '',
                    Brand: '',
                    VehicleRented: '',
                    StartDate: '',
                    EndDate: ''
                }}
                onSubmit={(value) => {
                    handleBook(value)
                    console.log(value)
                }} 
                validationSchema={ErrorSchema}
                component={ Customer }
            />
        </div>
    )
}

export default BookingValidation