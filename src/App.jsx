import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuComponent from './components/AllFoodMenu';
import FoodDetailsComponent from './components/FoodDetails';
import HomeNav from './components/HomeNav';
import Welcome from './components/Welcome'; 
import Header from "./components/NavBar"
import Footer from "./components/Footer"

function App() {
  return (
  <>
    <Header />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
    <Footer />
  </>
  );
}

export default App;
