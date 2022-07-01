import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginValidation from './validations/LoginValidation';
import Owner from './car-rental/Owner';
import RequestList from './car-rental/RequestedList';
import BookingValidation from './validations/BookingValidation';

function App() {
  return (
    // Applying base url for the app --by earl
    <Router basename='car-rental-service'>
      <Routes>
        <Route exact path='/home' element={ <LoginValidation /> }></Route>
        <Route exact path='/owner' element={ <Owner /> }></Route>
        <Route exact path='/customer' element={ <BookingValidation /> }></Route>
        <Route exact path='/requestlist' element={ <RequestList /> }></Route>
      </Routes>
    </Router>
  );
}

export default App;
