import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { setRequestedCars } from "../redux/actions/actions";

const UserTable = () => {
    const requested = useSelector((state) => state.cars.cars);
    const dispatch = useDispatch();
    console.log(requested)

    // Fetching requested car list from data.json --by earl
    const fetchUserRequest = async () => {
        const response = await axios
        .get('http://localhost:3000/userId2/')
        .catch((error) => {
            console.error(error);
        })
        dispatch(setRequestedCars(response.data));
    }

    useEffect(() => {
        fetchUserRequest();
    }, [])

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, "0");
        const mm = String(today.getMonth() + 1).padStart(2, "0");
        const yyyy = today.getFullYear();
        return yyyy + "-" + mm + "-" + dd;
    };

    return (
        <div className="App">
            <div className="mb-3 ms-5" align='left'>
                <h4>My past bookings</h4>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th className="p-3 txt-ctr">Vehicle Types</th>
                        <th className="p-3 txt-ctr">Brands</th>
                        <th className="p-3 txt-ctr">Vehicles Quantity</th>
                        <th className="p-3 txt-ctr">Start Date</th>
                        <th className="p-3 txt-ctr">End Date</th>
                        <th className="p-3 txt-ctr">Status</th>
                        <th className="p-3 txt-ctr">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        requested.map((item, idx) => (
                            <tr key={idx}>
                                <td className="p-3 txt-ctr">{ item.VehicleType }</td>
                                <td className="p-3 txt-ctr">{ item.Brand }</td>
                                <td className="p-3 txt-ctr">{ item.VehicleRented }</td>
                                <td className="p-3 txt-ctr">{ item.StartDate }</td>
                                <td className="p-3 txt-ctr">{ item.EndDate }</td>
                                <td className="p-3 txt-ctr">{ item.Status }</td>
                                <td className="txt-ctr">
                                { item.EndDate < disablePastDate() ? 
                                    ('Already used') :
                                    (<button className="btn btn-danger"
                                        onClick={() => dispatch({type: 'REMOVE_USER_BOOK', payload: item})}
                                        >Remove
                                    </button>)
                                }
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UserTable