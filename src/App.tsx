import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Main from './pages/Main';
import Login from './pages/Login';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import 'antd/dist/antd.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <PrivateRoute/> }>
          <Route path="/" element={ <Main/> }/>
        </Route>
        {/* <Route element={ <PrivateRoute/> }>
          <Route path="/main" element={ <Main/> }/>
        </Route> */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        {/* <Route path="about" element={ <About/> } />
        <Route path="contact" element={ <Contact/> } /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
