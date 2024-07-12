// import logo from './logo.svg';
// import './App.css';


import { Routes, Route } from "react-router-dom";
import Home from './Home';
import GenreManager from './GenreManager';
import AuthorManager from './AuthorManager';
import BookManager from './BookManager';

import Header from './Header';


function App() {
  return (
    <>
    <Header/>
    <div>
        <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} /> 
            <Route path="/genres" element={<GenreManager />} />
            <Route path="/authors" element={<AuthorManager />} />
            <Route path="/books" element={<BookManager />} />
          </Routes>
        </main>
      </div>
      
    </>
  );
}

export default App;
