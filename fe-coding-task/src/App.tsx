import React from 'react';
import './App.css';
import FirstScreen from "./components/HomePage/HomePage";
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div >
        <Routes>
            <Route path="/" element={<FirstScreen/>} />
        </Routes>
    </div>
  );
}

export default App;
