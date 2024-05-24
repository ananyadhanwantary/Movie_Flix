import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderComponent from './components/HeaderComponent';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import MovieComponent from "./components/MovieComponent"
import SingleMovieComponent from './components/SingleMovieComponent';

function App() {
  return (
    <>
      <BrowserRouter>
      <HeaderComponent />
        <Routes>
          <Route path='/' exact element={<HomeComponent/>}></Route>
          <Route path="/login" element={<LoginComponent/>}></Route>
          <Route path="/signup" element={<RegisterComponent/>}></Route>
          <Route path="/getMovie" element={<MovieComponent/>}></Route>
          <Route path="/getMovie/:id" element={<SingleMovieComponent/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
