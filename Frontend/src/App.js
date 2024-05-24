import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderComponent from './components/HeaderComponent';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import MovieComponent from "./components/MovieComponent";
import RegisterComponent from './components/RegisterComponent';
import SingleMovieComponent from './components/SingleMovieComponent';
import UserComponent from './components/UserComponent';

function App() {
  return (
    <>
<<<<<<< HEAD
      <HeaderComponent/>
      <BrowserRouter>
      <Routes>
        <Route path='/' exact element={<HomeComponent/>}></Route>
        <Route path="/login" element={<LoginComponent/>}></Route>
        <Route path="/signup" element={<RegisterComponent/>}></Route>
      </Routes>
=======
      <BrowserRouter>
      <HeaderComponent />
        <Routes>
          <Route path='/' exact element={<HomeComponent/>}></Route>
          <Route path="/login" element={<LoginComponent/>}></Route>
          <Route path="/signup" element={<RegisterComponent/>}></Route>
          <Route path="/getMovie" element={<MovieComponent/>}></Route>
          <Route path="/getUsers" element={<UserComponent/>}></Route>
          <Route path="/getMovie/:id" element={<SingleMovieComponent/>}></Route>
        </Routes>
>>>>>>> 902efe5312731685598b6100cc0860ad1fa6a9b2
      </BrowserRouter>
    </>
  );
}

export default App;
