// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBarPizza from './components/NavBarPizza';
import Home from './components/Home';
import DangKy from './components/DangKy'; // hoặc DangKyForm nếu tên file khác
import NewPage from './pages/NewPage';     // ← import NewPage
import SlideBar from './components/SlideBar'; // nếu có
import Quiz from './components/Quiz';

function App() {
  return (
    <Router>
      <NavBarPizza />

      {/* Nếu Carousel hiển thị trên mọi trang */}
      <SlideBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<DangKy />} />
        <Route path="/news" element={<NewPage />} />   {/* ← thêm route này */}
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </Router>
  );
}

export default App;