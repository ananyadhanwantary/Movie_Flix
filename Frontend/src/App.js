import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminMovieComponent from './components/AdminMovieComponent'
import EditComponent from './components/EditComponent';
import HeaderComponent from './components/HeaderComponent';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import MovieAddComponent from './components/MovieAddComponent';
import MovieComponent from "./components/MovieComponent";
import MovieEditComponet from './components/MovieEditComponent';
import RegisterComponent from './components/RegisterComponent';
import SingleMovieComponent from './components/SingleMovieComponent';
import UserComponent from './components/UserComponent';
import AdminProtectedRoute from './routes/AdminProtectedRoute';
import UserProtectedRoute from './routes/UserProtectedRoute';
import AdminHomeComponent from './components/AdminHomeComponent';
import FooterComponent from './components/FooterComponents';

function App() {
  return (
    <>
      <BrowserRouter>
      <HeaderComponent />
        <Routes>
          <Route path='/' exact element={<HomeComponent/>}></Route>
          <Route path="/login" element={<LoginComponent/>}></Route>
          <Route path="/signup" element={<RegisterComponent/>}></Route>

          <Route element={<UserProtectedRoute/>}>
            <Route path="/getMovie" element={<MovieComponent/>}></Route>
            <Route path="/getMovie/:id" element={<SingleMovieComponent/>}></Route>
          </Route>

          <Route element={<AdminProtectedRoute/>}>
            <Route path="/admin" element={<AdminHomeComponent/>}></Route>
            <Route path="/getUsers" element={<UserComponent/>}></Route>
            <Route path='/editUser/:id' element={<EditComponent/>}></Route>
            <Route path="/addMovie/" element={<MovieAddComponent/>}></Route>
            <Route path="/admin/movie" element={<AdminMovieComponent/>}></Route>
            <Route path="/editMovie/:id" element={<MovieEditComponet/>}></Route>
          </Route>

        </Routes>
      </BrowserRouter>
      <FooterComponent />
    </>
  );
}

export default App;
