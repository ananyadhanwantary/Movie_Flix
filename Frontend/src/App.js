import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminHomeComponent from './components/AdminHomeComponent';
import AdminMovieComponent from './components/AdminMovieComponent';
import EditComponent from './components/EditComponent';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import MovieAddComponent from './components/MovieAddComponent';
import MovieComponent from "./components/MovieComponent";
import MovieEditComponent from './components/MovieEditComponent';
import RegisterComponent from './components/RegisterComponent';
import SingleMovieComponent from './components/SingleMovieComponent';
import UserComponent from './components/UserComponent';
import AuthProvider from './providers/AuthProvider';
import AdminProtectedRoute from './routes/AdminProtectedRoute';
import UserProtectedRoute from './routes/UserProtectedRoute';
import GenreComponent from './components/GenreComponent';
import ProfileComponent from './components/ProfileComponent';
import AboutUs from './components/AboutUs';
import ChangePasswordComponent from './components/ChangePasswordComponent';
import SearchComponent from './components/SearchComponet';

function App() {
// const styles = {
//   header: {
//     position: 'relative',
//     zIndex: 0,
//   },
//   backgroundImageContainer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: '100%',
//     height: '100%',
//     backgroundImage: `url('https://wallpapers.com/images/hd/movie-poster-background-p5qblffj7cvswl5g.jpg')`,
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//     backgroundSize: 'cover',
//     filter: 'brightness(50%)', 
//     zIndex: -1,
//   },
//   content: {
//     height: '100%',
//     width: '100%',
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     position: 'relative',
//     zIndex: 1,
//     padding: '20px', 
//   }
// }
const styles = {
  header: {
    position: 'relative',
    zIndex: 0,
  },
  backgroundImageContainer: {
     position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url('https://wallpapers.com/images/hd/movie-poster-background-p5qblffj7cvswl5g.jpg')`,
    backgroundPosition: 'center',
    backgroundRepeat: 'repeat',
    backgroundSize: 'cover',
    filter: 'brightness(50%)', // Adjust brightness value as needed
    zIndex: -1,
  },
  content: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#ffffff', // Set text color to white
    position: 'relative',
    zIndex: 1,
    paddingTop: '20px',
    // paddingLeft:'20px',
    // paddingRight:'20px',
     // Add padding for better readability
    // paddingBottom: '0px'
  },
  inner: {
    paddingTop: '20px',
    // paddingLeft:'20px',
    // paddingRight:'20px',
  }
}

  return (
    <div style={styles.header}>
    <div style={styles.backgroundImageContainer}></div>
      <div style={styles.content} >
      <BrowserRouter>
        <AuthProvider>
          <HeaderComponent />
          <div style={styles.inner}>
          <Routes>
            <Route path='/' exact element={<HomeComponent/>}></Route>
            <Route path="/login" element={<LoginComponent/>}></Route>
            <Route path="/signup" element={<RegisterComponent/>}></Route>
            <Route path='/aboutUs' element={<AboutUs/>}></Route>
            
            <Route element={<UserProtectedRoute/>}>
              <Route path="/byGenre" element={<GenreComponent/>}></Route>
              <Route path="/getMovie" element={<MovieComponent/>}></Route>
              <Route path="/getMovie/:id" element={<SingleMovieComponent/>}></Route>
              <Route path='/profile' element={<ProfileComponent/>}></Route>
              <Route path='/changePassword' element={<ChangePasswordComponent/>}></Route>
              <Route path="/search/"element={<SearchComponent/>}></Route>
            </Route>

            <Route element={<AdminProtectedRoute/>}>
              <Route path="/admin" element={<AdminHomeComponent/>}></Route>
              <Route path="/getUsers" element={<UserComponent/>}></Route>
              <Route path='/editUser/:id' element={<EditComponent/>}></Route>
              <Route path="/addMovie/:id?" element={<MovieAddComponent/>}></Route>
              <Route path="/admin/movie" element={<AdminMovieComponent/>}></Route>
              {/* <Route path="/editMovie/:id" element={<MovieEditComponent/>}></Route> */}
            </Route>
          </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
      <FooterComponent />
    </div>
    </div>
  );
}

export default App;
