import React, { useEffect } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import Home from "../car-rental/Home";
import { useSelector, useDispatch } from 'react-redux';
import { setUsers, setUser } from "../redux/actions/actions";
import axios from 'axios';
// import UserContext from "./UserContext";

function LoginValidation() {
    const users = useSelector((state) => state.users.users);
    const user = useSelector((state) => state.users.users);
    const dispatch = useDispatch();
    // const { setUser } = useContext(UserContext);
    console.log(user)

    // Fetching userlist from data.json --by earl
    const fetchUsers = async () => {
        const response = await axios
        .get('http://localhost:3000/userlist/')
        .catch((error) => {
            console.error(error);
        })
        dispatch(setUsers(response.data));
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    // Errors for incorrect input --by earl
    const ErrorSchema = Yup.object().shape({
        username: Yup.string()
            .required('Username is required')
            .min(2, 'Username is too short')
            .max(15, 'Username is too long'),
        password: Yup.string()
            .required('Password is required')
    })

    // Validation to match database --by earl
    const handleLogin = value => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].username === value.username) {
                if (users[i].password === value.password) {
                    if (users[i].owner === 'Y') {
                        window.location.replace('/car-rental-service/owner');
                        dispatch(setUser(users[i].name))
                        localStorage.setItem('userId', users[i].userId);
                        break;
                    } else {
                        window.location.replace('/car-rental-service/customer');
                        localStorage.setItem('userId', users[i].userId);
                        break;
                    }
                }
                alert('Password did not matched');
                break;
            }
        }
    }

    // Formik validation --by earl
    return (
        <div>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={(value, {resetForm}) => {
                    handleLogin(value)
                    resetForm();
                }} 
                validationSchema={ErrorSchema}
                component={ Home }/>
        </div>
    )
}

export default LoginValidation