import React, { lazy, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from 'react-router-dom';
// import OwnerRequestedTable from "../tables/OwnerRequestedTable";

// Lazy Loading for requested list --by earl
const OwnerRequestedTable = lazy(() => import('../tables/OwnerRequestedTable'));

function RequestList() {
    const userDetails = useSelector((state) => state.user)
    const userId = useParams();
    const dispatch = useDispatch();

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
                    <OwnerRequestedTable />
                </Suspense>
            </div>
            <div className="m-5" align='left'>
                <Link to='/owner' className="btn btn-secondary">{"<<"} Go to All Vehicles</Link>
            </div>
        </div>
    )
}

export default RequestList