import axios from 'axios';

const selectedReducer = (car = [], action) => {
    // Handle add vehicle button --earl
    if (action.type === 'ADD') {
        return  [ axios.post('http://localhost:3000/AgencyVehicles/', {
                    ...action.payload
                })
            ];
    }

    // Handle remove car button from owner --earl
    if (action.type === "REMOVE") {
        return  [ axios.delete(`http://localhost:3000/AgencyVehicles/${action.payload.id}`),
                window.location.reload()
            ]
    }

    // Handle remove car button from customer --earl
    if (action.type === "REMOVE_USER_BOOK") {
        let userId = localStorage.getItem('userId');
        return  [ axios.delete(`http://localhost:3000/userId${userId}/${action.payload.id}`),
                window.location.reload()
            ]
    }

    // Handle approve requested vehicle button --earl
    if (action.type === 'APPROVE') {
        return  [ axios.delete(`http://localhost:3000/Requested/${action.payload.id}`),
                axios.patch(`http://localhost:3000/userId${action.payload.userId}/${action.payload.requestId}`, {
                    ...action.payload,
                    Status: 'Approved'
                }),
                window.location.reload()
            ];
    }

    // Handle approve requested vehicle button --earl
    if (action.type === 'REJECT') {
        return  [ axios.delete(`http://localhost:3000/Requested/${action.payload.id}`),
                axios.patch(`http://localhost:3000/userId${action.payload.userId}/${action.payload.requestId}`, {
                    ...action.payload,
                    Status: 'Rejected'
                }),
                window.location.reload()
            ];
    }

    return car
}

export default selectedReducer