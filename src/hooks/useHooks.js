import { useEffect, useState } from "react";

const useHooks = () => {
    const [bookings, setBookings] = useState({});
    const [search, setSearch] = useState('');
    const [showRemoveModal, setShowRemoveModal] = useState('');

    // Handle input search bar --earl
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
        e.preventDefault()
    }
    
    // const onChangeEdit = (e) => {
    //     const {name, value} = e.target;
    //     setBookings({
    //         ...field,
    //         [name]: value
    //     })
    // }
    return {
        search,
        onChangeSearch,
        showRemoveModal
    }
}

export default useHooks