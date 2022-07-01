import { Form, Field, FastField } from "formik";
import React from "react";
import Header from "./Header";

function Home({ errors, touched, isValid, dirty }) {

    return (
        <Form className="App">
            <div className="sticky">
                <Header />
            </div>
            <div className="App-header mt-5" align='center'>
                <div className="mb-3">
                    <h2>Login</h2>
                </div>
                <div className='form-floating col-4 mb-3' align='left'>
                    <Field type="text" 
                        className={touched.username ? 
                            `form-control ${errors.username ? 'invalid' : 'valid'}`
                            : `form-control`}
                        placeholder='Username'
                        name='username'
                    />
                    <label>
                        Username
                    </label>
                    {
                        touched.username && 
                        errors.username &&
                        <small className="ms-2 txt-danger">{ errors.username }</small>
                    }
                </div>
                <div className='form-floating col-4 mb-3' align='left'>
                    <Field type="password" 
                        className={touched.password ? 
                            `form-control ${errors.password ? 'invalid' : 'valid'}`
                            : `form-control`}
                        placeholder='Password'
                        name='password'
                    />
                    <label>
                        Password
                    </label>
                    {
                        touched.password && 
                        errors.password &&
                        <small className="ms-2 txt-danger">{ errors.password }</small>
                    }
                </div>
                <div className='col-4' align='right'>
                    <button 
                        type="submit"
                        className='btn btn-warning'
                        disabled={!isValid || !dirty}
                        >
                        Log In
                    </button>
                </div>
            </div>
        </Form>
    )
}

export default Home