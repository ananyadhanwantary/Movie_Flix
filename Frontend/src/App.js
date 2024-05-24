import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderComponent from './components/HeaderComponent';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';

function App() {
  return (
    <>
      <HeaderComponent/>
      <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<HomeComponent/>}></Route>
        <Route path="/login" element={<LoginComponent/>}></Route>
        <Route path="/signup" element={<RegisterComponent/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
