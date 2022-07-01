import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { setRequestedCars } from "../redux/actions/actions";

const OwnerRequestedTable = () => {
    const requested = useSelector((state) => state.cars.cars);
    const dispatch = useDispatch();
    console.log(requested)

    // Fetching requested car list from data.json --by earl
    const fetchRequest = async () => {
        const response = await axios
        .get('http://localhost:3000/Requested/')
        .catch((error) => {
            console.error(error);
        })
        dispatch(setRequestedCars(response.data));
    }

    useEffect(() => {
        fetchRequest();
    }, [])

    return (
        <div className="App">
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
                                    <button className="btn btn-success"
                                        onClick={() => dispatch({type: 'APPROVE', payload: item})}
                                        >Approve
                                    </button>
                                    <button className="btn btn-danger"
                                        onClick={() => dispatch({type: 'REJECT', payload: item})}
                                        >Reject
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OwnerRequestedTable