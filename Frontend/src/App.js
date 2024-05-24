import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HeaderComponent from './components/HeaderComponent';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import MovieComponent from "./components/MovieComponent";
import RegisterComponent from './components/RegisterComponent';
import SingleMovieComponent from './components/SingleMovieComponent';
import UserComponent from './components/UserComponent';
import AdminMovieComponent from './components/AdminMovieComponent';
import MovieEditComponet from './components/MovieEditComponent';
import MovieAddComponent from './components/MovieAddComponent';
import EditComponent from './components/EditComponent'

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
          <Route path="/getUsers" element={<UserComponent/>}></Route>
          <Route path='/editUser/:id' element={<EditComponent/>}></Route>
          <Route path="/getMovie/:id" element={<SingleMovieComponent/>}></Route>
          <Route path="/admin/movie" element={<AdminMovieComponent/>}></Route>
          <Route path="/editMovie/:id" element={<MovieEditComponet/>}></Route>
          <Route path="/addMovie/" element={<MovieAddComponent/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
