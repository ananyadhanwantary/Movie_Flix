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
<<<<<<< HEAD
    </>
=======
>>>>>>> b8a6350164bfc615493658c50f728e68f52bc535
  );
}

export default App;