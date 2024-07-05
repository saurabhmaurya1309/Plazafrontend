import React from 'react';
import Signup from './components/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <div className="App">
            <Signup />
            <ToastContainer />
        </div>
    );
};

export default App;
